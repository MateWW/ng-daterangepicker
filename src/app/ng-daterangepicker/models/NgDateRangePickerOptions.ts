import { createDateRange, NgDateRange, updateDateRange } from './NgDateRange';

export interface NgDateRangePickerOptions {
    theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
    range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';
    dayNames: string[];
    presetNames: string[];
    inputNames: {
        from: string;
        to: string;
    };
    alignment: 'left' | 'center' | 'right';
    visibleDateFormat: string | ((date: Date) => string);
    inputFormat: (input: any) => NgDateRange;
    outputFormat: (dateRange: NgDateRange) => any;
    startOfWeek: number;
    initialDateRange: NgDateRange;
}

export const defaultOptions: NgDateRangePickerOptions = {
    theme: 'default',
    range: 'tm',
    dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year'],
    inputNames: {
        from: 'Start',
        to: 'End',
    },
    alignment: 'left',
    startOfWeek: 0,
    initialDateRange: createDateRange(new Date(), new Date()),
    visibleDateFormat: 'DD-MM-YYYY',
    inputFormat: input => updateDateRange(createDateRange(), input),
    outputFormat: dateRange => dateRange,
};

export function getOptions(partial: Partial<NgDateRangePickerOptions> = {}): NgDateRangePickerOptions {
    return {
        ...defaultOptions,
        ...partial,
        inputNames: {
            ...defaultOptions.inputNames,
            ...(partial.inputNames ? partial.inputNames : {}),
        },
    };
}
