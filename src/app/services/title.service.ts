import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';

const APP_TITLE = 'Sklep komuterowy - Hurtpol';
const SEPARATOR = ' > ';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
  }

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(() => {
        let route = this.activatedRoute.firstChild;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data),
      map((data) => {
        if (data.title) {
          return `${data.title} - ${APP_TITLE}`;
        } else {
          return APP_TITLE;
        }
      })
    )
      .subscribe((pathString) => this.titleService.setTitle(pathString));
  }
}
