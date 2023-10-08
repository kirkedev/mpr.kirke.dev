import { describe, test, expect } from "vitest";
import Cutout from "lib/cutout";
import type { CutoutResponse } from "lib/cutout/response";
import cutoutIndex from "lib/CutoutIndex";
import request from "./request";

describe("cutout api", () => {
    test("return cutout records by date range", async () => {
        const [status, body] = await request<CutoutResponse>("/cutout?start=2021-08-06&end=2021-08-13");
        expect(status).toBe(200);
        expect(body.length).toBe(6);

        expect(Cutout.parse(body).map(({ date }) => date)).toEqual([
            new Date(2021, 7, 6),
            new Date(2021, 7, 9),
            new Date(2021, 7, 10),
            new Date(2021, 7, 11),
            new Date(2021, 7, 12),
            new Date(2021, 7, 13)
        ]);
    });

    test("calculate the CME Cutout Index from the api response", async () => {
        const [cutout] = await request<CutoutResponse>("/cutout?start=2021-08-09&end=2021-08-13")
            .then(([, body]) => Array.from(cutoutIndex(Cutout.parse(body))));

        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2021/PC210813.txt
        expect(cutout).toEqual({
            date: new Date(2021, 7, 13),
            reportDate: new Date(2021, 7, 13),
            indexPrice: 123.31,
            carcassPrice: 125.68,
            loads: 378.72
        });
    });

    test("No results found response", async () => {
        const [response, body] = await request<CutoutResponse>("/cutout?start=2021-12-31&end=2021-12-31");
        expect(response).toBe(200);
        expect(body).toEqual([]);
    });
});
