export interface NgDateRangePickerOptions {
    theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
    range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';
    dayNames: string[];
    presetNames: string[];
    dateFormat: string;
    outputFormat: string;
    startOfWeek: number;
}

const defaultOptions: NgDateRangePickerOptions = {
    theme: 'default',
    range: 'tm',
    dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
    dateFormat: 'yMd',
    outputFormat: 'DD/MM/YYYY',
    startOfWeek: 0,
};

export function getOptions(partial: Partial<NgDateRangePickerOptions>): NgDateRangePickerOptions {
    return {
        ...defaultOptions,
        ...partial,
    };
}
