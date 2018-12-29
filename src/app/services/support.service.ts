import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Support} from "../models/support.model";

@Injectable({
  providedIn: 'root'
})
export class SupportService implements OnInit {

  private baseURL = 'api/support';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getMail(): Observable<string> {
    return this.http.get<string>(this.baseURL);
  }

  sendMail(support: Support): Observable<Support> {
    return this.http.post<Support>(this.baseURL, support);
  }

}
