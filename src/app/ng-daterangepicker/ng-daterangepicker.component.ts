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
import * as dateFns from 'date-fns';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, scan, shareReplay, startWith, tap } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';
import { IDay } from './models/IDay';
import { NgDateRange, updateDateRange } from './models/NgDateRange';
import { getOptions, NgDateRangePickerOptions } from './models/NgDateRangePickerOptions';

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
                (clickInput)="toggleCalendar('from')"
            ></ng-datepicker-input>
            <ng-datepicker-input
                [date]="dateTo$ | async"
                [options]="options$ | async"
                (clickInput)="toggleCalendar('to')"
            ></ng-datepicker-input>
            <ng-datepicker-calendar
                    [options]="options$ | async"
                    [opened]="opened$ | async"
                    (close)="closeCalendar()"
            ></ng-datepicker-calendar>
        </div>

    `,
    styleUrls: ['./ng-daterangepicker.component.scss'],
    providers: [DATERANGEPICKER_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDateRangePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() public options: NgDateRangePickerOptions;

    public optionsSubject = new BehaviorSubject<NgDateRangePickerOptions>(getOptions());
    public dateRangeSubject = new Subject<Partial<NgDateRange>>();
    public openSubject = new BehaviorSubject<null | 'from' | 'to'>(null);
    public options$ = this.optionsSubject.pipe(map(options => getOptions(options)));
    public date$ = this.dateRangeSubject.pipe(
        startWith(getOptions().initialDateRange),
        scan((acc, value) => updateDateRange(acc, value)),
        shareReplay(1),
    );
    public dateFrom$ = this.date$.pipe(map(({ from }) => from));
    public dateTo$ = this.date$.pipe(map(({ to }) => to));
    public opened$ = this.openSubject.pipe(
        tap(value => value && this.onTouchedCallback()),
        scan((acc, value) => (acc === value ? null : value)),
    );

    public modelValue: string;
    public opened: false | 'from' | 'to';
    public date: Date;
    public dateFrom: Date;
    public dateTo: Date;
    public dayNames: string[];
    public days: IDay[];
    public range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';

    /* tslint:disable:no-empty */
    private onTouchedCallback: () => void = () => {};
    private onChangeCallback: (_: any) => void = () => {};
    /* tslint:enable:no-empty */

    constructor(private elementRef: ElementRef) {}

    public writeValue(value: string): void {
        if (!value) {
            return;
        }
        this.modelValue = value;
    }

    public registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    public ngOnInit(): void {
        this.optionsSubject.next(this.options);
        this.opened = false;
        this.date = dateFns.startOfDay(new Date());
        this.options = getOptions(this.options);
        this.initNames();
    }

    public ngOnChanges(): void {
        this.optionsSubject.next(getOptions(this.options));
    }

    public initNames(): void {
        this.dayNames = this.options.dayNames;
    }

    public toggleCalendar(selection: 'from' | 'to'): void {
        this.openSubject.next(selection);
    }

    public closeCalendar(): void {
        this.openSubject.next(null);
    }

    @HostListener('document:click', ['$event'])
    public handleBlurClick(e: MouseEvent): void {
        const target = e.srcElement || e.target;
        if (!this.elementRef.nativeElement.contains(e.target) && !(target as Element).classList.contains('day-num')) {
            this.closeCalendar();
        }
    }
}
