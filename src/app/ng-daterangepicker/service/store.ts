import { BehaviorSubject, Observable } from 'rxjs/index';
import { distinctUntilChanged } from 'rxjs/operators';

import { NgDateRange, updateDateRange } from '../models/NgDateRange';
import { getOptions, InsideOptions, NgDateRangePickerOptions } from '../models/NgDateRangePickerOptions';

export interface StoreState {
    status: Observable<null | 'from' | 'to'>;
    options: Observable<InsideOptions>;
    range: Observable<NgDateRange>;
    currentCalendarMonth: Observable<Date>;
}

export class DatePickerStore {
    private opened$ = new BehaviorSubject<null | 'from' | 'to'>(null);
    private options$ = new BehaviorSubject<InsideOptions>(getOptions());
    private selectedRange$ = new BehaviorSubject<NgDateRange>(this.options$.getValue().initialDateRange);
    private currentCalendarMonth$ = new BehaviorSubject<Date>(new Date());
    /* tslint:disable:no-empty */
    private onTouchedCallback: () => void = () => {};
    private onChangeCallback: (_: any) => void = () => {};
    /* tslint:enable:no-empty */

    constructor(options: NgDateRangePickerOptions | null = null) {
        if (options) {
            this.setOptions(options);
        }
    }

    public getStore(): StoreState {
        return {
            status: this.getCalendarStatus(),
            options: this.getOptions(),
            range: this.getRange(),
            currentCalendarMonth: this.getMonth(),
        };
    }

    public setOptions(options: NgDateRangePickerOptions): void {
        this.options$.next(getOptions(options));
    }

    public getOptions(): Observable<InsideOptions> {
        return this.getPipedObservable(this.options$);
    }

    public getOptionsValue(): InsideOptions {
        return this.options$.getValue();
    }

    public updateRange(range: Partial<NgDateRange>): void {
        const updatedRange = updateDateRange(this.selectedRange$.getValue(), range);
        this.selectedRange$.next(updatedRange);
        this.onTouchedCallback();
        this.onChangeCallback(updatedRange);
    }

    public getRange(): Observable<NgDateRange> {
        return this.getPipedObservable(this.selectedRange$);
    }

    public getRangeValue(): NgDateRange {
        return this.selectedRange$.getValue();
    }

    public setMonth(month: Date): void {
        this.currentCalendarMonth$.next(month);
    }

    public getMonth(): Observable<Date> {
        return this.getPipedObservable(this.currentCalendarMonth$);
    }

    public setCalendarStatus(status: null | 'from' | 'to'): void {
        this.opened$.next(status);
    }

    public getCalendarStatus(): Observable<null | 'from' | 'to'> {
        return this.getPipedObservable(this.opened$);
    }

    public getCalendarStatusValue(): null | 'from' | 'to' {
        return this.opened$.getValue();
    }

    public setTouchedCallback(callback: () => void): void {
        this.onTouchedCallback = callback;
    }

    public getTouchedCallback(): () => void {
        return this.onTouchedCallback;
    }

    public setChangeCallback(callback: (_: any) => void): void {
        this.onChangeCallback = callback;
    }

    public getChangeCallback(): (_: any) => void {
        return this.onChangeCallback;
    }

    private getPipedObservable<T>(observable: Observable<T>): Observable<T> {
        return observable.pipe(distinctUntilChanged());
    }
}
