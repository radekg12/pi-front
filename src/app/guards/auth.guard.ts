import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url, route);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string, route: ActivatedRouteSnapshot): boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      const token = currentUser.accessToken;
      const helper = new JwtHelperService();
      const authorities: string[] = (helper.decodeToken(token)['auth'] as string).split(',');
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        this.authenticationService.logout();
      }
      if (route.data.roles && currentUser.authorities.some(authority => authority.roleName === route.data.roles)) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: url}});
    return false;
  }
}
