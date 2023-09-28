import { describe, test, expect } from "vitest";
import type { Purchases } from "lib/purchases/mpr";
import { Arrangement, Basis, Seller } from "lib/PurchaseType";
import parse from "lib/purchases/parse";
import load from "./resources";

describe("Parse prior day purchase records", () => {
    const records = Array.from(parse(load<Purchases>("purchases.json")));

    test("Negotiated, carcass basis", () => {
        const record = records[0];
        expect(record.date).toEqual(new Date(2021, 10, 30));
        expect(record.reportDate).toEqual(new Date(2021, 11, 1));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(6765);
        expect(record.avgPrice).toBeCloseTo(56.52);
        expect(record.lowPrice).toBeCloseTo(53.00);
        expect(record.highPrice).toBeCloseTo(60.00);
    });

    test("Negotiated formula, carcass basis", () => {
        const record = records[1];
        expect(record.date).toEqual(new Date(2021, 10, 30));
        expect(record.reportDate).toEqual(new Date(2021, 11, 1));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(0);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });

    test("All negotiated, carcass basis", () => {
        const record = records[2];
        expect(record.date).toEqual(new Date(2021, 10, 30));
        expect(record.reportDate).toEqual(new Date(2021, 11, 1));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.AllNegotiated);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(0);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });

    test("Other market formula, carcass basis", () => {
        const record = records[3];
        expect(record.date).toEqual(new Date(2021, 10, 30));
        expect(record.reportDate).toEqual(new Date(2021, 11, 1));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.OtherMarketFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(25_742);
        expect(record.avgPrice).toBeCloseTo(70.77);
        expect(record.lowPrice).toBeCloseTo(54.38);
        expect(record.highPrice).toBeCloseTo(81.50);
    });

    test("Market formula, carcass basis", () => {
        const record = records[4];
        expect(record.date).toEqual(new Date(2021, 10, 30));
        expect(record.reportDate).toEqual(new Date(2021, 11, 1));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.MarketFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(141_153);
        expect(record.avgPrice).toBeCloseTo(70.11);
        expect(record.lowPrice).toBeCloseTo(54.63);
        expect(record.highPrice).toBeCloseTo(80.96);
    });

    test("Other purchase arrangement, carcass basis", () => {
        const record = records[5];
        expect(record.date).toEqual(new Date(2021, 10, 30));
        expect(record.reportDate).toEqual(new Date(2021, 11, 1));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.OtherPurchase);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(65_280);
        expect(record.avgPrice).toBeCloseTo(75.15);
        expect(record.lowPrice).toBeCloseTo(61.68);
        expect(record.highPrice).toBeCloseTo(95.50);
    });

    test("Negotiated, live basis", () => {
        const record = records[6];
        expect(record.date).toEqual(new Date(2021, 10, 30));
        expect(record.reportDate).toEqual(new Date(2021, 11, 1));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(284);
        expect(record.avgPrice).toBeCloseTo(48.50);
        expect(record.lowPrice).toBeCloseTo(40.00);
        expect(record.highPrice).toBeCloseTo(70.50);
    });

    test("Negotiated formula, live basis", () => {
        const record = records[7];
        expect(record.date).toEqual(new Date(2021, 10, 30));
        expect(record.reportDate).toEqual(new Date(2021, 11, 1));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(0);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });

    test("Combined Negotiated / Negotiated formula, live basis", () => {
        const record = records[8];
        expect(record.date).toEqual(new Date(2021, 10, 30));
        expect(record.reportDate).toEqual(new Date(2021, 11, 1));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.AllNegotiated);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(0);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });
});
