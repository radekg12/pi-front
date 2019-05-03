import {Injectable, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageEvent} from '@angular/material';
import {Product} from '../models/product.model';
import {environment} from '../../environments/environment';

const header = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {

  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {
  }

  @Input()

  ngOnInit(): void {
  }

  getProduct(id: number): Observable<Product> {
    console.log('ProdService getProduct(id)');
    return this.http.get<Product>(`${this.baseUrl}/detail/${id}`, {headers: header});
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${product.id}`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}`, product);
  }


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/all`, {headers: header});
  }

  getRecommendedProducts(productId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${productId}/recommendation`);
  }

  getAllProductsBySubcategory(subcategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/all/${subcategoryId}`, {headers: header});
  }

  getProducts(event?: PageEvent): Observable<Product[]> {
    if (event) {
      return this.getProductsBySubcategory(event.pageIndex, event.pageSize);
    } else {
      return this.getProductsBySubcategory();
    }

  }

  getProductsBySubcategory(subcategoryId?: number, page?: number, size?: number, sort?: string): Observable<Product[]> {
    const params: HttpParams = this.createHttpParams({page, size: size, sort: sort});
    console.log('+++ HTTP.get<Product[]> : ');
    console.log({url: this.baseUrl, params: params});
    return this.http.get<Product[]>(`${this.baseUrl}/${subcategoryId || ''}`, {params: params, headers: header});
  }

  getProductsByCategory(categoryId?: number, page?: number, size?: number, sort?: string): Observable<Product[]> {
    const params: HttpParams = this.createHttpParams({page, size: size, sort: sort});
    return this.http.get<Product[]>(`${this.baseUrl}/category/${categoryId || ''}`, {params: params, headers: header});
  }

  createHttpParams(params: {}): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    Object.keys(params).forEach(param => {
      if (params[param]) {
        httpParams = httpParams.set(param, params[param]);
      }
    });

    return httpParams;
  }
}
