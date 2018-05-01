import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NgDateRangePickerOptions } from './ng-daterangepicker/models/NgDateRangePickerOptions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    public value: string;
    public options: Partial<NgDateRangePickerOptions>;
    public control = new FormControl('');

    public ngOnInit(): void {
        this.options = {
            theme: 'default',
            range: 'tm',
            dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            presetNames: [
                'This Month',
                'Last Month',
                'This Week',
                'Last Week',
                'This Year',
                'Last Year',
                'Start',
                'End',
            ],
            dateFormat: 'y-MM-dd',
            outputFormat: 'DD/MM/YYYY',
            startOfWeek: 1,
        };
    }
}
