import {Component, OnInit} from '@angular/core';
import {CATEGORY_GROUPS} from "../mock/mock-category-group";
import {CategoryGroup} from "../models/category-group.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  categoryGroups: CategoryGroup[] = CATEGORY_GROUPS;
  categoriesIsActive: boolean = false;

  constructor() {
  }

  ngOnInit() {
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
}
