"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Customer_1 = require("./Customer");
var http_1 = require("@angular/http");
var CustomerDetail = (function () {
    function CustomerDetail(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    Object.defineProperty(CustomerDetail.prototype, "customer", {
        get: function () {
            return this._customer;
        },
        set: function (customer) {
            if (customer != null) {
                this._customer = customer;
                this.currentFile = null;
                this.url = null;
                if (customer.image != null) {
                    this.url = customer.image;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    CustomerDetail.prototype.onchange = function (event) {
        var _this = this;
        if (event.target.files != null && event.target.files[0] != null) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.url = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
            this.currentFile = event.target.files[0];
        }
    };
    CustomerDetail.prototype.onedit = function (name, motto, hometown, blog) {
        var _this = this;
        if (name == null) {
            name = this.customer.name;
        }
        if (motto == null) {
            motto = this.customer.motto;
        }
        if (hometown == null) {
            hometown = this.customer.hometown;
        }
        if (blog == null) {
            blog = this.customer.blog;
        }
        if (this.currentFile == null) {
            this.currentFile = this.customer.image;
        }
        this.customer.name = name;
        this.customer.motto = motto;
        this.customer.hometown = hometown;
        this.customer.blog = blog;
        this.customer.image = this.url;
        var url = "/api/customers/" + this.customer.id;
        this.http
            .put(url, JSON.stringify(this.customer), { headers: this.headers })
            .toPromise()
            .then(function () { return _this.customer; })
            .catch(this.handleError);
    };
    CustomerDetail.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return CustomerDetail;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Customer_1.Customer),
    __metadata("design:paramtypes", [Customer_1.Customer])
], CustomerDetail.prototype, "customer", null);
CustomerDetail = __decorate([
    core_1.Component({
        selector: "customer-detail",
        template: "\n<div *ngIf = \"_customer\">\n    <div>{{customer.name}}</div>\n    <div>\n        <button type=\"button\" (click)=\"onedit(name.value, motto.value, hometown.value, blog.value, fileinput.value)\">Edit</button>\n    </div>\n    <div>\n        <div>Image</div>\n        <div class=\"image-upload\">\n            <label for=\"fileinput\">\n                <img src=\"{{url}}\">\n            </label>\n            <input #fileinput id=\"fileinput\" type=\"file\" (change)= \"onchange($event)\"/>\n        </div>\n        <div>Name</div>\n        <input type=\"text\" placeholder=\"Name\" value={{customer.name}} #name><br> \n        <div>Motto</div>\n        <input type=\"text\" placeholder=\"Motto\" value={{customer.motto}} #motto><br>\n        <div>Hometown</div>\n        <input type=\"text\" placeholder=\"Hometown\" value={{customer.hometown}} #hometown><br>\n        <div>Blog</div>\n        <input type=\"text\" placeholder=\"Blog\" value={{customer.blog}} #blog><br>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], CustomerDetail);
exports.CustomerDetail = CustomerDetail;
//# sourceMappingURL=app.customer_detail.component.js.map