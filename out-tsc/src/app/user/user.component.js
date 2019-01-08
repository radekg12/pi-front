var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { UserService } from "./user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
var UserComponent = /** @class */ (function () {
    function UserComponent(route, router, userService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.currentPage = 0;
        this.pageSize = 2;
        this.totalElements = 1;
        this.sortBy = 'firstName_asc';
    }
    UserComponent.prototype.ngOnInit = function () {
        this.setParams();
        this.changePage();
    };
    ;
    UserComponent.prototype.setParams = function () {
        var _this = this;
        this.route.paramMap.pipe(switchMap(function (params) {
            // (+) before `params.get()` turns the string into a number
            _this.currentPage = +params.get('page');
            _this.pageSize = +params.get('per_page');
            _this.sortBy = params.get('sort_by');
            // return this.service.getHeroes();
            console.log("params -> " + params);
            return _this.userService.getUsers(_this.currentPage, _this.pageSize, _this.sortBy);
        }));
    };
    UserComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.userService.deleteUser(user).subscribe(function (data) {
            _this.users = _this.users.filter(function (u) { return u !== user; });
        });
    };
    ;
    UserComponent.prototype.changePage = function () {
        var _this = this;
        this.userService.getUsers(this.currentPage, this.pageSize, this.sortBy).subscribe(function (data) {
            _this.users = data['content'];
            _this.totalElements = data['totalElements'];
            console.log("totalPages: " + _this.totalElements + ", data: ");
            console.log(data['content']);
        }, function (error) { return console.log("Radek Errors: \n" + error.error.message); });
    };
    UserComponent = __decorate([
        Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, Router, UserService])
    ], UserComponent);
    return UserComponent;
}());
export { UserComponent };
//# sourceMappingURL=user.component.js.map