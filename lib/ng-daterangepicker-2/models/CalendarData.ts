import { Day } from './Day';

export interface CalendarData {
    prevMonth: Date | null;
    month: Date;
    nextMonth: Date | null;
    days: Day[];
}

export const initialCalendarData: CalendarData = {
    prevMonth: new Date(),
    month: new Date(),
    nextMonth: new Date(),
    days: [],
};
