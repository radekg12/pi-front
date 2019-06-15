import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {Customer} from '../models/customer.model';
import {Router} from '@angular/router';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  signUpFormGroup: FormGroup;
  postcodeRegex = /^[0-9]{2}[ -]?[0-9]{3}$/;
  phoneNumberRegex = /^[0-9]{3}[ -]?[0-9]{3}[ -]?[0-9]{3}$/;
  emailRegex = /^[0-9]{2}[ -]?[0-9]{3}$/;
  passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&\*\=\+\.])[A-Za-z0-9!@#$%^&\*\=\+\.]{8,20}$/;
  hidePassword = true;
  saving = false;
  customer: Customer;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private titleService: TitleService) {

  }

  ngOnInit() {
    this.titleService.init();
    this.configSignUpForm();
  }

  public get addressGroup(): FormGroup {
    return this.signUpFormGroup.get('address') as FormGroup;
  }

  get a() {
    return this.signUpFormGroup.controls;
  }

  get firstName() {
    return this.signUpFormGroup.get('firstName');
  }

  get lastName() {
    return this.signUpFormGroup.get('lastName');
  }

  get phoneNumber() {
    return this.signUpFormGroup.get('phoneNumber');
  }

  get email() {
    return this.signUpFormGroup.get('email');
  }

  get password() {
    return this.signUpFormGroup.get('password');
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


  onSubmit(signUpFormGroup: FormGroup) {
    signUpFormGroup.markAllAsTouched();
    this.saving = true;
    this.customer = signUpFormGroup.value;
    this.authenticationService.register(this.customer).subscribe(
      data => {
        this.saving = false;
        this.router.navigate(['./login']);
      }, error1 => {
        this.saving = false;
      });
  }

  private configSignUpForm() {
    this.signUpFormGroup = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.pattern(this.phoneNumberRegex)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      address: this.formBuilder.group({
        id: [''],
        street: [''],
        city: [''],
        postcode: ['', [Validators.pattern(this.postcodeRegex)]]
      })
    });
  }
}
