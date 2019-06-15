import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageEvent} from '@angular/material';
import {Product} from '../models/product.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {

  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/detail/${id}`);
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
    return this.http.get<Product[]>(`${this.baseUrl}/all`);
  }

  getRecommendedProducts(productId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${productId}/recommendation`);
  }

  getAllProductsBySubcategory(subcategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/all/${subcategoryId}`);
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
    return this.http.get<Product[]>(`${this.baseUrl}/${subcategoryId || ''}`, {params: params});
  }

  getProductsByCategory(categoryId?: number, page?: number, size?: number, sort?: string): Observable<Product[]> {
    const params: HttpParams = this.createHttpParams({page, size: size, sort: sort});
    return this.http.get<Product[]>(`${this.baseUrl}/category/${categoryId || ''}`, {params: params});
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
