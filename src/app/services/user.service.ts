import {Injectable, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {PageEvent} from "@angular/material";

const header = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private baseUrl = 'api/products';

  constructor(private http: HttpClient) {
  }

  @Input()

  ngOnInit(): void {
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${user.id}`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user)
  }


  getUsers(event?: PageEvent): Observable<User[]> {
    if (event) return this.getUserss(event.pageIndex, event.pageSize);
    else return this.getUserss();

  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, {headers: header});

  }

  getUserss(page?: number, per_page?: number, sort_by?: string): Observable<User[]> {
    const params: HttpParams = this.createHttpParams({page, per_page, sort_by});
    console.log("+++ HTTP.get<User[]> : ");
    console.log({url: this.baseUrl, params: params});
    return this.http.get<User[]>(this.baseUrl, {params: params, headers: header});
  }

  createHttpParams(params: {}): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    Object.keys(params).forEach(param => {
      if (params[param]) {
        httpParams = httpParams.set(param, params[param]);
      }
    });

    return httpParams;
  }
}
