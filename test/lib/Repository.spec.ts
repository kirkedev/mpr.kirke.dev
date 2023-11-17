import { beforeEach, describe, expect, test, vi } from "vitest";
import { today } from "lib/time";
import dates from "lib/time/dates";
import Repository from "lib/Repository";
import type { MprObservation } from "lib/time/Series";

describe("Repository caching", () => {
    const fetch = vi.fn((start: Date, end: Date): Promise<MprObservation[]> =>
        Promise.resolve(Array.from(dates(start, end))
            .filter(date => date < today())
            .map(date => ({ date, reportDate: date }))));

    const repository = new Repository(fetch);

    beforeEach(function() {
        fetch.mockClear();
    });

    test("initial query for multiple weeks", async () => {
        const result = await repository.query(new Date(2021, 11, 1), new Date(2021, 11, 16));
        expect(result.length).toBe(16);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("full cache hit query for one week", async () => {
        const result = await repository.query(new Date(2021, 11, 6), new Date(2021, 11, 12));
        expect(fetch).not.toHaveBeenCalled();

        expect(result.map(record => record.date)).toEqual([
            new Date(2021, 11, 6),
            new Date(2021, 11, 7),
            new Date(2021, 11, 8),
            new Date(2021, 11, 9),
            new Date(2021, 11, 10),
            new Date(2021, 11, 11),
            new Date(2021, 11, 12)
        ]);
    });

    test("partial cache hit query for multiple weeks", async () => {
        const result = await repository.query(new Date(2021, 11, 14), new Date(2021, 11, 20));
        expect(result.length).toBe(7);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(new Date(2021, 11, 20), new Date(2021, 11, 23));
    });

    test("fetch missing data", async () => {
        const result = await repository.query(new Date(2021, 11, 16), new Date(2021, 11, 23));
        expect(fetch).toHaveBeenCalledWith(new Date(2021, 11, 23), new Date(2021, 11, 23));
        expect(result.length).toBe(7);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("don't request data from the future", async () => {
        const result = await repository.query(new Date(2022, 1, 1), new Date(2021, 1, 8));
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
