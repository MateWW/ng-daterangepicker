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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, scan, tap } from 'rxjs/operators';

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
        <div class="ng-daterangepicker"
             [ngClass]="{
                  'is-active': opened$ | async,
                  'theme-green': options.theme === 'green',
                  'theme-teal': options.theme === 'teal',
                  'theme-cyan': options.theme === 'cyan',
                  'theme-grape': options.theme === 'grape',
                  'theme-red': options.theme === 'red',
                  'theme-gray': options.theme === 'gray'
             }"
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
            ></ng-datepicker-calendar>
        </div>

    `,
    styleUrls: ['./ng-daterangepicker.component.scss'],
    providers: [DATERANGEPICKER_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDateRangePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() public options: NgDateRangePickerOptions;

    public openSubject = new BehaviorSubject<null | 'from' | 'to'>(null);
    public options$ = this.service.getOptions();
    public date$ = this.service.getDateRange();
    public dateFrom$ = this.date$.pipe(map(({ from }) => from));
    public dateTo$ = this.date$.pipe(map(({ to }) => to));
    public opened$ = this.openSubject.pipe(
        tap(value => value && this.onTouchedCallback()),
        scan((acc, value) => (acc === value ? null : value)),
    );
    public calendar$ = this.service.getCalendar();

    /* tslint:disable:no-empty */
    private onTouchedCallback: () => void = () => {};
    private onChangeCallback: (_: any) => void = () => {};
    /* tslint:enable:no-empty */

    constructor(private elementRef: ElementRef, public service: NgDaterangepickerService) {}

    @HostListener('document:click', ['$event'])
    public handleBlurClick(e: MouseEvent): void {
        const target = e.srcElement || e.target;
        if (!this.elementRef.nativeElement.contains(e.target) && !(target as Element).classList.contains('day-num')) {
            this.closeCalendar();
        }
    }

    public writeValue(value: string): void {
        if (!value) {
            return;
        }
    }

    public registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    public ngOnInit(): void {
        this.service.setOptions(this.options);
    }

    public ngOnChanges(): void {
        this.service.setOptions(this.options);
    }

    public toggleCalendar(selection: 'from' | 'to'): void {
        this.openSubject.next(selection);
    }

    public closeCalendar(): void {
        this.openSubject.next(null);
    }

    public changeMonth(date: Date): void {
        this.service.setMonth(date);
    }

    public changeRange(date: Partial<NgDateRange>): void {
        this.toggleCalendar(this.openSubject.getValue() === 'from' ? 'to' : 'from');
        this.service.updateDateRange(date);
    }
}
