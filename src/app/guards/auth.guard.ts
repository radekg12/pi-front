import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      console.log('route.data.roles');
      console.log(route.data.roles);
      console.log('currentUser.role');
      console.log(currentUser);
      console.log(currentUser.userDTO.role.name);
      const token = currentUser.accessToken;
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        console.log(` isExpired? : ${isExpired}`);
        this.authenticationService.logout();
        console.log(` logout `);
      }
      if (route.data.roles && route.data.roles.indexOf(currentUser.userDTO.role.name) === -1) {
        // role not authorised so redirect to home page
        console.log('not authorised');
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
