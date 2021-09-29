import { optFloat, optInt } from "@ams/lib/api";

describe("get an optional integer value from a record", () => {
    test("key is present with value", () => {
        const record = { "key": "1" };
        expect(optInt(record, "key")).toBe(1);
    });

    test("key is not present", () => {
        const record = { };
        expect(optInt(record, "key")).toBe(0);
    });

    test("key is present and null string", () => {
        const record = { "key": "null" };
        expect(optInt(record, "key")).toBe(0);
    });
});

describe("get an optional float value from a record", () => {
    test("key is present with value", () => {
        const record = { "key": "1.00" };
        expect(optFloat(record, "key")).toBe(1.00);
    });

    test("key is not present", () => {
        const record = { };
        expect(optFloat(record, "key")).toBeNaN();
    });

    test("key is present and null string", () => {
        const record = { "key": "null" };
        expect(optFloat(record, "key")).toBeNaN();
    });
});
