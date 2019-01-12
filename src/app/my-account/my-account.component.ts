import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer.model";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public customer: Customer;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.getCustomer();
  }

  private getCustomer() {
    this.customerService.getCustomer().subscribe(
      data => this.customer = data
    );
  }

}
