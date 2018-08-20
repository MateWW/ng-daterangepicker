import { defaultRangeShortcuts, DefaultRangeTypes } from './DefaultRangeShortcuts';
import { NgDateRange } from './NgDateRange';

export type NgDaterangeShortCut = DefaultRangeTypes | NgDaterangeShortcutEntity;

export interface NgDaterangeShortcutEntity {
    title: string;
    range: (now: Date) => NgDateRange;
    visibleMonth: (state: 'from' | 'to') => Date;
}

export function parseDaterangeShortCutList(list: NgDaterangeShortCut[]): NgDaterangeShortcutEntity[] {
    return list.map(item => (typeof item === 'string' ? defaultRangeShortcuts[item] : item));
}
