import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgDateRangePickerOptions } from '../../public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public inputDateRange = this.fb.group({
        from: ['', [Validators.required]],
        to: ['', [Validators.required]],
    });

    public options: Partial<NgDateRangePickerOptions> = {
        dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        alignment: 'right',
        limitRange: {
            from: new Date(2018, 1, 10),
            to: new Date(),
        },
        startOfWeek: 0,
    };
    public theme: string = '';
    public control = new FormControl({
        from: new Date(),
        to: new Date(2018, 1, 6),
    });

    constructor(private fb: FormBuilder) {}

    public submit(): void {
        if (this.inputDateRange.valid) {
            try {
                const { from, to } = this.inputDateRange.value;
                this.control.setValue({
                    from: new Date(from),
                    to: new Date(to),
                });
            } catch (e) {
                alert('You type invalid date');
            }
        }
    }
}
