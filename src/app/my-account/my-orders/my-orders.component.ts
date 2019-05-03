import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order.model';
import {OrderStatusCategoryColor} from '../../models/order-status-category.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TitleService} from '../../services/title.service';

const columns: string[] = ['id', 'dateOfOrder', 'totalAmount', 'orderStatus.name'];

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  displayedColumns: string[] = columns;
  private orders: Order[];
  colors = OrderStatusCategoryColor;
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.init();
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.sort = this.sort;
    });
    console.log('orders');
    console.log(this.orders);
  }

  getColor(element: Order): string {
    return this.colors.filter(c => c.id === element.orderStatus.orderStatusCategory.id)[0].color;
  }
}
