import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NgDateRangePickerOptions } from './ng-daterangepicker/models/NgDateRangePickerOptions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    public value: string = '';
    public options: Partial<NgDateRangePickerOptions> = {
        dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        alignment: 'right',
        startOfWeek: 1,
    };
    public control = new FormControl('');
}
