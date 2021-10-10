import type { BarrowsGilts } from "@ams/lib/purchases/mpr";
import { Arrangement, Basis, Seller } from "@ams/lib/PurchaseType";
import parse from "@ams/lib/purchases/parse";
import load from "./resources";

describe("parse prior day direct hog purchases", () => {
    const records = Array.from(parse(load<BarrowsGilts>("prior_day_purchases.json")));

    test("Negotiated, carcass basis", () => {
        const record = records[0];
        expect(record.date).toEqual(new Date(2020, 3, 7));
        expect(record.reportDate).toEqual(new Date(2020, 3, 8));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(5049);
        expect(record.avgPrice).toBeCloseTo(40.62);
        expect(record.lowPrice).toBeCloseTo(38.00);
        expect(record.highPrice).toBeCloseTo(42.00);
    });

    test("Negotiated formula, carcass basis", () => {
        const record = records[1];
        expect(record.date).toEqual(new Date(2020, 3, 7));
        expect(record.reportDate).toEqual(new Date(2020, 3, 8));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(505);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });

    test("All negotiated, carcass basis", () => {
        const record = records[2];
        expect(record.date).toEqual(new Date(2020, 3, 7));
        expect(record.reportDate).toEqual(new Date(2020, 3, 8));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.AllNegotiated);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(5554);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });

    test("Market formula, carcass basis", () => {
        const record = records[3];
        expect(record.date).toEqual(new Date(2020, 3, 7));
        expect(record.reportDate).toEqual(new Date(2020, 3, 8));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.MarketFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(130_915);
        expect(record.avgPrice).toBeCloseTo(48.78);
        expect(record.lowPrice).toBeCloseTo(38.85);
        expect(record.highPrice).toBeCloseTo(58.88);
    });

    test("Negotiated, live basis", () => {
        const record = records[4];
        expect(record.date).toEqual(new Date(2020, 3, 7));
        expect(record.reportDate).toEqual(new Date(2020, 3, 8));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(741);
        expect(record.avgPrice).toBeCloseTo(33.90);
        expect(record.lowPrice).toBeCloseTo(32.00);
        expect(record.highPrice).toBeCloseTo(37.00);
    });

    test("Negotiated formula, live basis", () => {
        const record = records[5];
        expect(record.date).toEqual(new Date(2020, 3, 7));
        expect(record.reportDate).toEqual(new Date(2020, 3, 8));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(0);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });

    test("All negotiated, live basis", () => {
        const record = records[6];
        expect(record.date).toEqual(new Date(2020, 3, 7));
        expect(record.reportDate).toEqual(new Date(2020, 3, 8));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.AllNegotiated);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(741);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });
});
