import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ShoppingCartPosition} from "../models/shopping-cart-position.model";
import {MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../models/user.model";

const columns = ["name", "price", "quantity", "subtotal"];

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: ShoppingCartPosition[];
  displayedColumns: string[] = columns;
  priceSum: number;

  currentUser: User;

  constructor(private shoppingCartService: ShoppingCartService,
              public snackBar: MatSnackBar,
              private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    console.log("getProduct");
    this.getProducts();
    console.log("getProduct_2");
    console.log(this.cartItems);
  }

  getProducts() {
    this.shoppingCartService.getProducts().subscribe(data => this.cartItems = data);
  }

  increaseQuantity(item: ShoppingCartPosition) {
    console.log("increase quantity: " + item.quantity + "; ");
    this.shoppingCartService.updateProduct(+item.product.id, ++item.quantity).subscribe(data => {
      console.log("increaseQuantity");
      item.quantity = data.quantity;
      this.showMessage("Zmieniono zawartość koszyka");
    });
  }

  decreaseQuantity(item: ShoppingCartPosition) {
    console.log("reduce quantity: " + item.quantity + "; ");
    this.shoppingCartService.updateProduct(+item.product.id, --item.quantity).subscribe(data => {
      console.log("decreaseQuantity");
      item.quantity = data.quantity;
      this.showMessage("Zmieniono zawartość koszyka");
    });
  }

  removeItem(item: ShoppingCartPosition) {
    this.cartItems = this.cartItems.filter(i => i !== item);
    this.shoppingCartService.deleteProduct(+item.product.id).subscribe(data => this.cartItems = this.cartItems.filter(i => i !== data));
    console.log("remove item ");
    this.showMessage("Usunięto produkt z koszyka");
  }

  getSumPrice(): number {
    let sum: number = 0;
    this.cartItems.forEach(i => sum += (+i.product.unitPrice * i.quantity));
    console.log("calculate sum: " + sum);
    return sum;
  }

  changeQuantity(productId: number, quanity: number) {
    this.shoppingCartService.updateProduct(productId, quanity).subscribe(data => {
      console.log("changeQuantity");
      quanity = data.quantity;
      this.showMessage("Zmieniono zawartość koszyka");
    });
  }

  showMessage(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
  }

  goToPayment() {
    console.log("goToPayment");
  }
}
