var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
var header = new HttpHeaders({ 'Content-Type': 'aplication/json' });
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.userUrl = 'api/users';
    }
    UserService.prototype.ngOnInit = function () {
    };
    UserService.prototype.deleteUser = function (user) {
        return this.http.delete(this.userUrl + "/" + user.id);
    };
    UserService.prototype.createUser = function (user) {
        return this.http.post(this.userUrl, user);
    };
    UserService.prototype.getUsers = function (page, perPage, sortBy) {
        var params = new HttpParams()
            .set("page", String(page))
            .set("per_page", String(perPage))
            .set("sort_by", sortBy);
        return this.http.get(this.userUrl, { params: params, headers: header });
    };
    __decorate([
        Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserService.prototype, "ngOnInit", null);
    UserService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map