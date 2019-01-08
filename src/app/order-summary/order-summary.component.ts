import {Component, Input, OnInit} from '@angular/core';
import {DeliveryType} from "../models/delivery-type.model";
import {ShoppingCartPosition} from "../models/shopping-cart-position.model";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  private _positions: ShoppingCartPosition[];
  dataSource: MatTableDataSource<ShoppingCartPosition>;

  get positions(): ShoppingCartPosition[] {
    return this._positions;
  }

  displayedColumns: string[] = ["name", "quantity", "unitPrice", "subtotal"];
  deliveryPosition: ShoppingCartPosition;

  constructor() {
  }


  ngOnInit() {

    console.log("deliveryPosition");
    console.log(this.deliveryPosition);
  }

  @Input()
  set positions(value: ShoppingCartPosition[]) {
    console.log(`set positions(value: ShoppingCartPosition[])`);
    console.log(value);
    this._positions = value;
  }

  get deliveryType(): DeliveryType {
    console.log(`get deliveryType`);
    console.log(this._deliveryType);
    return this._deliveryType;
  }

  private _deliveryType: DeliveryType;

  @Input()
  set deliveryType(value: DeliveryType) {
    console.log(`set deliveryType(value: DeliveryType)`);
    console.log(value);
    this._deliveryType = value;
    this.setDeliveryPosition();
  }

  getTotalCost() {
    console.log(`getTotalCost()`);
    console.log(this.positions);
    return this.dataSource.data
      .map(p => p.quantity * +p.product.unitPrice)
      .reduce((x, y) => x + y, 0);
  }

  setDeliveryPosition() {
    console.log(`setDeliveryPosition()`);
    console.log(this.deliveryType.name);
    this.deliveryPosition = {
      id: null,
      quantity: 1,
      product: {
        name: `Dostawa - ${this.deliveryType.name}`,
        unitPrice: `${this.deliveryType.price}`
      }
    };

    const positions2: ShoppingCartPosition[] = this.positions.map(x => Object.assign({}, x));
    positions2.push(this.deliveryPosition);
    this.dataSource = new MatTableDataSource(positions2);

  }

}
