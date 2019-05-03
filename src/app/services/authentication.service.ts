import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Role} from '../models/role.model';
import {Customer} from '../models/customer.model';
import {Authority} from '../models/authority.model';
import {Login} from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  baseURL = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.getToken()));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseURL}/signup`, customer);
  }

  login(loginModel: Login) {
    return this.http.post<any>(`${this.baseURL}/signin`, loginModel)
      .pipe(map((user: User) => {
        // login successful if there's a jwt token in the response
        console.log('auth/signin');
        console.log(user);
        console.log(user.accessToken);
        if (user && user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes


          const token = user.accessToken;
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
          this.storeAuthenticationToken(JSON.stringify(user), user.rememberMe);
          console.log('saved');
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  storeAuthenticationToken(user: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('currentUser', user);
    } else {
      sessionStorage.setItem('currentUser', user);
    }
  }

  getToken() {
    return localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  }

  getRoleNames(): Authority[] {
    return this.currentUserValue.authorities;
  }

  isLoggedInAsUser(): boolean {
    return this.getToken() !== null && this.getRoleNames().some(authority => authority.roleName === Role.User);
  }

  isLoggedInAsAdmin(): boolean {
    return this.getToken() !== null && this.getRoleNames().some(authority => authority.roleName === Role.Admin);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    // remove user from local storage to log user out
    console.log('logout');
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
