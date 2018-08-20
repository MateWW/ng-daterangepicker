import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgDateRangePickerModule } from '../../public_api';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, NgDateRangePickerModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
