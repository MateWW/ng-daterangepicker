export interface NgDateRange {
    from: Date;
    to: Date;
}

export function updateDateRange(range: NgDateRange, { from, to }: Partial<NgDateRange>): NgDateRange {
    return {
        from: from || range.from,
        to: to || range.to,
    };
}

export function createDateRange(from: Date, to: Date): NgDateRange {
    return {
        from,
        to,
    };
}
