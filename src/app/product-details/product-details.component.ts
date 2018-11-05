import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user/user.service";
import {User} from "../models/user.model";

const data = [
  {name: "Wymiary", detail: "12,13\" x 8,79\" x ,57\" (308,1 mm x 223,27 mm x 14,48 mm)"},
  {
    name: "Wyświetlacz", detail: "Ekran: PixelSense™ o przekątnej 13.5\"\n" +
      "Rozdzielczość: 2256 x 1504 (201 ppi)\n" +
      "Współczynnik proporcji: 3:2\n" +
      "3,4 mln pikseli\n" +
      "Obsługa Pióra Surface4\n" +
      "Dotyk: 10-punktowy wielodotyk\n" +
      "Corning® Gorilla® Glass 3"
  },
  {name: "Pamięć", detail: "\t4 GB, 8 GB lub 16 GB RAM"},
  {name: "Procesor", detail: "Intel® Core™ i5 lub i7 7. generacji"},
  {
    name: "Masa", detail: "i5: 2,76 funta (1,252 g)\n" +
      "i7: 2,83 funta (1,283 g)"
  },
  {name: "Czas pracy baterii", detail: "Do 14.5 godzin odtwarzania wideo"},
  {
    name: "Co jest w opakowaniu", detail: "Surface Laptop\n" +
      "Zasilacz\n" +
      "Przewodnik „Szybki start”\n" +
      "Dokumenty gwarancyjne i dotyczące bezpieczeństwa"
  }
];

const columns: string[] = ['name', 'detail'];

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() user: User;
  id: number;
  sub;
  dataSource = data;
  displayedColumns: string[] = columns;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getUser()
  }

  getUser(): void {
    this.userService.getUser(this.id)
      .subscribe(data =>
        this.user = data);
  }

}
