import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit {

  private baseURL = 'api/orders';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseURL)
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseURL}/${orderId}`)
  }

  changeOrderStatus(orderId: number, statusId: number) {
    return this.http.post<Order>(`${this.baseURL}/${orderId}`, {}, {params: new HttpParams().set('statusId', String(statusId))})
  }

  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseURL}/byCustomer/${customerId}`);
  }
}
