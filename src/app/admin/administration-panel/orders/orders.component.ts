import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatSort, MatTableDataSource} from '@angular/material';
import {Order} from '../../../models/order.model';
import {OrderStatusCategoryColor} from '../../../models/order-status-category.model';
import {OrderService} from '../../../services/order.service';
import {OrderStatusService} from '../../../services/order-status.service';
import {OrderStatus} from '../../../models/order-status.model';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TitleService} from '../../../services/title.service';

const columns: string[] = ['id', 'dateOfOrder', 'totalAmount', 'orderStatus.name'];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = columns;
  orders: Order[];
  colors = OrderStatusCategoryColor;
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  orderStatuses: OrderStatus[] = [];
  allStatuses: OrderStatus[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  statusCtrl = new FormControl();
  filteredStatuses: Observable<OrderStatus[]>;
  orderStatusMap: [string, OrderStatus[]][];

  @ViewChild('statusInput', {static: true}) statusInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: true}) matAutocomplete: MatAutocomplete;

  constructor(private orderService: OrderService,
              private orderStatusService: OrderStatusService,
              private titleService: TitleService) {

  }

  ngOnInit() {
    this.titleService.init();
    this.getOrders();
    this.getStatuses();
  }

  getOrders() {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  getColor(element: Order): string {
    return this.colors.filter(c => c.id === element.orderStatus.orderStatusCategory.id)[0].color;
  }

  getStatusColor(status: OrderStatus): string {
    return this.colors.filter(c => c.id === status.orderStatusCategory.id)[0].color;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = String(filterValue).trim().toLowerCase();
  }

  filterStatus(statusId: number) {
    this.dataSource.filter = statusId;
  }

  getStatuses(): void {
    this.orderStatusService.getOrderStatuses().subscribe(data => {
      this.allStatuses = data;
      this.orderStatusMap = Array.from(this.groupByStatusGroup(this.allStatuses));

      this.filteredStatuses = this.statusCtrl.valueChanges.pipe(
        startWith(null),
        map((status: OrderStatus | null) => status ? this._filter(status.name) : this.allStatuses.slice()));

      this.setFilterPredicateByOrderNo();
    });
  }

  remove(status: OrderStatus): void {
    const index = this.orderStatuses.indexOf(status);

    if (index >= 0) {
      this.orderStatuses.splice(index, 1);
      this.setFilterPredicateByStatus();
      this.filterStatus(status.id);
      this.setFilterPredicateByOrderNo();
      if (this.orderStatuses.length === 0) {
        this.applyFilter('');
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const status: OrderStatus = event.option.value;
    this.orderStatuses.push(status);
    this.statusInput.nativeElement.value = '';
    this.statusCtrl.setValue(null);

    this.setFilterPredicateByStatus();
    this.filterStatus(status.id);
    this.setFilterPredicateByOrderNo();
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value: OrderStatus = {
        name: event.value.trim(),
        id: 15,
        orderStatusCategory: {
          id: 15,
          name: 'nowy'
        }
      };

      if ((value.name || '').trim()) {
        this.orderStatuses.push(value);
        this.setFilterPredicateByStatus();
        this.filterStatus(value.id);
        this.setFilterPredicateByOrderNo();
      }

      if (input) {
        input.value = '';
      }

      this.statusCtrl.setValue(null);
    }
  }

  private setFilterPredicateByOrderNo() {
    this.dataSource.filterPredicate =
      (order: Order, filter: string) => String(order.id).indexOf(filter) !== -1;
  }

  private setFilterPredicateByStatus() {
    this.dataSource.filterPredicate =
      (order: Order, statusId: number) => this.orderStatuses.filter(s => s.id === order.orderStatus.id).length > 0;
  }

  private _filter(value: string): OrderStatus[] {
    const filterValue = value.toLowerCase();

    return this.allStatuses.filter(status => status.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private groupByStatusGroup(list: OrderStatus[]): Map<string, OrderStatus[]> {
    const statusMap = new Map();
    list.forEach((item) => {
      const key = item.orderStatusCategory.name;
      const collection = statusMap.get(key);
      if (!collection) {
        statusMap.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return statusMap;
  }
}
