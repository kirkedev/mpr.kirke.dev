import type { BarrowsGilts } from "lib/purchases/mpr";
import { Arrangement, Basis, Seller } from "lib/PurchaseType";
import parse from "lib/purchases/parse";
import load from "./resources";

describe("Parse afternoon purchase records", () => {
    const records = Array.from(parse(load<BarrowsGilts>("purchases.json")));

    test("Negotiated, carcass basis", () => {
        const record = records[0];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(5481);
        expect(record.avgPrice).toBeCloseTo(39.96);
        expect(record.lowPrice).toBeCloseTo(38.00);
        expect(record.highPrice).toBeCloseTo(41.00);
    });

    test("Negotiated formula, carcass basis", () => {
        const record = records[1];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(1022);
        expect(record.avgPrice).toBeCloseTo(49.28);
        expect(record.lowPrice).toBeCloseTo(40.34);
        expect(record.highPrice).toBeCloseTo(56.02);
    });

    test("All negotiated, carcass basis", () => {
        const record = records[2];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.AllNegotiated);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(6503);
        expect(record.avgPrice).toBeCloseTo(41.43);
        expect(record.lowPrice).toBeCloseTo(38.00);
        expect(record.highPrice).toBeCloseTo(56.02);
    });

    test("Market formula, carcass basis", () => {
        const record = records[3];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.MarketFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(130_169);
        expect(record.avgPrice).toBeCloseTo(46.14);
        expect(record.lowPrice).toBeCloseTo(38.50);
        expect(record.highPrice).toBeCloseTo(60.40);
    });

    test("Negotiated, live basis", () => {
        const record = records[4];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(990);
        expect(record.avgPrice).toBeCloseTo(29.35);
        expect(record.lowPrice).toBeCloseTo(19.00);
        expect(record.highPrice).toBeCloseTo(33.30);
    });

    test("Negotiated formula, live basis", () => {
        const record = records[5];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(165);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });

    test("All negotiated, live basis", () => {
        const record = records[6];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.AllNegotiated);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(1155);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });
});

describe("Parse prior day purchase records", () => {
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

    test("parse", () => {
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
