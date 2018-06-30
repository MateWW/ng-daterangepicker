import { isSameMonth, isWithinRange } from 'date-fns';

import { NgDateRange } from '../models/NgDateRange';

export function isMonthWithinLimit(date: Date, limit: Partial<NgDateRange> | null): Date | null {
    if (!limit) {
        return date;
    }

    const extendedLimit = { from: date, to: date, ...limit };

    const sameMonth = isSameMonth(date, extendedLimit.from) || isSameMonth(date, extendedLimit.to);
    const inRange = isWithinRange(date, extendedLimit.from, extendedLimit.to);
    return sameMonth || inRange ? date : null;
}
