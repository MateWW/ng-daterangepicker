import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalendarComponent } from './components/calendar.component';
import { InputComponent } from './components/input.component';
import { NgDateRangePickerComponent } from './ng-daterangepicker.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NgDateRangePickerComponent, InputComponent, CalendarComponent],
    exports: [NgDateRangePickerComponent],
})
export class NgDateRangePickerModule {}
