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
      // check if route is restricted by role
      const token = currentUser.accessToken;
      console.log('-- token --');
      console.log(token);
      const helper = new JwtHelperService();
      console.log('JWThelper');
      console.log(helper);
      console.log(helper.decodeToken(token));
      const authorities: string[] = (helper.decodeToken(token)['auth'] as string).split(',');
      console.log(authorities);
      console.log(helper.getTokenExpirationDate(token));
      const isExpired = helper.isTokenExpired(token);
      console.log(`isExpired? ${isExpired}`);
      if (isExpired) {
        this.authenticationService.logout();
      }
      if (route.data.roles && currentUser.authorities.some(authority => authority.roleName === route.data.roles)) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: url}});
    return false;
  }
}
