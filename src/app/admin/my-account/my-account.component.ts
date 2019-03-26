import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }
}
