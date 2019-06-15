import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Category} from '../models/category-group.model';
import {MenuService} from '../services/menu.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  categories: Category[];
  categoriesIsActive = false;

  constructor(private menuService: MenuService,
              private _authenticationService: AuthenticationService,
              private eRef: ElementRef) {
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.categoriesIsActive = false;
    }
  }

  ngOnInit() {
    this.getCategories();
    this.categoriesIsActive = false;
  }

  openCategoryMenu(event): void {
    this.categoriesIsActive = !this.categoriesIsActive;
    event.preventDefault();
  }

  goToCategory(event) {
    this.categoriesIsActive = false;
    event.preventDefault();
  }

  getCategories(): void {
    this.menuService.getMenuCategories().subscribe(
      data => {
        this.categories = data;
      },
      e => {
      }
    );
  }

  goToPage($event: MouseEvent) {
    this.categoriesIsActive = false;
  }


  get authenticationService(): AuthenticationService {
    return this._authenticationService;
  }
}
