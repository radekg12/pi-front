import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {SupportService} from "../services/support.service";
import {Support} from "../models/support.model";
import {Customer} from "../models/customer.model";
import {MatSnackBar} from "@angular/material";
import {NgForm} from "@angular/forms";

const emptySupport: Support = {
  mailFrom: '',
  mailTo: '',
  mailTitle: '',
  mailContent: ''
};

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  private customer: Customer;
  private support: Support = emptySupport;
  private mailTo: string;

  constructor(
    private customerService: CustomerService,
    private supportService: SupportService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.support.mailTitle = "Prośba o wsparcie";
    this.getMail();
    this.getCustomer();
  }

  getMail(): void {
    console.log("getMail()");
    this.supportService.getMail().subscribe(data => {
      console.log("mail");
      console.log(data);
      this.mailTo = data;
      this.support.mailTo = this.mailTo;
    })
  }

  getCustomer(): void {
    this.customerService.getCustomer().subscribe(data => {
      this.customer = data;
      this.support.mailFrom = data.email;
    })
  }


  sendMail(form: NgForm) {
    console.log("sendMail()...");
    this.supportService.sendMail(this.support).subscribe(data => {
      this.showMessage();
      this.support.mailTitle = '';
      this.support.mailContent = '';
      console.log("MAIL IS SENDED - " + data)
    })
  }

  private showMessage() {
    this.snackBar
      .open("Wysłano", null, {duration: 2000,});
  }

}
