import type { ApiResponse } from "@ams/lib/Slaughter";
import parseResponse from "@ams/lib/Slaughter";
import { Arrangement, Basis, Seller } from "@ams/lib/PurchaseType";
import load from "./resources";

describe("parse slaughter records for a single day", () => {
    const records = parseResponse(load<ApiResponse>("slaughter.json"));

    test("Producer sold negotiated", () => {
        const record = records[0];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(5604);
        expect(record.basePrice).toBeCloseTo(46.03);
        expect(record.netPrice).toBeCloseTo(46.38);
        expect(record.lowPrice).toBeCloseTo(36.62);
        expect(record.highPrice).toBeCloseTo(58.12);
        expect(record.liveWeight).toBeCloseTo(271.81);
        expect(record.carcassWeight).toBeCloseTo(204.94);
        expect(record.sortLoss).toBeCloseTo(-1.25);
        expect(record.backfat).toBeCloseTo(0.65);
        expect(record.loinDepth).toBeCloseTo(2.36);
        expect(record.loineyeArea).toBeCloseTo(7.07);
        expect(record.leanPercent).toBeCloseTo(54.33);
    });

    test("Producer sold other market formula", () => {
        const record = records[1];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.OtherMarketFormula);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(43_510);
        expect(record.basePrice).toBeCloseTo(56.45);
        expect(record.netPrice).toBeCloseTo(59.25);
        expect(record.lowPrice).toBeCloseTo(33.43);
        expect(record.highPrice).toBeCloseTo(98.03);
        expect(record.liveWeight).toBeCloseTo(282.71);
        expect(record.carcassWeight).toBeCloseTo(213.41);
        expect(record.sortLoss).toBeCloseTo(-1.74);
        expect(record.backfat).toBeCloseTo(0.63);
        expect(record.loinDepth).toBeCloseTo(2.67);
        expect(record.loineyeArea).toBeCloseTo(8.01);
        expect(record.leanPercent).toBeCloseTo(55.97);
    });

    test("Producer sold other market formula", () => {
        const record = records[2];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.MarketFormula);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(121_704);
        expect(record.basePrice).toBeCloseTo(47.98);
        expect(record.netPrice).toBeCloseTo(50.49);
        expect(record.lowPrice).toBeCloseTo(29.64);
        expect(record.highPrice).toBeCloseTo(68.39);
        expect(record.liveWeight).toBeCloseTo(281.38);
        expect(record.carcassWeight).toBeCloseTo(211.90);
        expect(record.sortLoss).toBeCloseTo(-1.33);
        expect(record.backfat).toBeCloseTo(0.64);
        expect(record.loinDepth).toBeCloseTo(2.61);
        expect(record.loineyeArea).toBeCloseTo(7.85);
        expect(record.leanPercent).toBeCloseTo(55.82);
    });

    test("Producer sold other purchase arrangement", () => {
        const record = records[3];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.OtherPurchase);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(85_076);
        expect(record.basePrice).toBeCloseTo(58.60);
        expect(record.netPrice).toBeCloseTo(60.50);
        expect(record.lowPrice).toBeCloseTo(41.38);
        expect(record.highPrice).toBeCloseTo(89.48);
        expect(record.liveWeight).toBeCloseTo(284.72);
        expect(record.carcassWeight).toBeCloseTo(213.87);
        expect(record.sortLoss).toBeCloseTo(-1.40);
        expect(record.backfat).toBeCloseTo(0.69);
        expect(record.loinDepth).toBeCloseTo(2.57);
        expect(record.loineyeArea).toBeCloseTo(7.72);
        expect(record.leanPercent).toBeCloseTo(55.41);
    });

    test("Producer sold negotiated formula", () => {
        const record = records[4];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(846);
        expect(record.basePrice).toBeNaN();
        expect(record.netPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
        expect(record.liveWeight).toBeNaN();
        expect(record.carcassWeight).toBeNaN();
        expect(record.sortLoss).toBeNaN();
        expect(record.backfat).toBeNaN();
        expect(record.loinDepth).toBeNaN();
        expect(record.loineyeArea).toBeNaN();
        expect(record.leanPercent).toBeNaN();
    });

    test("All producer sold", () => {
        const record = records[5];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.All);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(256_740);
        expect(record.basePrice).toBeCloseTo(52.82);
        expect(record.netPrice).toBeCloseTo(55.32);
        expect(record.lowPrice).toBeCloseTo(35.51);
        expect(record.highPrice).toBeCloseTo(76.25);
        expect(record.liveWeight).toBeCloseTo(282.59);
        expect(record.carcassWeight).toBeCloseTo(212.73);
        expect(record.sortLoss).toBeCloseTo(-1.43);
        expect(record.backfat).toBeCloseTo(0.65);
        expect(record.loinDepth).toBeCloseTo(2.61);
        expect(record.loineyeArea).toBeCloseTo(7.84);
        expect(record.leanPercent).toBeCloseTo(55.72);
    });

    test("All packer sold", () => {
        const record = records[6];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.Packer);
        expect(record.arrangement).toBe(Arrangement.All);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(23_068);
        expect(record.basePrice).toBeCloseTo(48.28);
        expect(record.netPrice).toBeCloseTo(48.42);
        expect(record.lowPrice).toBeCloseTo(37.75);
        expect(record.highPrice).toBeCloseTo(53.10);
        expect(record.liveWeight).toBeCloseTo(284.03);
        expect(record.carcassWeight).toBeCloseTo(215.06);
        expect(record.sortLoss).toBeCloseTo(-1.71);
        expect(record.backfat).toBeCloseTo(0.64);
        expect(record.loinDepth).toBeCloseTo(2.61);
        expect(record.loineyeArea).toBeCloseTo(7.86);
        expect(record.leanPercent).toBeCloseTo(55.45);
    });

    test("Packer owned", () => {
        const record = records[7];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.seller).toBe(Seller.Packer);
        expect(record.arrangement).toBe(Arrangement.PackerOwned);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(168_042);
        expect(record.basePrice).toBeNaN();
        expect(record.netPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
        expect(record.liveWeight).toBeCloseTo(286.44);
        expect(record.carcassWeight).toBeCloseTo(216.97);
        expect(record.sortLoss).toBeNaN();
        expect(record.backfat).toBeCloseTo(0.66);
        expect(record.loinDepth).toBeCloseTo(2.55);
        expect(record.loineyeArea).toBeCloseTo(7.65);
        expect(record.leanPercent).toBeCloseTo(54.40);
    });
});
