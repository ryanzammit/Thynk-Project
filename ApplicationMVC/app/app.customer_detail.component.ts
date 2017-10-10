import { Component, Input } from '@angular/core';
import { Customer } from './Customer';
import { Headers, Http } from '@angular/http';

@Component({
    selector: `customer-detail`,
    template:
`
<div *ngIf = "_customer">
    <div>{{customer.name}}</div>
    <div>
        <button type="button" (click)="onedit(name.value, motto.value, hometown.value, blog.value, fileinput.value)">Edit</button>
    </div>
    <div>
        <div>Image</div>
        <div class="image-upload">
            <label for="fileinput">
                <img src="{{url}}">
            </label>
            <input #fileinput id="fileinput" type="file" (change)= "onchange($event)"/>
        </div>
        <div>Name</div>
        <input type="text" placeholder="Name" value={{customer.name}} #name><br> 
        <div>Motto</div>
        <input type="text" placeholder="Motto" value={{customer.motto}} #motto><br>
        <div>Hometown</div>
        <input type="text" placeholder="Hometown" value={{customer.hometown}} #hometown><br>
        <div>Blog</div>
        <input type="text" placeholder="Blog" value={{customer.blog}} #blog><br>
    </div>
</div>
`
})

export class CustomerDetail {
    _customer: Customer;
    @Input() set customer(customer: Customer) {
        if (customer != null){
            this._customer = customer;
            this.currentFile = null;
            this.url = null;
            if (customer.image != null) {
                this.url = customer.image;
            }
        }
    }
    get customer() : Customer{
        return this._customer;
    }

    currentFile: any
    url : string

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
        
    }

    onchange(event:any) {
        if (event.target.files != null && event.target.files[0] != null) {
            var reader = new FileReader();

            reader.onload = (event:any) => {
                this.url = event.target.result;
            }

            reader.readAsDataURL(event.target.files[0]);
            this.currentFile = event.target.files[0];
        }
    }

    onedit(name:string, motto:string, hometown:string, blog:string): void {

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

        const url = `/api/customers/${this.customer.id}`;
        this.http
            .put(url, JSON.stringify(this.customer), { headers: this.headers })
            .toPromise()
            .then(() => this.customer)
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
