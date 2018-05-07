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
        theme: 'default',
        range: 'tm',
        dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
        alignment: 'right',
        startOfWeek: 1,
    };
    public control = new FormControl('');
}
