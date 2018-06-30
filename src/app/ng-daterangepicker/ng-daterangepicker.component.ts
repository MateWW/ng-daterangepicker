import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map } from 'rxjs/operators';

import { NgDateRange } from './models/NgDateRange';
import { NgDateRangePickerOptions } from './models/NgDateRangePickerOptions';
import { NgDaterangepickerService } from './service/ng-daterangepicker.service';

export let DATERANGEPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgDateRangePickerComponent),
    multi: true,
};

@Component({
    selector: 'ng-daterangepicker',
    template: `
        <div
            class="ng-daterangepicker"
            [class.is-active]="opened$ | async"
        >
            <ng-datepicker-input
                [date]="dateFrom$ | async"
                [options]="options$ | async"
                [titleKey]="'from'"
                (clickInput)="toggleCalendar('from')"
            ></ng-datepicker-input>
            <ng-datepicker-input
                [date]="dateTo$ | async"
                [options]="options$ | async"
                [titleKey]="'to'"
                (clickInput)="toggleCalendar('to')"
            ></ng-datepicker-input>
            <ng-datepicker-calendar
                    [options]="options$ | async"
                    [opened]="opened$ | async"
                    [calendar]="calendar$ | async"
                    (close)="closeCalendar()"
                    (changeMonth)="changeMonth($event)"
                    (changeRange)="changeRange($event)"
                    (applyShortcut)="service.applyShortcut($event)"
            ></ng-datepicker-calendar>
        </div>

    `,
    styleUrls: ['./ng-daterangepicker.component.scss'],
    providers: [DATERANGEPICKER_VALUE_ACCESSOR, NgDaterangepickerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDateRangePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() public options!: NgDateRangePickerOptions;
    public store = this.service.getStore();
    public options$ = this.store.options;
    public dateRange$ = this.store.range;
    public dateFrom$ = this.dateRange$.pipe(map(({ from }) => from));
    public dateTo$ = this.dateRange$.pipe(map(({ to }) => to));
    public opened$ = this.store.status;
    public calendar$ = this.service.getCalendar();

    constructor(private elementRef: ElementRef, public service: NgDaterangepickerService) {}

    @HostListener('document:click', ['$event'])
    public handleBlurClick(e: MouseEvent): void {
        const target = e.srcElement || e.target;
        if (!this.elementRef.nativeElement.contains(e.target) && !(target as Element).classList.contains('day-num')) {
            this.closeCalendar();
        }
    }

    public writeValue(value: any): void {
        if (!value) {
            return;
        }

        this.service.initValue(value);
    }

    public registerOnChange(fn: any): void {
        this.service.setOnChange(fn);
    }

    public registerOnTouched(fn: any): void {
        this.service.setOnTouched(fn);
    }

    public ngOnInit(): void {
        this.service.setOptions(this.options);
    }

    public ngOnChanges(): void {
        this.service.setOptions(this.options);
    }

    public toggleCalendar(selection: 'from' | 'to'): void {
        this.service.toggleCalendar(selection, true);
    }

    public closeCalendar(): void {
        this.service.closeCalendar();
    }

    public changeMonth(date: Date): void {
        this.service.setMonth(date);
    }

    public changeRange(date: Partial<NgDateRange>, toggleCalendar: boolean = true): void {
        if (toggleCalendar) {
            this.service.toggleCalendar();
        }
        this.service.updateDateRange(date);
    }
}
