import { Component } from '@angular/core';
import { Customer } from './customer';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-app',
    styleUrls: ['./scripts/W3.css'],
    template:
`<div class="menu">
    <div>
        <div>{{title}}</div>
        <button type="button" (click)="onadd()">Add</button>
    </div>
    <ul style="list-style-type: none;">
        <li *ngFor="let customer of customers" (click)="onselect(customer)" class="w3-card">
            <img *ngIf="customer.image" src="{{customer.image}}">
            <div>{{customer.name}}</div>
            <div>{{customer.hometown}}</div>
            <a href={{customer.blog}}>{{customer.blog}}</a>
            <button type="button" (click)="onremove(customer)">Remove</button>
        </li>
    </ul>
</div>
<customer-detail [customer] = "selectedcustomer" class="details"></customer-detail>
`,
    styles:
    [
`ul {
    list-style-type: none;
}

html {
padding:0px;
margin:0px;
}
.menu {
background-color: #e1ddd9;
font-size: 12px;
float: left;
width: 200px;
font-family: Verdana, Arial, SunSans-Regular, Sans-Serif;
color:#564b47;
padding:0px 20px;
margin:0px;
}
.details {
float: right;
width: calc(100% - 200px);
background-color: #e1ddd9;
margin:0px 0px 0px 0px;
overflow: auto;
}`],
})

export class AppComponent {
    title = 'Our Customers';
    customers: Customer[] = [];
    baseUrl = 'api/customers';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http)
    {
        this.getCustomers().then(result => this.parseJson(result));
    }

    url: string

    getCustomers(): Promise<string> {
        return this.http.get(this.baseUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    parseJson(data:any) {
        for (var i = 0; i < data.length;i++){
            this.customers.push({id: data[i].Id, image: data[i].image ,name: data[i].name, blog: data[i].blog, motto: data[i].motto, hometown: data[i].hometown });
        }
    }

    handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    selectedcustomer: Customer;
    onselect(selected: Customer): void {
        this.selectedcustomer = selected;
    }

    onremove(selected: Customer): void {
        if (selected == this.selectedcustomer) {
            this.selectedcustomer = null;
        }
        this.customers.splice(this.customers.findIndex(x => x.id == selected.id), 1);
        const url = `api/customers/${selected.id}`;
        this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    onadd(): void {
        var id = this.customers.length + 1;
        this.customers.push({ id: id, name: "John Doe", blog: "None", motto: "None", hometown: "Amsterdam", image: "./favicon.ico" });
        this.onselect(this.customers[id - 1]);

        this.http
            .post(this.baseUrl, JSON.stringify(this.customers[id-1]), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Customer)
            .catch(this.handleError);
    }
    }