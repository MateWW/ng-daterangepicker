import { cutRangeInsideOfLimit } from '../cutRangeInsideOfLimit';

describe('[Helper] cutRangeInsideOfLimit', () => {
    const limit = {
        from: new Date(2018, 3, 1),
        to: new Date(2018, 3, 30),
    };
    const range = {
        from: new Date(2018, 1, 1),
        to: new Date(2018, 6, 1),
    };

    describe('Range is around limit', () => {
        it('should return range limit range', () => {
            expect(cutRangeInsideOfLimit(range, limit)).toEqual(limit);
        });

        it('should return range with only from specified', () => {
            const partialLimit = {
                from: limit.from,
            };

            const expected = {
                from: limit.from,
                to: range.to,
            };
            expect(cutRangeInsideOfLimit(range, partialLimit)).toEqual(expected);
        });

        it('should return range with only to specified', () => {
            const partialLimit = {
                to: limit.to,
            };

            const expected = {
                from: range.from,
                to: limit.to,
            };
            expect(cutRangeInsideOfLimit(range, partialLimit)).toEqual(expected);
        });

        it('should return full range with no limit specified', () => {
            expect(cutRangeInsideOfLimit(range, {})).toEqual(range);
        });
    });

    it('should return range when is within limit', () => {
        const withinLimitRange = {
            from: new Date(2018, 3, 5),
            to: new Date(2018, 3, 25),
        };

        expect(cutRangeInsideOfLimit(withinLimitRange, limit)).toEqual(withinLimitRange);
    });

    it('should return range when is the same with limit', () => {
        expect(cutRangeInsideOfLimit(limit, limit)).toEqual(limit);
    });

    it('should return range when only from is in limit', () => {
        const withinLimit = {
            from: new Date(2018, 3, 5),
            to: new Date(2018, 6, 25),
        };
        const expected = {
            from: new Date(2018, 3, 5),
            to: limit.to,
        };

        expect(cutRangeInsideOfLimit(withinLimit, limit)).toEqual(expected);
    });

    it('should return range when only to is in limit', () => {
        const withinLimit = {
            from: new Date(2018, 1, 5),
            to: new Date(2018, 3, 25),
        };
        const expected = {
            from: limit.from,
            to: new Date(2018, 3, 25),
        };

        expect(cutRangeInsideOfLimit(withinLimit, limit)).toEqual(expected);
    });

    it('should return range when is partial on edge of limit', () => {
        const withinLimit = {
            from: limit.from,
            to: new Date(2018, 3, 25),
        };
        const expected = {
            from: limit.from,
            to: new Date(2018, 3, 25),
        };

        expect(cutRangeInsideOfLimit(withinLimit, limit)).toEqual(expected);
    });
});
