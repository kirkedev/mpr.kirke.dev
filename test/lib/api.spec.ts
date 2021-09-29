import { optFloat, optInt } from "@ams/lib/api";

describe("get an optional integer value from a record", () => {
    test("key is present with value", () => {
        const record = { "key": "1,234" };
        expect(optInt(record, "key")).toBe(1234);
    });

    test("key is not present", () => {
        const record = { };
        expect(optInt(record, "key")).toBe(0);
    });
});

describe("get an optional float value from a record", () => {
    test("key is present with value", () => {
        const record = { "key": "1,234.56" };
        expect(optFloat(record, "key")).toBe(1234.56);
    });

    test("key is not present", () => {
        const record = { };
        expect(optFloat(record, "key")).toBeNaN();
    });
});
