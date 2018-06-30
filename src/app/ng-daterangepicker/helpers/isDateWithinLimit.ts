import { isWithinRange } from 'date-fns';

import { NgDateRange } from '../models/NgDateRange';

export function isDateWithinLimit(date: Date, limit: Partial<NgDateRange> | null): boolean {
    if (!limit) {
        return true;
    }

    const extendedLimitRange = { from: date, to: date, ...limit };

    return isWithinRange(date, extendedLimitRange.from, extendedLimitRange.to);
}
