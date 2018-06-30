import { isDateWithinLimit } from '../isDateWithinLimit';

describe('[Helpers] isDateWithinLimit', () => {
    const limit = {
        from: new Date(2018, 1, 15),
        to: new Date(2018, 6, 12),
    };

    it('should return true when limit is not specified', () => {
        const date = new Date(2018, 3, 1);
        expect(isDateWithinLimit(date, {})).toBeTruthy();
    });

    it('should return true when month is in range', () => {
        const date = new Date(2018, 3, 1);
        expect(isDateWithinLimit(date, limit)).toBeTruthy();
    });

    it('should return true when date is on edges of limit range', () => {
        const fromEdge = new Date(2018, 1, 15);
        const toEdge = new Date(2018, 6, 12);
        expect(isDateWithinLimit(fromEdge, limit)).toBeTruthy();
        expect(isDateWithinLimit(toEdge, limit)).toBeTruthy();
    });

    it('should return flase when date is out of range ', () => {
        const dateBefore = new Date(2017, 1, 1);
        const dateAfter = new Date(2018, 10, 1);
        expect(isDateWithinLimit(dateBefore, limit)).toBeFalsy();
        expect(isDateWithinLimit(dateAfter, limit)).toBeFalsy();
    });
});
