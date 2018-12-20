import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DeliveryType} from "../models/delivery-type.model";
import {ShoppingCartPosition} from "../models/shopping-cart-position.model";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ["name", "quantity", "unitPrice", "subtotal"];
  deliveryPosition: ShoppingCartPosition;

  constructor() {
  }

  private _positions: ShoppingCartPosition[];

  get positions(): ShoppingCartPosition[] {
    return this._positions;
  }

  @Input()
  set positions(value: ShoppingCartPosition[]) {
    this._positions = value;
    this.setDeliveryPosition();
    this._positions.push(this.deliveryPosition);
  }

  private _deliveryType: DeliveryType;

  get deliveryType(): DeliveryType {
    return this._deliveryType;
  }

  @Input()
  set deliveryType(value: DeliveryType) {
    this._deliveryType = value;
    this.setDeliveryPosition();
  }

  ngOnInit() {

    console.log("deliveryPosition");
    console.log(this.deliveryPosition);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getTotalCost() {
    return this._positions
      .map(p => p.quantity * +p.product.unitPrice)
      .reduce((x, y) => x + y, 0);
  }

  setDeliveryPosition() {
    this.deliveryPosition = {
      id: "",
      quantity: 1,
      product: {
        id: "",
        description: "",
        imageUrl: "",
        company: "",
        quantityInStock: "",
        subcategory: null,
        specificationPositions: [],
        name: `Dostawa - ${this.deliveryType.name}`,
        unitPrice: `${this.deliveryType.price}`
      }
    };
  }

}
