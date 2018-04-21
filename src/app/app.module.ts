import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgDateRangePickerModule } from './ng-daterangepicker/ng-daterangepicker.module';

@NgModule({
    declarations: [AppComponent],
    imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, NgDateRangePickerModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
