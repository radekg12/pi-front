import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MatSelectChange, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Order} from '../../../models/order.model';
import {OrderPosition} from '../../../models/order-position.model';
import {OrderStatusCategoryColor} from '../../../models/order-status-category.model';
import {OrderService} from '../../../services/order.service';
import {OrderStatusCategoryAll} from '../../../models/order-status-category-all.model';
import {OrderStatusCategoryService} from '../../../services/order-status-category.service';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../models/customer.model';
import {TitleService} from '../../../services/title.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantity', 'unitPrice', 'subtotal'];
  ordersColumns: string[] = ['orderId', 'date', 'price', 'status'];
  orderStatusCategories: OrderStatusCategoryAll[];
  selectedStatusId: number;
  customer: Customer;

  public id: number;
  public order: Order;
  public dataSource;
  private orders: Order[] = [];
  private deliveryPosition: OrderPosition;
  private colors = OrderStatusCategoryColor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private orderStatusCategoryService: OrderStatusCategoryService,
    private customerService: CustomerService,
    public snackBar: MatSnackBar,
    private titleService: TitleService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.titleService.init();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getCategories();
    this.getOrder();
    if (this.authService.isLoggedInAsAdmin()) {
      this.getCustomer();
    }
  }

  getTotalCost() {
    return this.order.orderPositions
      .map(p => p.quantity * +p.unitPrice)
      .reduce((x, y) => x + y, 0);
  }

  setDeliveryPosition() {
    this.deliveryPosition = {
      id: null,
      quantity: 1,
      unitPrice: this.order.deliveryType.price,
      product: {
        id: 0,
        name: `Dostawa - ${this.order.deliveryType.name}`,
        unitPrice: this.order.deliveryType.price
      }
    };
    this.order.orderPositions.push(this.deliveryPosition);
  }

  getColor(element: Order): string {
    return this.colors.filter(c => c.id === element.orderStatus.orderStatusCategory.id)[0].color;
  }

  onChange(event: MatSelectChange) {
    this.orderService.changeOrderStatus(this.order.id, this.selectedStatusId).subscribe(data => {
      this.order = data;
      this.showMessage();

      this.orders = [];
      this.orders.push(data);
      this.dataSource = new MatTableDataSource(this.orders);
      this.setDeliveryPosition();
      this.selectedStatusId = this.order.orderStatus.id;
    });
  }

  private getOrder() {
    this.orderService.getOrder(this.id).subscribe(data => {
      this.order = data;
      this.orders.push(data);
      this.dataSource = new MatTableDataSource(this.orders);
      this.setDeliveryPosition();
      this.selectedStatusId = this.order.orderStatus.id;
    });
  }

  private getCustomer() {
    this.customerService.getCustomerByOrderId(this.id).subscribe(data => this.customer = data);
  }

  private getCategories() {
    this.orderStatusCategoryService.getOrderStatusCategories().subscribe(data => this.orderStatusCategories = data);
  }

  private showMessage() {
    this.snackBar
      .open('Zapisano zmianę statusu', null, {duration: 2000});
  }
}
