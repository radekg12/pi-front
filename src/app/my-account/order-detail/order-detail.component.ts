import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order.model";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  displayedColumns: string[] = ["name", "quantity", "unitPrice", "subtotal"];
  private id: number;
  private order: Order;

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
      .map(p => p.quantity * +p.product.unitPrice)
      .reduce((x, y) => x + y, 0);
  }

  private getOrder() {
    this.orderService.getOrder(this.id).subscribe(data => {
      this.order = data;
      console.log("getOrder()");
      console.log(this.order);
    });
    console.log("GET ORDER");
    console.log(this.order);
  }
}
