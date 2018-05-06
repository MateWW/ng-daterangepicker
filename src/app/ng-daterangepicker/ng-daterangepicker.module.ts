import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarComponent } from './components/calendar.component';
import { InputComponent } from './components/input.component';
import { NgDateRangePickerComponent } from './ng-daterangepicker.component';
import { PickerDatePipe } from './pipes/picker-date.pipe';
import { NgDaterangepickerService } from './service/ng-daterangepicker.service';

@NgModule({
    imports: [CommonModule, BrowserAnimationsModule],
    declarations: [NgDateRangePickerComponent, InputComponent, CalendarComponent, PickerDatePipe],
    providers: [NgDaterangepickerService],
    exports: [NgDateRangePickerComponent],
})
export class NgDateRangePickerModule {}
