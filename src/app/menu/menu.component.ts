import {Component, OnInit} from '@angular/core';
import {Category} from "../models/category-group.model";
import {MenuService} from "../services/menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  categories: Category[];
  categoriesIsActive: boolean = false;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.getCategories();
    this.categoriesIsActive = false;
  }

  ngAfterViewInit() {
    // this.initMenuAnimation()
  }

  openCategoryMenu(event): void {
    this.categoriesIsActive = !this.categoriesIsActive;
    console.log("isActive? " + this.categoriesIsActive);
    event.preventDefault();
  }

  goToCategory(event) {
    this.categoriesIsActive = false;
    console.log("isActive? " + this.categoriesIsActive);
    event.preventDefault();
  }

  getCategories(): void {
    this.menuService.getMenuCategories().subscribe(
      data => {
        console.log("getCategories");
        this.categories = data
      },
      e => console.log('error - menu categories')
    );
  }
}
