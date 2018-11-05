import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatButtonToggleChange, MatSelectChange, PageEvent} from "@angular/material";
import {Component, Input, OnInit} from "@angular/core";

export interface SortByOption {
  value: string;
  viewValue: string;
}

{

}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  pageSizeOptions: number[] = [2, 3, 5];
  sortByOptions: SortByOption[] = [
    {value: 'id_asc', viewValue: 'Price: Low to High'},
    {value: 'id_desc', viewValue: 'Price: High to Low'},
    {value: 'firstName_asc', viewValue: 'Name: Low to High'},
    {value: 'firstName_desc', viewValue: 'Name: High to Low'},
    {value: 'email_asc', viewValue: 'Brand name: Low to High'},
    {value: 'email_desc', viewValue: 'Brand name: High to Low'}
  ];
  defaultPage: number = 0;
  defaultPageSize: number = this.pageSizeOptions[0];
  defaultSortBy: string = this.sortByOptions[0].value;
  currentPage: number = this.defaultPage;
  users: User[];
  pageSize: number = this.defaultPageSize;
  totalElements: number = 0;
  sortBy: string = this.defaultSortBy;
  pageEvent: PageEvent;
  paramMap: ParamMap;
  sub;
  @Input() private gridViewIsActive: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
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
        this.getUsers();

      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(data => {
      this.users = this.users.filter(u => u !== user)
    })
  };

  getUsers(): void {
    console.log("GET_USERS()");
    this.userService.getUserss(this.currentPage, this.pageSize, this.sortBy).subscribe(data => {
        console.log("NEXT");
        this.users = data['content'];
        this.totalElements = data['totalElements'];
        this.currentPage = data['number'];
        this.pageSize = data['size'];
        console.log("GET_USERS()");
        console.log(data['content']);
      },
      () => console.log("ERRRORRRRRRRR"),
      () => console.log("COMPLETE"))
  }

  changePage(event?: PageEvent) {
    if (event.pageIndex != this.currentPage) this.changePageNumber(event);
    else if (event.pageSize != this.pageSize) this.changePageSize(event);
  }

  identify(index, item) {
    return item.name;
  }

  switchView($event: MatButtonToggleChange) {
    this.gridViewIsActive = $event.value === "true";
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
}
