import {Component, Input, OnInit} from '@angular/core';
import {DeliveryType} from '../models/delivery-type.model';
import {ShoppingCartPosition} from '../models/shopping-cart-position.model';
import {MatTableDataSource} from '@angular/material';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'unitPrice', 'subtotal'];

  private _positions: ShoppingCartPosition[];
  dataSource: MatTableDataSource<ShoppingCartPosition>;

  get positions(): ShoppingCartPosition[] {
    return this._positions;
  }

  private _deliveryType: DeliveryType;
  deliveryPosition: ShoppingCartPosition;

  constructor(private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.init();
  }

  @Input()
  set positions(value: ShoppingCartPosition[]) {
    this._positions = value;
  }

  get deliveryType(): DeliveryType {
    return this._deliveryType;
  }


  @Input()
  set deliveryType(value: DeliveryType) {
    this._deliveryType = value;
    this.setDeliveryPosition();
  }

  getTotalCost() {
    return this.dataSource.data
      .map(p => p.quantity * +p.product.unitPrice)
      .reduce((x, y) => x + y, 0);
  }

  setDeliveryPosition() {
    this.deliveryPosition = {
      id: null,
      quantity: 1,
      product: {
        id: 0,
        name: `Dostawa - ${this.deliveryType.name}`,
        unitPrice: this.deliveryType.price
      }
    };

    const positions2: ShoppingCartPosition[] = this.positions.map(x => Object.assign({}, x));
    positions2.push(this.deliveryPosition);
    this.dataSource = new MatTableDataSource(positions2);

  }

}
