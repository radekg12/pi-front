import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatButtonToggleChange, MatPaginator, MatSelectChange, PageEvent} from "@angular/material";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";

export interface SortByOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageSizeOptions: number[] = [2, 3, 5];
  sortByOptions: SortByOption[] = [
    {value: 'id_asc', viewValue: 'Cena: od najniższej'},
    {value: 'id_desc', viewValue: 'Cena: od najwyższej'},
    {value: 'firstName_asc', viewValue: 'Nazwa: A-Z'},
    {value: 'firstName_desc', viewValue: 'Nazwa: Z-A'},
    {value: 'email_asc', viewValue: 'Marka: A-Z'},
    {value: 'email_desc', viewValue: 'Marka: Z-A'}
  ];
  defaultPage: number = 0;
  defaultPageSize: number = this.pageSizeOptions[0];
  defaultSortBy: string = this.sortByOptions[0].value;
  currentPage: number = this.defaultPage;
  products: Product[];
  pageSize: number = this.defaultPageSize;
  totalElements: number = 0;
  sortBy: string = this.defaultSortBy;
  pageEvent: PageEvent;
  paramMap: ParamMap;
  sub;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() private gridViewIsActive: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.initPaginator();
    console.log(this.route.snapshot);
    this.setParams();
  };

  setParams() {
    console.log(this.route.queryParamMap);
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        console.log("** SET_PARAMS(-1-) **");
        console.log(params);
        console.log("page=" + (+params.get('page')) + " size=" + (+params.get('per_page')) + " sort=" + (params.get('sort_by')));

        this.currentPage = +params.get('page') || this.defaultPage + 1;
        this.currentPage--;
        this.pageSize = +params.get('per_page') || this.defaultPageSize;
        this.sortBy = params.get('sort_by') || this.defaultSortBy;

        console.log("** SET_PARAMS(-2-) **");
        console.log('page: ' + this.currentPage + ", per_page: " + this.pageSize + ", sort_by: " + this.sortBy);
        console.log(this.route.snapshot);
        this.getProducts();

      });
  }

  deleteUser(product: Product): void {
    this.productService.deleteProduct(product).subscribe(data => {
      this.products = this.products.filter(u => u !== product)
    })
  };

  getProducts(): void {
    console.log("GET_PRODUCTS()");
    this.productService.getProductss(this.currentPage, this.pageSize, this.sortBy).subscribe(
      data => {
        console.log("NEXT");
        this.products = data['content'];
        this.totalElements = data['totalElements'];
        this.currentPage = data['number'];
        this.pageSize = data['size'];
        console.log("GET_PRODUCT()");
        console.log(data['content']);
      },
      () => console.log("ERRRORRRRRRRR"),
      () => console.log("COMPLETE"))
  }

  changePage(event?: PageEvent): PageEvent {
    if (event.pageIndex != this.currentPage) this.changePageNumber(event);
    else if (event.pageSize != this.pageSize) this.changePageSize(event);
    return event;
  }

  identify(index, item) {
    return item.name;
  }

  switchView($event: MatButtonToggleChange) {
    this.gridViewIsActive = $event.value === "true";
  }

  switchToGridView(): void {
    this.gridViewIsActive = true;
    console.log("switchToGridView");
  }

  switchToListView(): void {
    this.gridViewIsActive = false;
    console.log("switchToListView");

  }

  changePageSorting($event: MatSelectChange) {
    console.log("changeSoring()");
    this.sortBy = $event.value;
    this.router.navigate(['./'], {
      queryParams: {
        page: null,
        sort_by: $event.value == this.defaultSortBy ? null : $event.value,
      },
      queryParamsHandling: "merge",
      relativeTo: this.route
    });
  }

  showDetails(productId: number | string) {
    this.router.navigate(['./', productId], {relativeTo: this.route})
  }

  private changePageNumber(event?: PageEvent) {
    this.router.navigate(['./'], {
      queryParams: {
        page: event.pageIndex == this.defaultPage ? null : event.pageIndex + 1,
      },
      queryParamsHandling: "merge",
      relativeTo: this.route
    });
  }

  private changePageSize(event?: PageEvent) {
    this.router.navigate(['./'], {
      queryParams: {
        page: null,
        per_page: event.pageSize == this.defaultPageSize ? null : event.pageSize,
      },
      queryParamsHandling: "merge",
      relativeTo: this.route
    });
  }

  private initPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = 'Produktów na stronie';
    this.paginator._intl.lastPageLabel = 'Ostatnia strona';
    this.paginator._intl.firstPageLabel = 'Pierwsza strona';
    this.paginator._intl.nextPageLabel = 'Następna strona';
    this.paginator._intl.previousPageLabel = 'Poprzednia strona';
    this.paginator._intl.getRangeLabel = () => {
      return `${this.paginator.pageIndex + 1}  z  ${Math.ceil(this.paginator.length / this.paginator.pageSize)}`;
    };
  }

}
