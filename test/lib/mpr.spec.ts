import MprClient from "@ams/lib/mpr/MprClient";

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
