import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements OnInit {

  private baseURL = `${environment.apiUrl}/customers`;
  private accountURL = `${environment.apiUrl}/account`;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getCustomer(): Observable<Customer> {
    return this.http.get<Customer>(`${this.accountURL}/my-data`);
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}/${customerId}`);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseURL}`);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.accountURL}/my-data`, customer);
  }

  getCustomerByOrderId(orderId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}/order/${orderId}`);
  }
}
