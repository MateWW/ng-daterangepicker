import {
    endOfMonth,
    endOfWeek,
    endOfYear,
    startOfMonth,
    startOfWeek,
    startOfYear,
    subMonths,
    subWeeks,
    subYears,
} from 'date-fns';
import { createDateRange } from './NgDateRange';
import { NgDaterangeShortcutEntity } from './RangeShortcut';

export type DefaultRangeTypes = 'thisMonth' | 'lastMonth' | 'lastWeek' | 'thisWeek' | 'thisYear' | 'lastYear';

export const defaultRangeShortcuts: Record<DefaultRangeTypes, NgDaterangeShortcutEntity> = {
    thisMonth: {
        title: 'This Month',
        range: now => createDateRange(startOfMonth(now), endOfMonth(now)),
        visibleMonth: () => new Date(),
    },
    lastMonth: {
        title: 'Last Month',
        range: now => {
            const prevMonth = subMonths(now, 1);
            return createDateRange(startOfMonth(prevMonth), endOfMonth(prevMonth));
        },
        visibleMonth: () => subMonths(new Date(), 1),
    },
    lastWeek: {
        title: 'Last Week',
        range: now => {
            const prevWeek = subWeeks(now, 1);
            return createDateRange(startOfWeek(prevWeek), endOfWeek(prevWeek));
        },
        visibleMonth: state => {
            const prevWeek = subWeeks(new Date(), 1);
            return state === 'from' ? startOfWeek(prevWeek) : endOfWeek(prevWeek);
        },
    },
    thisWeek: {
        title: 'This Week',
        range: now => createDateRange(startOfWeek(now), endOfWeek(now)),
        visibleMonth: state => (state === 'from' ? startOfWeek(new Date()) : endOfWeek(new Date())),
    },
    thisYear: {
        title: 'This Year',
        range: now => createDateRange(startOfYear(now), endOfYear(now)),
        visibleMonth: state => (state === 'from' ? startOfYear(new Date()) : endOfYear(new Date())),
    },
    lastYear: {
        title: 'Last Year',
        range: now => {
            const prevYear = subYears(now, 1);
            return createDateRange(startOfYear(prevYear), endOfYear(prevYear));
        },
        visibleMonth: state => {
            const prevYear = subYears(new Date(), 1);
            return state === 'from' ? startOfYear(prevYear) : endOfYear(prevYear);
        },
    },
};
