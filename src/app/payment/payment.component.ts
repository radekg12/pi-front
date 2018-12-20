import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentMethod} from "../models/payment-method.model";
import {DeliveryType} from "../models/delivery-type.model";
import {PaymentMethodService} from "../services/payment-method.service";
import {DeliveryTypeService} from "../services/delivery-type.service";
import {PaymentService} from "../services/payment.service";
import {Router} from "@angular/router";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ShoppingCartPosition} from "../models/shopping-cart-position.model";
import {AddressModel} from "../models/address.model";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  paymentMethods: PaymentMethod[];
  deliveryTypes: DeliveryType[];

  deliveryFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  summaryFormGroup: FormGroup;

  postcodeRegex = /^[0-9]{2}[ -]?[0-9]{3}$/;
  positions: ShoppingCartPosition[];



  constructor(private formBuilder: FormBuilder,
              private paymentMethodService: PaymentMethodService,
              private deliveryTypeService: DeliveryTypeService,
              private paymentService: PaymentService,
              private shoppingCartService: ShoppingCartService,
              private router: Router) {
  }

  get d() {
    return this.deliveryFormGroup.controls;
  }

  get p() {
    return this.paymentFormGroup.controls;
  }

  get a() {
    return this.addressFormGroup.controls;
  }

  get s() {
    return this.summaryFormGroup.controls;
  }

  ngOnInit() {
    this.getDeliveryTypes();
    this.getPaymentMethods();
    this.configForms();
    this.getProducts();
  }

  getProducts() {
    this.shoppingCartService.getProducts().subscribe(data => this.positions = data);
  }

  configForms() {
    this.deliveryFormGroup = this.formBuilder.group({
      deliveryCtrl: ['', Validators.required]
    });
    this.paymentFormGroup = this.formBuilder.group({
      paymentCtrl: ['', Validators.required]
    });
    this.addressFormGroup = this.formBuilder.group({
      streetCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      postcodeCtrl: ['', [Validators.required, Validators.pattern(this.postcodeRegex)]]
    });
    this.summaryFormGroup = this.formBuilder.group({});
  }

  getPaymentMethods(): void {
    this.paymentMethodService.getPaymentMethods().subscribe(data => this.paymentMethods = data)
  }

  getDeliveryTypes(): void {
    this.deliveryTypeService.getDeliveryTypes().subscribe(data => this.deliveryTypes = data)
  }

  payForOrder() {
    let address: AddressModel = {
      id: null,
      street: this.a.streetCtrl.value,
      city: this.a.cityCtrl.value,
      postcode: this.a.postcodeCtrl.value
    };


    this.paymentService.payByPayU(address, this.getDeliveryType(), this.getPaymentMethod()).subscribe(data =>
      window.location.href = data.redirectUri)
  }

  getDeliveryType(): DeliveryType {
    let deliveryId = this.d.deliveryCtrl.value;
    return this.deliveryTypes.filter(t => t.id == deliveryId)[0];
  }

  getPaymentMethod(): PaymentMethod {
    console.log("getPaymentMethod");
    console.log(this.paymentMethods.filter(m => m.id == 4)[0]);
    return this.paymentMethods.filter(m => m.id == 4)[0];
  }
}
