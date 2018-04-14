export interface IDay {
    date: Date;
    day: number;
    weekday: number;
    today: boolean;
    firstMonthDay: boolean;
    lastMonthDay: boolean;
    visible: boolean;
    from: boolean;
    to: boolean;
    isWithinRange: boolean;
}
