import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material";

declare let paypal: any;

// declare let paypal: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, AfterViewChecked {
  user: User = new User();
  addScriptS: boolean = false;
  addScriptC: boolean = false;
  paypalLoadS: boolean = true;
  paypalLoadC: boolean = true;
  finalAmount: number = 1;
  paypalConfigS = {
    env: 'sandbox', // sandbox | production
    commit: true,

    payment: function () {
      var CREATE_URL = 'api/paypal/make/payment/?sum=' + 2;

      return paypal.request.post(CREATE_URL)
        .then(function (res) {
          console.log('CREATE_URL - PAYPAL');
          console.log(res);
          return res.paymentID;
        });
    },

    onAuthorize: function (data, actions) {
      var EXECUTE_URL = 'api/paypal/complete/payment/';

      var data: any = {
        paymentID: data.paymentID,
        payerID: data.payerID
      };

      console.log('data ');
      console.log(data);

      return paypal.request.post(EXECUTE_URL, data)
        .then(function (res) {
          console.log('EXECUTE_URL - PAYPAL');
          console.log(res);
          window.alert('Payment Complete!');
        });
    }
  };
  paypalConfigC = {
    env: 'sandbox', // sandbox | production
    client: {
      sandbox: 'ARuGGF8ga2zpSQTehw0ImIThFOxJPZ5O5QY-31MXVXBF44z9IN2_XL-e3RtjWmTECTFck6cuqImxXk5X',
      production: '<insert production client id>'
    },
    commit: true,

    payment: function (data, actions) {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: {total: '0.1', currency: 'PLN'}
            }
          ]
        }
      });
    },

    onAuthorize: function (data, actions) {
      return actions.payment.execute().then(function () {
        window.alert('Payment Complete! (Client)');
      });
    }
  };

  createUser(): void {
    this.userService.createUser(this.user).subscribe(
      data => alert("User created successfully."),
      error => console.log(error.error.message)
    );
  }

  ngOnInit() {
  }

  private url = 'api/';

  constructor(private router: Router, private userService: UserService, private http: HttpClient, public dialog: MatDialog) {
  }

  ngAfterViewChecked(): void {
    if (!this.addScriptS) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfigS, '#paypal-checkout-btnS');
        this.paypalLoadS = false;
      });

      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfigC, '#paypal-checkout-btnC');
        this.paypalLoadC = false;
      });
    }
  }

  payForShopping() {
    // this.payForShopping1();
    // this.payForShopping2();

    this.payByPayPal();
  }

  payForShoppingX() {
    this.payByPayPalComplete();
  }

  payByPayPal() {
    console.log("Pay by PayPal => ");
    this.makePayment('2').subscribe(
      next => {
        console.log("next: ");
        console.log(next);
        var redirectUrl = next['redirect_url'];
        console.log('redirectTo: ' + redirectUrl);
        window.location.href = redirectUrl;
        // this.router.navigate([redirectUrl]);
      },
      error1 => {
        console.log("error: ");
        console.log(error1);
      },
      () => {
        console.log("complete: ");
      })
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open("", {
  //     width: '250px'
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  payByPayPalComplete() {
    this.completePayment('PAY-1HB32063X7294630BLPY3ZIQ', 'X3E7ZCVHKVXCL').subscribe(
      next => {
        console.log("next: ");
        console.log(next);
      },
      error1 => {
        console.log("error: ");
        console.log(error1);
      },
      () => {
        console.log("COMPLETE 2");
      }
    );
  }

  payForShopping1() {
    this.httpPayForShopping().subscribe(
      data => {
        console.log("PAY SUCCESS");
        console.log(data)
      },
      xx => console.log("error:  " + xx),
      () => console.log("COMPLETE")
    )

  }

  payForShopping2() {
    this.httpCreateOrder().subscribe(
      data => {
        console.log("PAY SUCCESS");
        console.log(data)
      },
      xx => console.log("error:  " + xx),
      () => console.log("COMPLETE")
    )

  }

  httpPayForShopping(): Observable<any> {
    return this.http.post<any>("https://secure.payu.com/pl/standard/user/oauth/authorize", "", {
      params: new HttpParams().set("grant_type", "client_credentials").set("client_id", "145227").set("client_secret", "12f071174cb7eb79d4aac5bc2f07563f"),
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*"
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        // "Origin": "*",
        // "Access-Control-Allow-Methods": "GET, PUT, POST"
      })
    });
  }

  httpCreateOrder(): Observable<any> {
    const order_body = {
      "notifyUrl": "https://your.eshop.com/notify",
      "customerIp": "127.0.0.1",
      "merchantPosId": "145227",
      "description": "RTV market",
      "currencyCode": "PLN",
      "totalAmount": "21000",
      "products": [
        {
          "name": "Wireless mouse",
          "unitPrice": "15000",
          "quantity": "1"
        },
        {
          "name": "HDMI cable",
          "unitPrice": "6000",
          "quantity": "1"
        }
      ]
    };

    return this.http.post("https://secure.payu.com/api/v2_1/orders/", order_body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer 8c4a0386-a8c5-4084-849b-1f5f144d8503",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*"
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        // "Origin": "*",
        // "Access-Control-Allow-Methods": "GET, PUT, POST"
      })
    })
  }

  makePayment(sum): Observable<any> {
    return this.http.post(this.url + 'paypal/make/payment?sum=' + sum, {});
  }

  completePayment(paymentId, payerId) {
    return this.http.post(this.url + 'paypal/complete/payment?paymentID=' + paymentId + '&payerID=' + payerId, {});
  }

  addPaypalScript() {
    this.addScriptS = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.setAttribute("src", "https://www.paypalobjects.com/api/checkout.js");
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

}
