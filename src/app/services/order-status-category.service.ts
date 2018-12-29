import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderStatusCategoryAll} from "../models/order-status-category-all.model";

@Injectable({
  providedIn: 'root'
})
export class OrderStatusCategoryService implements OnInit {

  private baseURL = 'api/statusCategory';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getOrderStatusCategories(): Observable<OrderStatusCategoryAll[]> {
    return this.http.get<OrderStatusCategoryAll[]>(this.baseURL)
  }

}
