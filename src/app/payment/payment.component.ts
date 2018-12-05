import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentMethod} from "../models/payment-method.model";
import {DeliveryType} from "../models/delivery-type.model";
import {PaymentMethodService} from "../services/payment-method.service";
import {DeliveryTypeService} from "../services/delivery-type.service";

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

  payment: string;
  delivery: string;
  street: string;
  postcode: string;
  city: string;


  constructor(private formBuilder: FormBuilder,
              private paymentMethodService: PaymentMethodService,
              private deliveryTypeService: DeliveryTypeService) {
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

  ngOnInit() {
    this.getDeliveryTypes();
    this.getPaymentMethods();
    this.configForms();
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

}
