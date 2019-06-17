import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PaymentMethod} from '../models/payment-method.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService implements OnInit {

  private baseURL = `${environment.apiUrl}/payment-methods`;


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(this.baseURL);
  }
}
