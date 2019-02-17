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
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.user = new User();
    }
    AddUserComponent.prototype.createUser = function () {
        this.userService.createUser(this.user).subscribe(function (data) { return alert("User created successfully."); }, function (error) { return console.log(error.error.message); });
    };
    AddUserComponent.prototype.ngOnInit = function () {
    };
    AddUserComponent = __decorate([
        Component({
            selector: 'app-add-user',
            templateUrl: './add-user.component.html',
            styleUrls: ['./add-user.component.css']
        }),
        __metadata("design:paramtypes", [Router, UserService])
    ], AddUserComponent);
    return AddUserComponent;
}());
export { AddUserComponent };
//# sourceMappingURL=add-user.component.js.map