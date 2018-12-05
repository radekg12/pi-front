import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PaymentMethod} from "../models/payment-method.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService implements OnInit {

  private baseURL = 'api/paymentMethod';


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(this.baseURL)
  }
}
