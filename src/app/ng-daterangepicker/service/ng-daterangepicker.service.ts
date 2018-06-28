import { Injectable } from '@angular/core';
import {
    addDays,
    addMonths,
    areRangesOverlapping,
    eachDay,
    getDate,
    getDay,
    isAfter,
    isBefore,
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

import { CalendarData } from '../models/CalendarData';
import { Day } from '../models/Day';
import { NgDateRange } from '../models/NgDateRange';
import { InsideOptions, NgDateRangePickerOptions } from '../models/NgDateRangePickerOptions';
import { NgDaterangeShortcutEntity } from '../models/RangeShortcut';
import { DatePickerStore } from './store';

@Injectable()
export class NgDaterangepickerService {
    private store = new DatePickerStore();
    private calendar$ = this.store
        .getMonth()
        .pipe(
            mergeMap(month => this.store.getRange().pipe(map(range => this.generateCalendar(month, range)))),
            shareReplay(1),
        );

    public getDateRange(): Observable<NgDateRange> {
        return this.store.getRange();
    }

    public getOptions(): Observable<InsideOptions> {
        return this.store.getOptions();
    }

    public getCalendar(): Observable<CalendarData> {
        return this.calendar$;
    }

    public getCalendarStatus(): Observable<null | 'from' | 'to'> {
        return this.store.getCalendarStatus();
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
        const range = shortcut.range(new Date());
        const limitRange = this.store.getOptionsValue().limitRange;
        if (!limitRange) {
            return this.updateShortcutRange(shortcut, range);
        } else if (!areRangesOverlapping(range.from, range.to, limitRange.from, limitRange.to)) {
            const now = new Date();
            return this.updateShortcutRange(shortcut, { from: now, to: now });
        }

        const limitedRange = {
            from: this.isAfterStartOfLimit(range.from, limitRange) ? range.from : limitRange.from,
            to: this.isBeforeEndOfLimit(range.to, limitRange) ? range.to : limitRange.to,
        };

        return this.updateShortcutRange(shortcut, limitedRange);
    }

    private updateShortcutRange(shortcut: NgDaterangeShortcutEntity, range: NgDateRange): void {
        const status = this.store.getCalendarStatusValue();
        if (status) {
            this.setMonth(shortcut.visibleMonth(status));
        }

        this.store.updateRange(range);
    }

    private generateCalendar(month: Date, range: NgDateRange): CalendarData {
        const prevMonth = subMonths(month, 1);
        const nextMonth = addMonths(month, 1);
        return {
            prevMonth: this.isDateWithinLimit(prevMonth, true) ? prevMonth : null,
            nextMonth: this.isDateWithinLimit(nextMonth, true) ? nextMonth : null,
            month,
            days: this.generateCalendarDays(month, range),
        };
    }

    private generateCalendarDays(month: Date, range: NgDateRange): Day[] {
        const monthStart = startOfMonth(month);
        const start = startOfWeek(monthStart, { weekStartsOn: this.store.getOptionsValue().startOfWeek });
        const end = addDays(start, 6 * 7 - 1);
        const { from, to } = range;
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
                outOfLimitRange: !this.isDateWithinLimit(date),
            };
        });
    }

    private isDateWithinLimit(date: Date, month: boolean = false): boolean {
        const limitRange = this.store.getOptionsValue().limitRange;
        if (!limitRange) {
            return true;
        }

        const isTheSameMonth = month && (isSameMonth(date, limitRange.from) || isSameMonth(date, limitRange.to));

        const isAfterDate = isTheSameMonth || this.isAfterStartOfLimit(date, limitRange);
        const isBeforeDate = isTheSameMonth || this.isBeforeEndOfLimit(date, limitRange);
        return isAfterDate && isBeforeDate;
    }

    private isAfterStartOfLimit(date: Date, limitRange: NgDateRange | null): boolean {
        if (!limitRange) {
            return true;
        }

        return !limitRange.from || isAfter(date, limitRange.from);
    }

    private isBeforeEndOfLimit(date: Date, limitRange: NgDateRange | null): boolean {
        if (!limitRange) {
            return true;
        }

        return !limitRange.to || isBefore(date, limitRange.to);
    }
}
