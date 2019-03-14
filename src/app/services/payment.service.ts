import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentPayUResponse} from "../models/paymentPayUResponse.model";
import {AddressModel} from "../models/address.model";
import {DeliveryType} from "../models/delivery-type.model";
import {PaymentMethod} from "../models/payment-method.model";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements OnInit {

  private baseURL = `${environment.apiUrl}/payu/make/payment`;


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  payByPayU(address: AddressModel, deliveryType: DeliveryType, paymentMethod: PaymentMethod): Observable<PaymentPayUResponse> {
    return this.http.post<PaymentPayUResponse>(this.baseURL, {address, deliveryType, paymentMethod});
  }
}
