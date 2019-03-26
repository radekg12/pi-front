import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../models/customer.model';
import {CustomerService} from '../../services/customer.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  hide = true;
  addressFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  postcodeRegex = /^[0-9]{2}[ -]?[0-9]{3}$/;
  phoneNumberRegex = /^[0-9]{3}[ -]?[0-9]{3}[ -]?[0-9]{3}$/;
  emailRegex = /^[0-9]{2}[ -]?[0-9]{3}$/;
  passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&\*\=\+\.])[A-Za-z0-9!@#$%^&\*\=\+\.]{8,20}$/;

  customer: Customer;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {
  }

  public get addressGroup(): FormGroup {
    return this.addressFormGroup.get('address') as FormGroup;
  }

  get a() {
    return this.addressFormGroup.controls;
  }

  get companyName() {
    return this.addressFormGroup.get('companyName');
  }

  get firstName() {
    return this.addressFormGroup.get('firstName');
  }

  get lastName() {
    return this.addressFormGroup.get('lastName');
  }

  get phoneNumber() {
    return this.addressFormGroup.get('phoneNumber');
  }

  get email() {
    return this.addressFormGroup.get('email');
  }

  get street() {
    return this.addressGroup.get('street');
  }

  get city() {
    return this.addressGroup.get('city');
  }

  get postcode() {
    return this.addressGroup.get('postcode');
  }

  get l() {
    return this.loginFormGroup.controls;
  }

  ngOnInit() {
    this.configForms();
    this.getCustomer();
  }

  getCustomer(): void {
    this.customerService.getCustomer().subscribe(data => {
      this.customer = data;
      this.addressFormGroup.patchValue(data);
    });
  }

  updateCustomer(): void {
    this.customerService.saveCustomer(this.customer).subscribe(data => {
        this.customer = data;
        console.log('updated customer');
        console.log(this.customer);
        this.addressFormGroup.patchValue(data);
        this.showMessage();
      },
      error => console.log(error),
      () => this.showMessage()
    );
  }

  configForms() {
    this.addressFormGroup = this.formBuilder.group({
      id: ['', Validators.required],
      companyName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.pattern(this.phoneNumberRegex)],
      email: ['', [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        id: [''],
        street: [''],
        city: [''],
        postcode: ['', [Validators.required, Validators.pattern(this.postcodeRegex)]]
      })
    });

    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]]
    });
  }

  onSubmit(formGroup: FormGroup): void {
    console.log('SUBMIT');
    console.log({value: formGroup.value, valid: formGroup.valid});
    this.customer = formGroup.value;
    this.updateCustomer();
  }

  private showMessage() {
    this.snackBar
      .open('Zapisano zmiany', null, {duration: 2000});
  }
}
