import { Injectable } from '@angular/core';
import {
    addDays,
    addMonths,
    eachDay,
    getDate,
    getDay,
    isSameDay,
    isSameMonth,
    isToday,
    isWithinRange,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { Observable } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';

import { cutRangeInsideOfLimit } from '../helpers/cutRangeInsideOfLimit';
import { getLimitedMonth } from '../helpers/getLimitedMonth';
import { isDateWithinLimit } from '../helpers/isDateWithinLimit';
import { isMonthWithinLimit } from '../helpers/isMonthWithinLimit';

import { CalendarData } from '../models/CalendarData';
import { Day } from '../models/Day';
import { fixDateRange, NgDateRange } from '../models/NgDateRange';
import { NgDateRangePickerOptions } from '../models/NgDateRangePickerOptions';
import { NgDaterangeShortcutEntity } from '../models/RangeShortcut';
import { DatePickerStore, StoreState } from './store';

@Injectable()
export class NgDaterangepickerService {
    private store = new DatePickerStore();
    private calendar$ = this.store
        .getMonth()
        .pipe(
            mergeMap(month => this.store.getRange().pipe(map(range => this.generateCalendar(month, range)))),
            shareReplay(1),
        );

    public getStore(): StoreState {
        return this.store.getStore();
    }

    public getCalendar(): Observable<CalendarData> {
        return this.calendar$;
    }

    public initValue(value: any): void {
        const range = this.store.getOptionsValue().inputFormat(value);
        this.store.updateRange(range);
    }

    public updateDateRange(range: Partial<NgDateRange>): void {
        this.store.updateRange(range);
    }

    public setMonth(date: Date): void {
        this.store.setMonth(date);
    }

    public setOptions(options: NgDateRangePickerOptions): void {
        this.store.setOptions(options);
    }

    public setOnTouched(callback: () => void): void {
        this.store.setTouchedCallback(callback);
    }

    public setOnChange(callback: (_: any) => void): void {
        this.store.setChangeCallback(callback);
    }

    public closeCalendar(): void {
        this.store.setCalendarStatus(null);
    }

    public toggleCalendar(selection: 'from' | 'to' | null = null, changeMonth: boolean = false): void {
        const currentStatus = this.store.getCalendarStatusValue();
        const currentRange = this.store.getRangeValue();
        if (currentStatus === selection) {
            return this.closeCalendar();
        }

        const newStatus = selection || (currentStatus === 'from' ? 'to' : 'from');

        if (changeMonth) {
            this.setMonth(currentRange[newStatus]);
        }
        return this.store.setCalendarStatus(newStatus);
    }

    public applyShortcut(shortcut: NgDaterangeShortcutEntity): void {
        const range = fixDateRange(shortcut.range(new Date()));
        const limitRange = this.store.getOptionsValue().limitRange;
        const now = new Date();
        const limitedRange = cutRangeInsideOfLimit(range, limitRange) || { from: now, to: now };
        this.updateShortcutRange(shortcut, limitedRange);
    }

    private updateShortcutRange(shortcut: NgDaterangeShortcutEntity, range: NgDateRange): void {
        const status = this.store.getCalendarStatusValue();
        if (status) {
            const limitRange = this.store.getOptionsValue().limitRange;
            this.setMonth(getLimitedMonth(shortcut.visibleMonth(status), limitRange));
        }

        this.store.updateRange(range);
    }

    private generateCalendar(month: Date, range: NgDateRange): CalendarData {
        const prevMonth = subMonths(month, 1);
        const nextMonth = addMonths(month, 1);
        const limit = this.store.getOptionsValue().limitRange;
        return {
            prevMonth: isMonthWithinLimit(prevMonth, limit),
            nextMonth: isMonthWithinLimit(nextMonth, limit),
            month,
            days: this.generateCalendarDays(month, range),
        };
    }

    private generateCalendarDays(month: Date, range: NgDateRange): Day[] {
        const monthStart = startOfMonth(month);
        const start = startOfWeek(monthStart, { weekStartsOn: this.store.getOptionsValue().startOfWeek });
        const end = addDays(start, 6 * 7 - 1);
        const { from, to } = range;
        const limit = this.store.getOptionsValue().limitRange;
        return eachDay(start, end).map(date => {
            return {
                date,
                day: getDate(date),
                weekday: getDay(date),
                today: isToday(date),
                from: isSameDay(from, date),
                to: isSameDay(to, date),
                isWithinRange: isWithinRange(date, from, to),
                currentMonth: isSameMonth(date, month),
                outOfLimitRange: !isDateWithinLimit(date, limit),
            };
        });
    }
}
