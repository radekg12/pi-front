import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderStatus} from "../models/order-status.model";

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService implements OnInit {

  private baseURL = 'api/status';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getOrderStatuses(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(this.baseURL)
  }
}

