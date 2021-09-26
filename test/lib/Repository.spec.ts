import dates from "@ams/lib/dates";
import Repository from "@ams/lib/Repository";

const fetch = (start: Date, end: Date) =>
    Promise.resolve(Array.from(dates(start, end)).map(date => ({ date })));

describe("Repository caching", () => {
    const spy = jest.fn(fetch);
    const repository = new Repository(spy);

    beforeEach(() => spy.mockClear());

    test("initial query for multiple weeks", async () => {
        const result = await repository.query(new Date(2020, 3, 11), new Date(2020, 3, 26));
        expect(spy).toHaveBeenCalledTimes(3);
        expect(result.length).toBe(16);
    });

    test("full cache hit query for one week", async () => {
        const result = await repository.query(new Date(2020, 3, 20), new Date(2020, 3, 26));
        expect(spy).not.toHaveBeenCalled();

        expect(result.map(record => record.date)).toEqual([
            new Date(2020, 3, 20),
            new Date(2020, 3, 21),
            new Date(2020, 3, 22),
            new Date(2020, 3, 23),
            new Date(2020, 3, 24),
            new Date(2020, 3, 25),
            new Date(2020, 3, 26),
        ]);
    });

    test("partial cache hit query for multiple weeks", async () => {
        const result = await repository.query(new Date(2020, 3, 24), new Date(2020, 3, 30));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result.length).toBe(7);
    });
});
