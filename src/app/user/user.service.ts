import {Injectable, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";

const header = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private userUrl = 'api/users';

  constructor(private http: HttpClient) {
  }

  @Input()

  ngOnInit(): void {
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(this.userUrl + "/" + user.id);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user)
  }


  getUsers(page: number, perPage: number, sortBy: string): Observable<User[]> {
    const params = new HttpParams()
      .set("page", String(page - 1))
      .set("per_page", String(perPage))
      .set("sort_by", sortBy);
    return this.http.get<User[]>(this.userUrl, {params: params, headers: header});
  }

}
