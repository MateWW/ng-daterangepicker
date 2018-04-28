import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalendarComponent } from './components/calendar.component';
import { InputComponent } from './components/input.component';
import { NgDateRangePickerComponent } from './ng-daterangepicker.component';
import { NgDaterangepickerService } from './service/ng-daterangepicker.service';

@NgModule({
    imports: [CommonModule],
    declarations: [NgDateRangePickerComponent, InputComponent, CalendarComponent],
    providers: [NgDaterangepickerService],
    exports: [NgDateRangePickerComponent],
})
export class NgDateRangePickerModule {}
