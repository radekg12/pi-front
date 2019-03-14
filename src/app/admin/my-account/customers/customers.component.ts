import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {Customer} from "../../../models/customer.model";
import {CustomerService} from "../../../services/customer.service";

const columns: string[] = ['id', 'firstName', "lastName", "email"];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = columns;
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  private customers: Customer[];

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.sort = this.sort;
    });
    console.log("orders");
    console.log(this.customers);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}