import { getLimitedMonth } from '../getLimitedMonth';

describe('[Helper] getLimitedMonth', () => {
    const limit = {
        from: new Date(2018, 1, 15, 12),
        to: new Date(2018, 6, 12, 12),
    };

    it('should return provided month', () => {
        const date = new Date(2018, 2);
        expect(getLimitedMonth(date, limit)).toEqual(date);
    });

    it('should return provided month on edges of limit range', () => {
        const fromEdge = new Date(2018, 1, 1);
        const toEdge = new Date(2018, 6, 25);

        expect(getLimitedMonth(fromEdge, limit)).toEqual(fromEdge);
        expect(getLimitedMonth(toEdge, limit)).toEqual(toEdge);
    });

    it('should return limited month', () => {
        const dateBefore = new Date(2017, 1, 1);
        const dateAfter = new Date(2018, 10, 1);

        expect(getLimitedMonth(dateAfter, limit)).toEqual(limit.to);
        expect(getLimitedMonth(dateBefore, limit)).toEqual(limit.from);
    });
});
