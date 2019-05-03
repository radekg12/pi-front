import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {TitleService} from '../../services/title.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.init();
  }

  logout() {
    this.authenticationService.logout();
  }
}
