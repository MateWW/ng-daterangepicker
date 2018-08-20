import { isAfter } from 'date-fns';

import { NgDateRange } from '../models/NgDateRange';
import { isMonthWithinLimit } from './isMonthWithinLimit';

export function getLimitedMonth(date: Date, limit: Partial<NgDateRange> | null): Date {
    if (isMonthWithinLimit(date, limit)) {
        return date;
    }

    const limitRange = { from: date, to: date, ...limit };

    return isAfter(date, limitRange.to) ? limitRange.to : limitRange.from;
}
