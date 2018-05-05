export interface Day {
    date: Date;
    day: number;
    weekday: number;
    today: boolean;
    from: boolean;
    to: boolean;
    isWithinRange: boolean;
    currentMonth: boolean;
}
