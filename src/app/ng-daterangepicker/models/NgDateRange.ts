import { endOfDay, startOfDay } from 'date-fns';

export interface NgDateRange {
    from: Date;
    to: Date;
}

export function updateDateRange(range: NgDateRange, { from, to }: Partial<NgDateRange>): NgDateRange {
    const currentFrom = from || range.from;
    const currentTo = to || range.to;
    return {
        from: startOfDay(currentFrom.getTime() > currentTo.getTime() ? currentTo : currentFrom),
        to: endOfDay(currentTo.getTime() < currentFrom.getTime() ? currentFrom : currentTo),
    };
}

export function createDateRange(from: Date = new Date(), to: Date = new Date()): NgDateRange {
    return {
        from,
        to,
    };
}
