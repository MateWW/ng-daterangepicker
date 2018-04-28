import { IDay } from './IDay';

export interface CalendarData {
    prevMonth: Date;
    month: Date;
    nextMonth: Date;
    days: IDay[];
}
