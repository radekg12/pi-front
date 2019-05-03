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

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantity', 'unitPrice', 'subtotal'];
  ordersColumns: string[] = ['orderId', 'date', 'price', 'status'];
  orderStatusCategories: OrderStatusCategoryAll[];
  selectedStatusId: number;
  customer: Customer;

  public id: number;
  public order: Order;
  private orders: Order[] = [];
  public dataSource;
  private deliveryPosition: OrderPosition;
  private colors = OrderStatusCategoryColor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private orderStatusCategoryService: OrderStatusCategoryService,
    private customerService: CustomerService,
    public snackBar: MatSnackBar,
    private titleService: TitleService
  ) {
  }

  ngOnInit() {
    this.titleService.init();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getCategories();
    this.getOrder();
    this.getCustomer();
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
    console.log(`on change ${event.value}`);
    console.log(event);
    console.log(this.selectedStatusId);
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

      console.log('GET ORDER_1');
      console.log(this.order);
      console.log(this.orders);

    });
    console.log('GET ORDER');
    console.log(this.order);
    console.log(this.orders);
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
