import { vi, describe, test, expect, beforeAll, afterAll, beforeEach } from "vitest";
import dates from "lib/dates";
import Repository from "lib/Repository";

describe("Repository caching", () => {
    const fetch = vi.fn((start: Date, end: Date) =>
        Promise.resolve(Array.from(dates(start, end))
            .filter(date => date < new Date())
            .map(date => ({ date, reportDate: date }))));

    const repository = new Repository(fetch);

    beforeAll(function() {
        vi.useFakeTimers().setSystemTime(new Date(2020, 4, 1).getTime());
    });

    afterAll(function() {
        vi.useRealTimers();
    });

    beforeEach(function() {
        fetch.mockClear();
    });

    test("initial query for multiple weeks", async () => {
        const result = await repository.query(new Date(2020, 3, 11), new Date(2020, 3, 26));
        expect(result.length).toBe(16);
        expect(fetch).toHaveBeenCalledTimes(1);
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
            new Date(2020, 3, 26)
        ]);
    });

    test("partial cache hit query for multiple weeks", async () => {
        const result = await repository.query(new Date(2020, 3, 24), new Date(2020, 3, 30));
        expect(result.length).toBe(7);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(new Date(2020, 3, 27), new Date(2020, 4, 1));
    });

    test("fetch missing data", async () => {
        const result = await repository.query(new Date(2020, 3, 24), new Date(2020, 4, 1));
        expect(fetch).toHaveBeenCalledWith(new Date(2020, 4, 1), new Date(2020, 4, 1));
        expect(result.length).toBe(7);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("don't request data from the future", async () => {
        const result = await repository.query(new Date(2020, 4, 6), new Date(2020, 4, 8));
        expect(result.length).toBe(0);
        expect(fetch).not.toHaveBeenCalled();
    });
});

test("don't cache empty results", async () => {
    const fetch = vi.fn(() => Promise.resolve([]));
    const repository = new Repository(fetch);

    let result = await repository.query(new Date(2020, 4, 6), new Date(2020, 4, 8));
    expect(result.length).toBe(0);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenLastCalledWith(new Date(2020, 4, 4), new Date(2020, 4, 10));

    result = await repository.query(new Date(2020, 4, 6), new Date(2020, 4, 8));
    expect(result.length).toBe(0);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith(new Date(2020, 4, 4), new Date(2020, 4, 10));
});
