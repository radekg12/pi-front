import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {MatSnackBar} from "@angular/material";

// const data = [
//   {name: "Wymiary", detail: "12,13\" x 8,79\" x ,57\" (308,1 mm x 223,27 mm x 14,48 mm)"},
//   {
//     name: "Wyświetlacz", detail: "Ekran: PixelSense™ o przekątnej 13.5\"\n" +
//       "Rozdzielczość: 2256 x 1504 (201 ppi)\n" +
//       "Współczynnik proporcji: 3:2\n" +
//       "3,4 mln pikseli\n" +
//       "Obsługa Pióra Surface4\n" +
//       "Dotyk: 10-punktowy wielodotyk\n" +
//       "Corning® Gorilla® Glass 3"
//   },
//   {name: "Pamięć", detail: "\t4 GB, 8 GB lub 16 GB RAM"},
//   {name: "Procesor", detail: "Intel® Core™ i5 lub i7 7. generacji"},
//   {
//     name: "Masa", detail: "i5: 2,76 funta (1,252 g)\n" +
//       "i7: 2,83 funta (1,283 g)"
//   },
//   {name: "Czas pracy baterii", detail: "Do 14.5 godzin odtwarzania wideo"},
//   {
//     name: "Co jest w opakowaniu", detail: "Surface Laptop\n" +
//       "Zasilacz\n" +
//       "Przewodnik „Szybki start”\n" +
//       "Dokumenty gwarancyjne i dotyczące bezpieczeństwa"
//   }
// ];

const columns: string[] = ['name', 'detail'];

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product = new Product();
  id: number;
  sub;
  dataSource;
  displayedColumns: string[] = columns;
  imgLoad = false;

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
    });
    this.getProduct()
  }


  getProduct(): void {
    console.log('getProduct(' + this.id + ")");
    this.productService.getProduct(this.id)
      .subscribe(
        data => {
          console.log("next 1");
          this.product = data;
          console.log("next 2");
          console.log(data);
          console.log(this.product);
          this.dataSource = this.product.specificationPositions;
          console.log("next 3");
          console.log(this.dataSource);
        },
        error1 => {
          console.log("ERRORRRR");
          console.log(error1);
        },
        () => console.log("COMPLETEEEE"))
  }

  loadImg() {
    console.log("IMG LOADED");
  }

  addProductToCart() {
    this.shoppingCartService.addProduct(this.id).subscribe(
      data => {
        this.showMessage();
      }
    );
  }

  goToShoppingCart(): void {
    this.router.navigate(['./cart']);
  }

  private showMessage() {
    this.snackBar
      .open("Dodano produkt do koszyka", "Przejdź do koszyka",
        {duration: 50000,})
      .onAction()
      .subscribe(() => this.goToShoppingCart());
  }
}
