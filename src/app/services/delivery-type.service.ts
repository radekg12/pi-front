import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeliveryType} from "../models/delivery-type.model";

@Injectable({
  providedIn: 'root'
})
export class DeliveryTypeService implements OnInit {
  private baseURL = 'api/deliveryType';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getDeliveryTypes(): Observable<DeliveryType[]> {
    return this.http.get<DeliveryType[]>(this.baseURL)
  }
}
