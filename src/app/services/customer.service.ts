import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements OnInit {

  private baseURL = `${environment.apiUrl}/customer`;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getCustomer(): Observable<Customer> {
    return this.http.get<Customer>(this.baseURL);
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}/${customerId}`);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseURL}/all`);
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseURL, customer);
  }

  getCustomerByOrderId(orderId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}/byOrderId/${orderId}`);
  }
}
