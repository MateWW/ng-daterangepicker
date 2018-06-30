import { areRangesOverlapping, isAfter, isBefore } from 'date-fns';
import { NgDateRange } from '../models/NgDateRange';

export function cutRangeInsideOfLimit(
    range: NgDateRange,
    limitationRange: Partial<NgDateRange> | null,
): NgDateRange | null {
    if (!limitationRange) {
        return range;
    } else if (!checkRangesOverlapping(range, limitationRange)) {
        return null;
    }

    const extendedLimitationRange = { ...range, ...limitationRange };
    return {
        from: isBefore(range.from, extendedLimitationRange.from) ? extendedLimitationRange.from : range.from,
        to: isAfter(range.to, extendedLimitationRange.to) ? extendedLimitationRange.to : range.to,
    };
}

function checkRangesOverlapping(range: NgDateRange, limitationRange: Partial<NgDateRange> | null): boolean {
    const extendedLimitationRange = { ...range, ...limitationRange };
    return areRangesOverlapping(range.from, range.to, extendedLimitationRange.from, extendedLimitationRange.to);
}
