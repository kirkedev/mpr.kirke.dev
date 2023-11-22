import { describe, test, expect } from "vitest";
import MprClient from "lib/mpr/MprClient";
import { getDate, optFloat, optInt } from "lib/mpr";
import { formatDate, getDate as parseDate } from "lib/time";

describe("Parsing helpers", () => {

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
});

describe("MPR Report", () => {
    test("filter a report by report date", () => {
        const report = new MprClient("https://mpr.datamart.ams.usda.gov", "v1.1")
            .report(2511)
            .filter("report_date", "03/09/2020");

        expect(report.url).toBe("https://mpr.datamart.ams.usda.gov/services/v1.1/reports/2511?q=report_date=03/09/2020&allSections=true");
    });

    test("filter a report by date range", () => {
        const report = new MprClient("https://mpr.datamart.ams.usda.gov", "v1.1")
            .report(2511)
            .between("report_date", "03/09/2020", "03/13/2020");

        expect(report.url).toBe("https://mpr.datamart.ams.usda.gov/services/v1.1/reports/2511?q=report_date=03/09/2020:03/13/2020&allSections=true");
    });

    test("sort report by date", () => {
        const report = new MprClient("https://mpr.datamart.ams.usda.gov", "v1.1")
            .report(2511)
            .between("report_date", "03/09/2020", "03/13/2020")
            .sort("for_date_begin");

        expect(report.url).toBe("https://mpr.datamart.ams.usda.gov/services/v1.1/reports/2511?q=report_date=03/09/2020:03/13/2020&sort=for_date_begin&allSections=true");
    });

    test("get an individual report section", () => {
        const report = new MprClient("https://mpr.datamart.ams.usda.gov", "v1.1")
            .report(2511)
            .section("Barrows/Gilts");

        expect(report.url).toBe("https://mpr.datamart.ams.usda.gov/services/v1.1/reports/2511/Barrows/Gilts");
    });
});
