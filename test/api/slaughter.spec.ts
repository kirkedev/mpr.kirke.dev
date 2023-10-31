import { describe, expect, test } from "vitest";
import Slaughter from "lib/slaughter";
import type { SlaughterResponse } from "lib/slaughter/response";
import cashIndex from "lib/CashIndex";
import request from "./request";

describe("slaughter api", () => {
    test("return slaughter records by date range", async () => {
        const [status, body] = await request<SlaughterResponse>("/slaughter?start=2021-08-09&end=2021-08-16");
        expect(status).toBe(200);
        expect(body.length).toBe(48);

        const dates = Array.from(new Set(Slaughter.parse(body).map(({ date }) => date.getTime())))
            .map(timestamp => new Date(timestamp));

        expect(dates).toEqual([
            new Date(2021, 7, 6),
            new Date(2021, 7, 9),
            new Date(2021, 7, 10),
            new Date(2021, 7, 11),
            new Date(2021, 7, 12),
            new Date(2021, 7, 13)
        ]);
    });

    test("calculate the CME Lean Hog Index", async () => {
        const cash = await request<SlaughterResponse>("/slaughter?start=2021-08-09&end=2021-08-16")
            .then(([, body]) => Array.from(cashIndex(Slaughter.parse(body))));

        expect(cash).toEqual([{
        //  https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2021/LH210809.txt
            date: new Date(2021, 7, 9),
            dailyPrice: 110.59,
            indexPrice: 110.77
        }, {
        //  https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2021/LH210810.txt
            date: new Date(2021, 7, 10),
            dailyPrice: 110.32,
            indexPrice: 110.45
        }, {
        //  https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2021/LH210811.txt
            date: new Date(2021, 7, 11),
            dailyPrice: 110.06,
            indexPrice: 110.19
        }, {
        //  https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2021/LH210812.txt
            date: new Date(2021, 7, 12),
            dailyPrice: 109.75,
            indexPrice: 109.90
        }, {
        //  https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2021/LH210813.txt
            date: new Date(2021, 7, 13),
            dailyPrice: 109.59,
            indexPrice: 109.67
        }]);
    });
});
