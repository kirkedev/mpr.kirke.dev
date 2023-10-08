import { describe, test, expect } from "vitest";
import cutoutIndex from "lib/CutoutIndex";
import parseCutout from "lib/cutout/parse";
import type { ValuesResponse, VolumeResponse } from "lib/cutout/mpr";
import load from "./resources";

describe("Calculate the CME Cutout Index", () => {
    const [values, volume] = load<[ValuesResponse, VolumeResponse]>("cutout_index.json");
    const cutout = Array.from(cutoutIndex(parseCutout(volume, values)));

    test("Cutout Index for 4/7/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200407.txt
        const record = cutout[0];
        expect(record.date).toEqual(new Date(2020, 3, 7));
        expect(record.indexPrice).toBeCloseTo(57.91);
        expect(record.carcassPrice).toBeCloseTo(54.73);
        expect(record.loads).toBeCloseTo(439.80);
    });

    test("Cutout Index for 4/8/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200408.txt
        const record = cutout[1];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.indexPrice).toBeCloseTo(55.82);
        expect(record.carcassPrice).toBeCloseTo(51.41);
        expect(record.loads).toBeCloseTo(473.91);
    });

    test("Cutout Index for 4/9/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200409.txt
        const record = cutout[2];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.indexPrice).toBeCloseTo(54.30);
        expect(record.carcassPrice).toBeCloseTo(51.07);
        expect(record.loads).toBeCloseTo(435.21);
    });

    test("Cutout Index for 4/10/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200410.txt
        const record = cutout[3];
        expect(record.date).toEqual(new Date(2020, 3, 10));
        expect(record.indexPrice).toBeCloseTo(53.47);
        expect(record.carcassPrice).toBeCloseTo(52.85);
        expect(record.loads).toBeCloseTo(343.36);
    });

    test("Cutout Index for 4/13/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200413.txt
        const record = cutout[4];
        expect(record.date).toEqual(new Date(2020, 3, 13));
        expect(record.indexPrice).toBeCloseTo(52.57);
        expect(record.carcassPrice).toBeCloseTo(52.87);
        expect(record.loads).toBeCloseTo(486.86);
    });

    test("Cutout Index for 4/14/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200414.txt
        const record = cutout[5];
        expect(record.date).toEqual(new Date(2020, 3, 14));
        expect(record.indexPrice).toBeCloseTo(52.26);
        expect(record.carcassPrice).toBeCloseTo(53.07);
        expect(record.loads).toBeCloseTo(519.97);
    });

    test("Cutout Index for 4/15/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200415.txt
        const record = cutout[6];
        expect(record.date).toEqual(new Date(2020, 3, 15));
        expect(record.indexPrice).toBeCloseTo(52.42);
        expect(record.carcassPrice).toBeCloseTo(52.10);
        expect(record.loads).toBeCloseTo(397.26);
    });

    test("Cutout Index for 4/16/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200416.txt
        const record = cutout[7];
        expect(record.date).toEqual(new Date(2020, 3, 16));
        expect(record.indexPrice).toBeCloseTo(53.31);
        expect(record.carcassPrice).toBeCloseTo(55.86);
        expect(record.loads).toBeCloseTo(387.11);
    });

    test("Cutout Index for 4/17/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200417.txt
        const record = cutout[8];
        expect(record.date).toEqual(new Date(2020, 3, 17));
        expect(record.indexPrice).toBeCloseTo(54.68);
        expect(record.carcassPrice).toBeCloseTo(60.13);
        expect(record.loads).toBeCloseTo(418.17);
    });

    test("Cutout Index for 4/20/2020", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/pork_cutout/2020/PC200420.txt
        const record = cutout[9];
        expect(record.date).toEqual(new Date(2020, 3, 20));
        expect(record.indexPrice).toBeCloseTo(57.11);
        expect(record.carcassPrice).toBeCloseTo(66.68);
        expect(record.loads).toBeCloseTo(345.53);
    });
});
