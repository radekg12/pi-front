import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {ShoppingCartPosition} from '../models/shopping-cart-position.model';
import {MatSnackBar} from '@angular/material';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user.model';
import {TitleService} from '../services/title.service';

const columns = ['name', 'price', 'quantity', 'subtotal'];

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: ShoppingCartPosition[];
  displayedColumns: string[] = columns;
  priceSum: number;
  saving = false;

  currentUser: User;

  constructor(private shoppingCartService: ShoppingCartService,
              public snackBar: MatSnackBar,
              private authenticationService: AuthenticationService,
              private titleService: TitleService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.titleService.init();
    console.log('getProduct');
    this.getProducts();
    console.log('getProduct_2');
    console.log(this.cartItems);
  }

  getProducts() {
    this.shoppingCartService.getProducts().subscribe(data => this.cartItems = data);
  }

  increaseQuantity(item: ShoppingCartPosition) {
    console.log(`increase quantity: ${item.quantity}; `);
    this.shoppingCartService.updateProduct(+item.product.id, ++item.quantity).subscribe(data => {
      console.log('increaseQuantity');
      item.quantity = data.quantity;
      this.showMessage('Zmieniono zawartość koszyka');
    });
  }

  decreaseQuantity(item: ShoppingCartPosition) {
    console.log(`reduce quantity: ${item.quantity}; `);
    this.shoppingCartService.updateProduct(+item.product.id, --item.quantity).subscribe(data => {
      console.log('decreaseQuantity');
      item.quantity = data.quantity;
      this.showMessage('Zmieniono zawartość koszyka');
    });
  }

  removeItem(item: ShoppingCartPosition) {
    this.saving = true;
    this.cartItems = this.cartItems.filter(i => i !== item);
    this.shoppingCartService.deleteProduct(+item.product.id).subscribe(data => {
      this.saving = false;
      this.cartItems = this.cartItems.filter(i => i !== data);
    }, error1 => {
      this.saving = false;
    });
    console.log('remove item ');
    this.showMessage('Usunięto produkt z koszyka');
  }

  getSumPrice(): number {
    let sum = 0;
    this.cartItems.forEach(i => sum += (+i.product.unitPrice * i.quantity));
    console.log(`calculate sum: ${sum}`);
    return sum;
  }

  changeQuantity(productId: number, quanity: number) {
    this.saving = true;
    this.shoppingCartService.updateProduct(productId, quanity).subscribe(data => {
      this.saving = false;
      console.log('changeQuantity');
      quanity = data.quantity;
      this.showMessage('Zmieniono zawartość koszyka');
    }, error1 => {
      this.saving = false;
    });
  }

  showMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  goToPayment() {
    console.log('goToPayment');
  }
}
