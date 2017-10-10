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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var AppComponent = (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.title = 'Our Customers';
        this.customers = [];
        this.baseUrl = 'api/customers';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.getCustomers().then(function (result) { return _this.parseJson(result); });
    }
    AppComponent.prototype.getCustomers = function () {
        return this.http.get(this.baseUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AppComponent.prototype.parseJson = function (data) {
        for (var i = 0; i < data.length; i++) {
            this.customers.push({ id: data[i].Id, image: data[i].image, name: data[i].name, blog: data[i].blog, motto: data[i].motto, hometown: data[i].hometown });
        }
    };
    AppComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    AppComponent.prototype.onselect = function (selected) {
        this.selectedcustomer = selected;
    };
    AppComponent.prototype.onremove = function (selected) {
        if (selected == this.selectedcustomer) {
            this.selectedcustomer = null;
        }
        this.customers.splice(this.customers.findIndex(function (x) { return x.id == selected.id; }), 1);
        var url = "api/customers/" + selected.id;
        this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    AppComponent.prototype.onadd = function () {
        var id = this.customers.length + 1;
        this.customers.push({ id: id, name: "John Doe", blog: "None", motto: "None", hometown: "Amsterdam", image: "./favicon.ico" });
        this.onselect(this.customers[id - 1]);
        this.http
            .post(this.baseUrl, JSON.stringify(this.customers[id - 1]), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        styleUrls: ['./scripts/W3.css'],
        template: "<div class=\"menu\">\n    <div>\n        <div>{{title}}</div>\n        <button type=\"button\" (click)=\"onadd()\">Add</button>\n    </div>\n    <ul style=\"list-style-type: none;\">\n        <li *ngFor=\"let customer of customers\" (click)=\"onselect(customer)\" class=\"w3-card\">\n            <img *ngIf=\"customer.image\" src=\"{{customer.image}}\">\n            <div>{{customer.name}}</div>\n            <div>{{customer.hometown}}</div>\n            <a href={{customer.blog}}>{{customer.blog}}</a>\n            <button type=\"button\" (click)=\"onremove(customer)\">Remove</button>\n        </li>\n    </ul>\n</div>\n<customer-detail [customer] = \"selectedcustomer\" class=\"details\"></customer-detail>\n",
        styles: [
            "ul {\n    list-style-type: none;\n}\n\nhtml {\npadding:0px;\nmargin:0px;\n}\n.menu {\nbackground-color: #e1ddd9;\nfont-size: 12px;\nfloat: left;\nwidth: 200px;\nfont-family: Verdana, Arial, SunSans-Regular, Sans-Serif;\ncolor:#564b47;\npadding:0px 20px;\nmargin:0px;\n}\n.details {\nfloat: right;\nwidth: calc(100% - 200px);\nbackground-color: #e1ddd9;\nmargin:0px 0px 0px 0px;\noverflow: auto;\n}"
        ],
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.components.js.map