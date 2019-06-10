import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Customer} from '../../../models/customer.model';
import {CustomerService} from '../../../services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../../models/order.model';
import {OrderService} from '../../../services/order.service';
import {OrderStatusCategoryColor} from '../../../models/order-status-category.model';
import {TitleService} from '../../../services/title.service';

const columns: string[] = ['id', 'dateOfOrder', 'totalAmount', 'orderStatus.name'];

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  id: number;
  hide = true;
  addressFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  postcodeRegex = /^[0-9]{2}[ -]?[0-9]{3}$/;
  phoneNumberRegex = /^[0-9]{3}[ -]?[0-9]{3}[ -]?[0-9]{3}$/;
  emailRegex = /^[0-9]{2}[ -]?[0-9]{3}$/;
  passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&\*\=\+\.])[A-Za-z0-9!@#$%^&\*\=\+\.]{8,20}$/;

  customer: Customer;
  orders: Order[];
  displayedColumns: string[] = columns;
  colors = OrderStatusCategoryColor;
  dataSource;
  saving = false;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private titleService: TitleService
  ) {
  }

  ngOnInit() {
    this.titleService.init();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getCustomer();
    this.getOrders();
    this.configForms();
  }

  public get addressGroup(): FormGroup {
    return this.addressFormGroup.get('address') as FormGroup;
  }

  get a() {
    return this.addressFormGroup.controls;
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

  getCustomer(): void {
    this.customerService.getCustomerById(this.id).subscribe(data => {
      this.customer = data;
      this.addressFormGroup.patchValue(data);
    });
  }

  getOrders(): void {
    this.orderService.getOrdersByCustomerId(this.id).subscribe(data => {
      this.orders = data;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.sort = this.sort;
    });
  }

  updateCustomer(): void {
    this.saving = true;
    this.customerService.saveCustomer(this.customer).subscribe(data => {
        this.saving = false;
        this.customer = data;
        console.log('updated customer');
        console.log(this.customer);
        this.addressFormGroup.patchValue(data);
        this.showMessage();
      },
      error => {
        this.saving = false;
        console.log(error);
      },
      () => this.showMessage()
    );
  }

  configForms() {
    this.addressFormGroup = this.formBuilder.group({
      id: ['', Validators.required],
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

  getColor(element: Order): string {
    return this.colors.filter(c => c.id === element.orderStatus.orderStatusCategory.id)[0].color;
  }

  private showMessage() {
    this.snackBar
      .open('Zapisano zmiany', null, {duration: 2000});
  }
}
