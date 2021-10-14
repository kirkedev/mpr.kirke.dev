import type { BarrowsGilts } from "lib/slaughter/mpr";
import parse from "lib/slaughter/parse";
import cashIndex from "lib/CashIndex";
import load from "./resources";

describe("Calculate the CME Lean Hog Index", () => {
    const slaughter = parse(load<BarrowsGilts>("cash_index.json"));
    const index = Array.from(cashIndex(slaughter));

    test("Lean Hog Index for 2/1/2019", () => {
        const record = index[0];
        expect(record.date).toEqual(new Date(2019, 1, 1));
        expect(record.dailyPrice).toBeCloseTo(57.45);
        expect(record.indexPrice).toBeCloseTo(57.41);
    });

    test("Lean Hog Index for 2/4/2019", () => {
        const record = index[1];
        expect(record.date).toEqual(new Date(2019, 1, 4));
        expect(record.dailyPrice).toBeCloseTo(57.18);
        expect(record.indexPrice).toBeCloseTo(57.36);
    });

    test("Lean Hog Index for 2/5/2019", () => {
        const record = index[2];
        expect(record.date).toEqual(new Date(2019, 1, 5));
        expect(record.dailyPrice).toBeCloseTo(57.13);
        expect(record.indexPrice).toBeCloseTo(57.16);
    });

    test("Lean Hog Index for 2/6/2019", () => {
        const record = index[3];
        expect(record.date).toEqual(new Date(2019, 1, 6));
        expect(record.dailyPrice).toBeCloseTo(56.65);
        expect(record.indexPrice).toBeCloseTo(56.89);
    });

    test("Lean Hog Index for 2/7/2019", () => {
        const record = index[4];
        expect(record.date).toEqual(new Date(2019, 1, 7));
        expect(record.dailyPrice).toBeCloseTo(56.40);
        expect(record.indexPrice).toBeCloseTo(56.53);
    });

    test("Lean Hog Index for 2/8/2019", () => {
        const record = index[5];
        expect(record.date).toEqual(new Date(2019, 1, 8));
        expect(record.dailyPrice).toBeCloseTo(55.98);
        expect(record.indexPrice).toBeCloseTo(56.14);
    });

    test("Lean Hog Index for 2/11/2019", () => {
        const record = index[6];
        expect(record.date).toEqual(new Date(2019, 1, 11));
        expect(record.dailyPrice).toBeCloseTo(55.78);
        expect(record.indexPrice).toBeCloseTo(55.91);
    });

    test("Lean Hog Index for 2/12/2019", () => {
        const record = index[7];
        expect(record.date).toEqual(new Date(2019, 1, 12));
        expect(record.dailyPrice).toBeCloseTo(55.32);
        expect(record.indexPrice).toBeCloseTo(55.55);
    });

    test("Lean Hog Index for 2/13/2019", () => {
        const record = index[8];
        expect(record.date).toEqual(new Date(2019, 1, 13));
        expect(record.dailyPrice).toBeCloseTo(55.16);
        expect(record.indexPrice).toBeCloseTo(55.24);
    });

    test("Lean Hog Index for 2/14/2019", () => {
        const record = index[9];
        expect(record.date).toEqual(new Date(2019, 1, 14));
        expect(record.dailyPrice).toBeCloseTo(54.89);
        expect(record.indexPrice).toBeCloseTo(55.02);
    });

    test("Lean Hog Index for 2/15/2019", () => {
        const record = index[10];
        expect(record.date).toEqual(new Date(2019, 1, 15));
        expect(record.dailyPrice).toBeCloseTo(54.64);
        expect(record.indexPrice).toBeCloseTo(54.74);
    });

    test("Lean Hog Index for 2/18/2019", () => {
        const record = index[11];
        expect(record.date).toEqual(new Date(2019, 1, 18));
        expect(record.dailyPrice).toBeCloseTo(54.08);
        expect(record.indexPrice).toBeCloseTo(54.43);
    });

    test("Lean Hog Index for 2/19/2019", () => {
        const record = index[12];
        expect(record.date).toEqual(new Date(2019, 1, 19));
        expect(record.dailyPrice).toBeCloseTo(54.19);
        expect(record.indexPrice).toBeCloseTo(54.13);
    });

    test("Lean Hog Index for 2/20/2019", () => {
        const record = index[13];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.dailyPrice).toBeCloseTo(53.93);
        expect(record.indexPrice).toBeCloseTo(54.06);
    });
});
