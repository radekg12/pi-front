import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import {TitleService} from '../../../services/title.service';

const columns: string[] = ['id', 'name', 'company', 'logicalQuantityInStock', 'unitPrice'];

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = columns;
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private products: Product[];

  constructor(private productService: ProductService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.init();
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
    });
    console.log('orders');
    console.log(this.products);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
