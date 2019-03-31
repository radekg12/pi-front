import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {MatSnackBar} from '@angular/material';

import 'hammerjs';
// import 'hammer-timejs';

const columns: string[] = ['name', 'detail'];

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product = new Product();
  recommendedProducts: Product[];
  id: number;
  sub;
  dataSource;
  displayedColumns: string[] = columns;
  saving = false;

  slideConfigLtMd = {'slidesToShow': 2, 'slidesToScroll': 2};
  slideConfigMd = {'slidesToShow': 3, 'slidesToScroll': 3};
  slideConfig = {'slidesToShow': 5, 'slidesToScroll': 5};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(`producy id = ${this.id}`);
      this.getProduct();
      this.getRecommendedProducts();
    });
  }


  getProduct(): void {
    console.log(`getProduct(${this.id})`);
    this.productService.getProduct(this.id)
      .subscribe(
        data => {
          console.log('next 1');
          this.product = data;
          console.log('next 2');
          console.log(data);
          console.log(this.product);
          this.dataSource = this.product.specificationPositions;
          console.log('next 3');
          console.log(this.dataSource);
        },
        error1 => {
          console.log('ERRORRRR');
          console.log(error1);
        },
        () => console.log('COMPLETEEEE'));
  }

  getRecommendedProducts() {
    this.productService.getRecommendedProducts(this.id).subscribe(data => {
        this.recommendedProducts = data['content'];

      }, error1 => {
      }
    );
  }

  addProductToCart() {
    this.saving = true;
    this.shoppingCartService.addProduct(this.id).subscribe(
      data => {
        this.saving = false;
        this.showMessage();
      },
      error1 => {
        this.saving = false;
        if (error1.status === 401) {
          this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
        }
      }
    );
  }

  goToShoppingCart(): void {
    this.router.navigate(['./cart']);
  }

  private showMessage() {
    this.snackBar
      .open('Dodano produkt do koszyka', 'Przejdź do koszyka',
        {duration: 5000})
      .onAction()
      .subscribe(() => this.goToShoppingCart());
  }

  getSlideConfig() {
    if (window.innerWidth < 959) {
      return this.slideConfigLtMd;
    } else if (window.innerWidth < 1279) {
      return this.slideConfigMd;
    } else {
      return this.slideConfig;
    }

  }

}
