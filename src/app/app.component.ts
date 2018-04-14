import { Component, OnInit } from '@angular/core';

import { NgDateRangePickerOptions } from './ng-daterangepicker/models/NgDateRangePickerOptions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    public value: string;
    public options: NgDateRangePickerOptions;

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
            dateFormat: 'yMd',
            outputFormat: 'DD/MM/YYYY',
            startOfWeek: 0,
        };
    }
}
