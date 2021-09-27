import dates from "@ams/lib/dates";
import Repository from "@ams/lib/Repository";

describe("Repository caching", () => {
    const fetch = jest.fn((start: Date, end: Date) =>
        Promise.resolve(Array.from(dates(start, end))
            .filter(date => date < new Date())
            .map(date => ({ date }))));

    const repository = new Repository(fetch);

    jest.useFakeTimers().setSystemTime(new Date(2020, 4, 1).getTime());

    beforeEach(fetch.mockClear);

    test("initial query for multiple weeks", async () => {
        const result = await repository.query(new Date(2020, 3, 11), new Date(2020, 3, 26));
        expect(result.length).toBe(16);
        expect(fetch).toHaveBeenCalledTimes(3);
    });

    test("full cache hit query for one week", async () => {
        const result = await repository.query(new Date(2020, 3, 20), new Date(2020, 3, 26));
        expect(fetch).not.toHaveBeenCalled();

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
        expect(result.length).toBe(7);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(new Date(2020, 3, 27), new Date(2020, 4, 3));
    });

    test("fetch missing data", async () => {
        const result = await repository.query(new Date(2020, 3, 24), new Date(2020, 3, 30));
        expect(result.length).toBe(7);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(new Date(2020, 4, 1), new Date(2020, 4, 3));
    });

    test("empty results are not stored in cache", async () => {
        let result = await repository.query(new Date(2020, 4, 6), new Date(2020, 4, 8));
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(new Date(2020, 4, 4), new Date(2020, 4, 10));
        expect(result.length).toBe(0);

        result = await repository.query(new Date(2020, 4, 6), new Date(2020, 4, 8));
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenCalledWith(new Date(2020, 4, 4), new Date(2020, 4, 10));
        expect(result.length).toBe(0);
    });
});
