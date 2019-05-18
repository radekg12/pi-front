import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {TitleService} from '../../services/title.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.init();
  }

  get authenticationService(): AuthenticationService {
    return this._authenticationService;
  }

  logout() {
    this._authenticationService.logout();
  }
}
