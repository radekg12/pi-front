import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../models/customer.model';
import {AuthenticationService} from '../services/authentication.service';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public customer: Customer;

  constructor(private customerService: CustomerService,
              private authenticationService: AuthenticationService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.init();
    this.getCustomer();
  }

  private getCustomer() {
    this.customerService.getCustomer().subscribe(
      data => this.customer = data
    );
  }

  logout() {
    this.authenticationService.logout();
  }
}
