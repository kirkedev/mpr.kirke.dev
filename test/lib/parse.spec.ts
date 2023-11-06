import { describe, expect, test } from "vitest";
import { getDate, optFloat, optInt } from "lib/mpr";
import { formatDate, getDate as parseDate } from "lib/time";

describe("get an optional integer value from a record", () => {
    test("key is present with value", () => {
        const record = { "key": "1,234" };
        expect(optInt(record, "key")).toBe(1234);
    });

    test("key is not present", () => {
        expect(optInt({ }, "key")).toBe(0);
    });
});

describe("get an optional float value from a record", () => {
    test("key is present with value", () => {
        const record = { "key": "1,234.56" };
        expect(optFloat(record, "key")).toBe(1234.56);
    });

    test("key is not present", () => {
        expect(optFloat({ }, "key")).toBeNull();
    });
});

test("parse a date", () => {
    const date = getDate("4/20/2020");
    expect(date).toEqual(new Date(2020, 3, 20));
});

test("format date as ISO", () => {
    const date = formatDate(new Date(2021, 9, 1));
    expect(date).toBe("2021-10-01");
});

test("parse ISO date", () => {
    const date = parseDate("2021-10-01");
    expect(date).toEqual(new Date(2021, 9, 1));
});
