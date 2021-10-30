import dates from "lib/dates";
import Week from "lib/Week";
import { flatMap, map } from "lib/itertools/map";
import { take, takeUntil, takeWhile } from "lib/itertools/take";
import chunk from "lib/itertools/chunk";
import { drop, dropUntil, dropWhile } from "lib/itertools/drop";
import { elementAt, first, last, slice } from "lib/itertools/slice";
import enumerate from "lib/itertools/enumerate";
import { filter, find } from "lib/itertools/filter";
import { all, count, countIf, each, none, one, some, sumBy } from "lib/itertools/accumulate";
import zip from "lib/itertools/zip";
import groupBy from "lib/itertools/groupBy";
import rolling from "lib/itertools/rolling";

test("chunk a date range by size", () => {
    const start = new Date(2019, 5, 1);
    const range = map(take(dates(start), 10), date => date.getDate());

    const [first, second] = Array.from(chunk(range, 7));
    expect(first).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(second).toEqual([8, 9, 10]);
});

describe("start an infinite sequence at the next month", () => {
    const sequence = dates(new Date(2019, 5, 1));
    let july: Iterable<Date>;

    test("drop dates from the sequence while each date is in the current month", () => {
        july = dropWhile(sequence, date => date.getMonth() === 5);
    });

    test("drop dates from the sequence until a date in the next month", () => {
        july = dropUntil(sequence, date => date.getMonth() === 6);
    });

    test("drop the next 30 dates from the sequence", () => {
        july = drop(sequence, 30);
    });

    afterEach(() => {
        expect(first(july)).toEqual(new Date(2019, 6, 1));
    });
});

test("drop is finished when there are no remaining elements", () => {
    const range = take(dates(new Date(2019, 5, 28)), 7);
    expect(first(drop(range, 10))).toBeUndefined();
});

test("enumerate a date sequence", () => {
    const range = take(dates(new Date(2019, 5, 1)), 3);

    const expected = [
        new Date(2019, 5, 1),
        new Date(2019, 5, 2),
        new Date(2019, 5, 3)
    ];

    for (const [index, date] of enumerate(range)) {
        expect(date).toEqual(expected[index]);
    }
});

test("make every day Friday 😎", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 6, 1);

    const fridays = filter(dates(start, end), date => date.getDay() === 5);
    const range = map(fridays, date => date.getDate());
    expect(Array.from(range)).toEqual([7, 14, 21, 28]);
});

test("find the first Saturday in an infinite date sequence", () => {
    const range = dates(new Date(2019, 5, 2));
    const saturday = find(range, date => date.getDay() === 6);
    expect(saturday.getDate()).toEqual(8);
});

test("return undefined when a date isn't found in a range", () => {
    const range = take(dates(new Date(2019, 5, 2)), 6);
    const saturday = find(range, date => date.getDay() === 6);
    expect(saturday).toBeUndefined();
});

test("lazily map a date range", () => {
    const start = new Date(2019, 5, 8);
    const end = new Date(2019, 5, 15);
    const range = map(dates(start, end), date => date.getDate());
    expect(Array.from(range)).toEqual([8, 9, 10, 11, 12, 13, 14, 15]);
});

test("flat map a nested date range", () => {
    const range = take(dates(new Date(2019, 0, 1)), 10);
    const items = flatMap(chunk(range, 7), date => date.getDate());
    expect(Array.from(items)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("count the number of days in a month", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 5, 30);
    const june = dates(start, end);
    expect(count(june)).toEqual(30);
});

test("count the number of Saturdays in a month", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 6, 1);
    const june = dates(start, end);
    expect(countIf(june, date => date.getDay() === 6)).toEqual(5);
    expect(sumBy(june, date => date.getDay() === 6 ? 1 : 0)).toEqual(5);
});

describe("slice an infinite date sequence by starting and ending offsets", () => {
    const sequence = dates(new Date(2019, 5, 1));

    test("take the first 7 dates", () => {
        const range = slice(sequence, 0, 7);
        const dates = map(range, date => date.getDate());
        expect(Array.from(dates)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test("drop the first 7 dates", () => {
        const dates = slice(sequence, 7);
        expect(first(dates)).toEqual(new Date(2019, 5, 8));
    });

    test("drop the first 7 dates and take the next 7 dates", () => {
        const range = slice(sequence, 7, 14);
        const dates = map(range, date => date.getDate());
        expect(Array.from(dates)).toEqual([8, 9, 10, 11, 12, 13, 14]);
    });
});

test("get the date at a specific position in a sequence", () => {
    const sequence = dates(new Date(2019, 5, 1));
    const date = elementAt(sequence, 5);
    expect(date.getDate()).toBe(6);
});

describe("boolean comparison accumulators", () => {
    const start = new Date(2019, 5, 1);
    const end = new Date(2019, 5, 30);
    const range = dates(start, end);

    test("all", () => {
        expect(all(range, date => date.getMonth() === 5)).toBe(true);
        expect(all(range, date => date.getDay() === 5)).toBe(false);
    });

    test("none", () => {
        expect(none(range, date => date.getMonth() === 6)).toBe(true);
        expect(none(range, date => date.getDay() === 6)).toBe(false);
    });

    test("some", () => {
        expect(some(range, date => date.getDay() === 6)).toBe(true);
        expect(some(range, date => date.getMonth() === 6)).toBe(false);
    });

    test("one", () => {
        expect(one(range, date => date.getDate() === 6)).toBe(true);
        expect(one(range, date => date.getDay() === 6)).toBe(false);
        expect(one(range, date => date.getMonth() === 6)).toBe(false);
    });
});

describe("get remaining days in a month from an infinite sequence", () => {
    const sequence = dates(new Date(2019, 5, 1));
    let june: Iterable<Date>;

    test("take dates from the sequence while each date is in the current month", () => {
        june = takeWhile(sequence, date => date.getMonth() === 5);
    });

    test("take dates from the sequence until a date in the next month", () => {
        june = takeUntil(sequence, date => date.getMonth() === 6);
    });

    test("take the next 30 days of the sequence", () => {
        june = take(sequence, 30);
    });

    afterEach(() => {
        expect(last(june)).toEqual(new Date(2019, 5, 30));
    });
});

test("combine two months into one sequence", () => {
    const start2019 = new Date(2019, 1, 1);
    const feb2019 = dates(start2019, new Date(2019, 1, 28));

    const start2020 = new Date(2020, 1, 1);
    const feb2020 = dates(start2020, new Date(2020, 1, 29));

    const merged = zip(feb2019, feb2020);
    expect(first(merged)).toEqual([start2019, start2020]);
    expect(last(merged)).toEqual([undefined, new Date(2020, 1, 29)]);
});

test("group dates by Week", () => {
    const range = dates(new Date(2020, 3, 1), new Date(2020, 3, 30));

    const groups = Array.from(groupBy(range, (last, current) =>
        Week.with(last).equals(Week.with(current))));

    expect(groups.length).toBe(5);

    expect(groups.map(group => group[0])).toEqual([
        new Date(2020, 3, 1),
        new Date(2020, 3, 6),
        new Date(2020, 3, 13),
        new Date(2020, 3, 20),
        new Date(2020, 3, 27)
    ]);
});

test("group an empty iterable", () => {
    const groups = Array.from(groupBy([], () => true));
    expect(groups.length).toBe(0);
});

test("run a callback against each item in an iterable", () => {
    const callback = jest.fn();
    const range = dates(new Date(2020, 4, 1), new Date(2020, 4, 7));
    each(range, callback);
    expect(callback).toHaveBeenCalledTimes(7);
});

test("create a moving window of an iterable", () => {
    const range = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const windows = Array.from(rolling(range, 3));

    expect(windows).toEqual([
        ["a", "b", "c"],
        ["b", "c", "d"],
        ["c", "d", "e"],
        ["d", "e", "f"],
        ["e", "f", "g"],
        ["f", "g", "h"]
    ]);
});
