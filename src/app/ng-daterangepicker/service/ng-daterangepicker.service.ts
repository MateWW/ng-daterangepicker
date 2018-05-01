import { Injectable } from '@angular/core';
import {
    addDays,
    addMonths,
    eachDay,
    getDate,
    getDay,
    isFirstDayOfMonth,
    isLastDayOfMonth,
    isSameDay,
    isToday,
    isWithinRange,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, mergeMap, shareReplay } from 'rxjs/operators';

import { CalendarData } from '../models/CalendarData';
import { IDay } from '../models/IDay';
import { NgDateRange, updateDateRange } from '../models/NgDateRange';
import { getOptions, NgDateRangePickerOptions } from '../models/NgDateRangePickerOptions';

@Injectable()
export class NgDaterangepickerService {
    private options$ = new BehaviorSubject<NgDateRangePickerOptions>(getOptions());
    private selectedRange$ = new BehaviorSubject<NgDateRange>(this.options$.getValue().initialDateRange);
    private currentCalendarMonth$ = new BehaviorSubject<Date>(new Date());
    private calendar$ = this.currentCalendarMonth$.pipe(
        mergeMap(
            () => this.selectedRange$.pipe(distinctUntilChanged()),
            (date, range) => this.generateCalendar(date, range),
        ),
        shareReplay(1),
    );

    public getDateRange(): Observable<NgDateRange> {
        return this.selectedRange$.asObservable();
    }

    public updateDateRange(range: Partial<NgDateRange>): void {
        this.selectedRange$.next(updateDateRange(this.selectedRange$.getValue(), range));
    }

    public setMonth(date: Date): void {
        this.currentCalendarMonth$.next(date);
    }

    public getOptions(): Observable<NgDateRangePickerOptions> {
        return this.options$.asObservable();
    }

    public setOptions(options: NgDateRangePickerOptions): void {
        this.options$.next(getOptions(options));
    }

    public getCalendar(): Observable<CalendarData> {
        return this.calendar$;
    }

    private generateCalendar(month: Date, range: NgDateRange): CalendarData {
        return {
            prevMonth: subMonths(month, 1),
            month,
            nextMonth: addMonths(month, 1),
            days: this.generateCalendarDays(month, range),
        };
    }

    private generateCalendarDays(month: Date, range: NgDateRange): IDay[] {
        const monthStart = startOfMonth(month);
        const start = startOfWeek(monthStart, { weekStartsOn: this.options$.getValue().startOfWeek });
        const end = addDays(start, 6 * 7 - 1);
        const { from, to } = range;
        return eachDay(start, end).map(date => {;
            return {
                date,
                day: getDate(date),
                weekday: getDay(date),
                today: isToday(date),
                firstMonthDay: isFirstDayOfMonth(date),
                lastMonthDay: isLastDayOfMonth(date),
                visible: true,
                from: isSameDay(from, date),
                to: isSameDay(to, date),
                isWithinRange: isWithinRange(date, from, to),
            };
        });
    }
}
