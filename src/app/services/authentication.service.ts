import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  baseURL = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseURL}/auth/signin`, {username, password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log('auth/signin');
        console.log(user);
        console.log(user.accessToken);
        if (user && user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes


          let token = user.accessToken;
          const helper = new JwtHelperService();

          const decodedToken = helper.decodeToken(token);

// Other functions
          const expirationDate = helper.getTokenExpirationDate(token);
          const isExpired = helper.isTokenExpired(token);

          console.log(` now: ${new Date()}; `);
          console.log(` token: ${token}; `);
          console.log(` decodedToken: ${decodedToken};`);
          console.log(decodedToken);
          console.log(` expirationDate: ${expirationDate}; isExpired: ${isExpired}; `);

          console.log('save currentUser to localStorage');
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log('saved');
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  getToken() {
    return localStorage.getItem("currentUser")
  }

  isLoggednIn(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    // remove user from local storage to log user out
    console.log("logout");
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
