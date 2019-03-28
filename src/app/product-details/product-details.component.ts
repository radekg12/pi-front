import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {MatSnackBar} from '@angular/material';

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
  imgLoad = false;
  saving = false;

  slides = [
    {img: 'http://placehold.it/350x150/000000'},
    {img: 'http://placehold.it/350x150/111111'},
    {img: 'http://placehold.it/350x150/333333'},
    {img: 'http://placehold.it/350x150/666666'},
    {img: 'http://placehold.it/350x150/000000'},
    {img: 'http://placehold.it/350x150/111111'},
    {img: 'http://placehold.it/350x150/333333'},
    {img: 'http://placehold.it/350x150/666666'}
  ];
  slideConfig = {'slidesToShow': 4, 'slidesToScroll': 1};

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
    });
    this.getProduct();
    this.getRecommendedProducts();
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

  loadImg() {
    console.log('IMG LOADED');
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


  addSlide() {
    this.slides.push({img: 'http://placehold.it/350x150/777777'});
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}
