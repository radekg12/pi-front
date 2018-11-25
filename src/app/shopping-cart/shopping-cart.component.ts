import {Component, OnInit} from '@angular/core';
import {CartItem} from "../models/cart-item.model";
import {SHOPPING_CART} from "../mock/mock-shopping-cart";

const columns = ["name", "price", "quantity", "subtotal"];

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[] = SHOPPING_CART;
  displayedColumns: string[] = columns;
  priceSum: number;

  constructor() {
  }


  ngOnInit() {
  }

  increaseQuantity(item: CartItem) {
    console.log("increase quantity: " + item.quantity + "; ");
    item.quantity++;
    // TODO http.post
  }

  reduceQuantity(item: CartItem) {
    console.log("reduce quantity: " + item.quantity + "; ");
    item.quantity--;
    // TODO http.post
  }

  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(i => i !== item);
    // TODO http.delete
    console.log("remove item ")
  }

  getSumPrice(): number {
    let sum: number = 0;
    this.cartItems.forEach(i => sum += (+i.product.lastName * i.quantity));
    console.log("calculate sum: " + sum);
    return sum;
  }
}
