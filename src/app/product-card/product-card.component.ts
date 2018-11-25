import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  @Input() imageSrc: string;
  @Input() listView: boolean;
  @Output() clickOnDetail = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
  }

  goToDetail() {
    this.clickOnDetail.emit();
  }
}
