export interface NgDateRange {
    from: Date;
    to: Date;
}

export function updateDateRange(range: NgDateRange, { from, to }: Partial<NgDateRange>): NgDateRange {
    const currentFrom = from || range.from;
    const currentTo = to || range.to;
    return {
        from: currentFrom.getTime() > currentTo.getTime() ? currentTo : currentFrom,
        to: currentTo.getTime() < currentFrom.getTime() ? currentFrom : currentTo,
    };
}

export function createDateRange(from: Date, to: Date): NgDateRange {
    return {
        from,
        to,
    };
}
