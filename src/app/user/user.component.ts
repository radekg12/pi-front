import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  gridViewIsActive: boolean = true;
  users: User[];
  currentPage: number = 0;
  pageSize: number = 2;
  totalElements: number = 1;
  sortBy: string = 'firstName_asc';
  pageSizeOptions: number[] = [2, 3, 4];
  paramMap: ParamMap;


  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.setParams();
    this.changePage();
  };

  setParams() {
    console.log('SET PARAMS..');
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        //console.log("page=" + (+params.get('page')) + " size=" + (+params.get('per_page')) + " sort=" + (params.get('sort_by')));
        if (params.get('page')) this.currentPage = +params.get('page');
        if (params.get('per_page')) this.pageSize = +params.get('per_page');
        if (params.get('sort_by')) this.sortBy = params.get('sort_by');
        console.log('page: ' + this.currentPage + ", per_page: " + this.pageSize + ", sort_by: " + this.sortBy);
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(data => {
      this.users = this.users.filter(u => u !== user)
    })
  };

  changePage(): void {
    this.userService.getUsers(this.currentPage, this.pageSize, this.sortBy).subscribe(
      data => {
        this.users = data['content'];
        this.totalElements = data['totalElements'];
        console.log("totalPages: " + this.totalElements + ", data: ");
        console.log(data['content']);
      },
      error => console.log("Radek Errors: \n" + error.error.message),
      () => this.router.navigate(['users'], {
        queryParams: {
          page: this.currentPage,
        },
        queryParamsHandling: "merge"
      })
    );
  }

  switchToGridView(): void {
    this.gridViewIsActive = true;
  }

  switchToListView(): void {
    this.gridViewIsActive = false;
  }


}
