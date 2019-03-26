import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShoppingCartPosition} from '../models/shopping-cart-position.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnInit {

  private baseURL = `${environment.apiUrl}/shoppingCart`;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getProducts(): Observable<ShoppingCartPosition[]> {
    return this.http.get<ShoppingCartPosition[]>(this.baseURL);
  }

  addProduct(productId: number): Observable<ShoppingCartPosition> {
    return this.http.post<ShoppingCartPosition>(this.baseURL, productId);
  }

  deleteProduct(productId: number): Observable<ShoppingCartPosition> {
    return this.http.delete<ShoppingCartPosition>(`${this.baseURL}/${productId}`);
  }

  updateProduct(productId: number, quantity: number): Observable<ShoppingCartPosition> {
    return this.http.put<ShoppingCartPosition>(this.baseURL, {productId: productId, quantity: quantity});
  }
}
