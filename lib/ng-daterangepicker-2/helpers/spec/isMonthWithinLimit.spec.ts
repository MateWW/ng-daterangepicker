import { isMonthWithinLimit } from '../isMonthWithinLimit';

describe('[Helpers] isMonthWithinLimit', () => {
    const limit = {
        from: new Date(2018, 1, 15, 12),
        to: new Date(2018, 6, 12, 12),
    };

    it('should return true when limit is not specified', () => {
        const date = new Date(2018, 3, 1);
        expect(isMonthWithinLimit(date, {})).toBeTruthy();
    });

    it('should return true when month is in range', () => {
        const date = new Date(2018, 3, 1);
        expect(isMonthWithinLimit(date, limit)).toBeTruthy();
    });

    it('should return true when month is on edges of limit range', () => {
        const fromEdge = new Date(2018, 1, 1);
        const toEdge = new Date(2018, 6, 30);
        expect(isMonthWithinLimit(fromEdge, limit)).toBeTruthy();
        expect(isMonthWithinLimit(toEdge, limit)).toBeTruthy();
    });

    it('should return flase when date is out of range ', () => {
        const dateBefore = new Date(2017, 1, 1);
        const dateAfter = new Date(2018, 10, 1);
        expect(isMonthWithinLimit(dateBefore, limit)).toBeFalsy();
        expect(isMonthWithinLimit(dateAfter, limit)).toBeFalsy();
    });
});
