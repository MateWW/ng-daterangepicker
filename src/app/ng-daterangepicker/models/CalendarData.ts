import { Day } from './Day';

export interface CalendarData {
    prevMonth: Date;
    month: Date;
    nextMonth: Date;
    days: Day[];
}
