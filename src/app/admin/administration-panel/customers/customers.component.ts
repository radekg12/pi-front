import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Customer} from '../../../models/customer.model';
import {CustomerService} from '../../../services/customer.service';
import {TitleService} from '../../../services/title.service';

const columns: string[] = ['id', 'firstName', 'lastName', 'email'];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = columns;
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private customers: Customer[];

  constructor(private customerService: CustomerService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.init();
    this.getOrders();
  }

  getOrders() {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.sort = this.sort;
    });
    console.log('orders');
    console.log(this.customers);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
