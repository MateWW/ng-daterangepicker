import { createDateRange, NgDateRange, updateDateRange } from './NgDateRange';
import { NgDaterangeShortCut, NgDaterangeShortcutEntity, parseDaterangeShortCutList } from './RangeShortcut';

export interface NgDateRangePickerOptions {
    initialDateRange: NgDateRange;
    inputFormat: (input: any) => NgDateRange;
    outputFormat: (dateRange: NgDateRange) => any;
    startOfWeek: number;
    dayNames: string[];
    inputNames: {
        from: string;
        to: string;
    };
    visibleDateFormat: string | ((date: Date) => string);
    alignment: 'left' | 'center' | 'right';
    shortCuts: NgDaterangeShortCut[];
}

export interface InsideOptions extends NgDateRangePickerOptions {
    shortCuts: NgDaterangeShortcutEntity[];
}

export const defaultOptions: NgDateRangePickerOptions = {
    initialDateRange: createDateRange(new Date(), new Date()),
    inputFormat: input => updateDateRange(createDateRange(), input),
    outputFormat: dateRange => dateRange,
    startOfWeek: 0,
    dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    inputNames: {
        from: 'Start',
        to: 'End',
    },
    visibleDateFormat: 'DD-MM-YYYY',
    alignment: 'left',
    shortCuts: ['thisMonth', 'lastMonth', 'lastWeek', 'thisWeek', 'thisYear', 'lastYear'],
};

export function getOptions(partial: Partial<NgDateRangePickerOptions> = {}): InsideOptions {
    return {
        ...defaultOptions,
        ...partial,
        shortCuts: parseDaterangeShortCutList(partial.shortCuts || defaultOptions.shortCuts),
        inputNames: {
            ...defaultOptions.inputNames,
            ...(partial.inputNames || {}),
        },
    };
}
