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
    return this.http.post<Customer>(`${this.baseURL}/enrollment`, customer);
  }

  login(loginModel: Login) {
    return this.http.post<any>(`${this.baseURL}/login`, loginModel)
      .pipe(map((user: User) => {
        if (user && user.accessToken) {
          const token = user.accessToken;
          const helper = new JwtHelperService();

          const authorities: string[] = (helper.decodeToken(token)['auth'] as string).split(',');
          const decodedToken = helper.decodeToken(token);
          const expirationDate = helper.getTokenExpirationDate(token);
          const isExpired = helper.isTokenExpired(token);

          this.storeAuthenticationToken(JSON.stringify(user), user.rememberMe);
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

  isLoggedInAsWorker(): boolean {
    return this.getToken() !== null && this.getRoleNames().some(authority => authority.roleName === Role.Worker);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
