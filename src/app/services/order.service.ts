import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
