import { Day } from './Day';

export interface CalendarData {
    prevMonth: Date;
    month: Date;
    nextMonth: Date;
    days: Day[];
}

export const initialCalendarData: CalendarData = {
    prevMonth: new Date(),
    month: new Date(),
    nextMonth: new Date(),
    days: [],
};
