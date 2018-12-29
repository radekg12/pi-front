import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order.model";
import {OrderPosition} from "../../models/order-position.model";
import {OrderStatusCategoryColor} from "../../models/order-status-category.model";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  displayedColumns: string[] = ["name", "quantity", "unitPrice", "subtotal"];
  ordersColumns: string[] = ['orderId', 'date', "price", "status"];

  private id: number;
  private order: Order;
  private orders: Order[] = [];
  private dataSource;
  private deliveryPosition: OrderPosition;
  private colors = OrderStatusCategoryColor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getOrder()
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
        name: `Dostawa - ${this.order.deliveryType.name}`,
        unitPrice: `${this.order.deliveryType.price}`
      }
    };
    this.order.orderPositions.push(this.deliveryPosition);
  }

  getColor(element: Order): string {
    return this.colors.filter(c => c.id == element.orderStatus.orderStatusCategory.id)[0].color;
  }

  private getOrder() {
    this.orderService.getOrder(this.id).subscribe(data => {
      this.order = data;
      this.orders.push(data);
      this.dataSource = new MatTableDataSource(this.orders);
      this.setDeliveryPosition();

      console.log("GET ORDER_1");
      console.log(this.order);
      console.log(this.orders);

    });
    console.log("GET ORDER");
    console.log(this.order);
    console.log(this.orders);
  }
}
