﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.components';
import { CustomerDetail } from './app.customer_detail.component';

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent, CustomerDetail],
    bootstrap: [AppComponent]
})
export class AppModule { }