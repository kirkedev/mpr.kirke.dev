import { getDate, optFloat, optInt } from "@ams/lib/mpr";
import { Arrangement, Basis, Seller } from "@ams/lib/mpr/PurchaseType";
import type { SlaughterResponse } from "@ams/lib/mpr/Slaughter";
import parseSlaughter from "@ams/lib/mpr/Slaughter";
import type { PrimalsResponse, VolumeResponse } from "@ams/lib/mpr/Cutout";
import parseCutout from "@ams/lib/mpr/Cutout";
import type { PurchaseResponse } from "@ams/lib/mpr/Purchase";
import parsePurchases from "@ams/lib/mpr/Purchase";
import type { SalesResponse } from "@ams/lib/mpr/Sales";
import parseSales, { Cut } from "@ams/lib/mpr/Sales";
import load from "./resources";

describe("get an optional integer value from a record", () => {
    test("key is present with value", () => {
        const record = { "key": "1,234" };
        expect(optInt(record, "key")).toBe(1234);
    });

    test("key is not present", () => {
        const record = { };
        expect(optInt(record, "key")).toBe(0);
    });
});

describe("get an optional float value from a record", () => {
    test("key is present with value", () => {
        const record = { "key": "1,234.56" };
        expect(optFloat(record, "key")).toBe(1234.56);
    });

    test("key is not present", () => {
        const record = { };
        expect(optFloat(record, "key")).toBeNaN();
    });
});

test("parse a date", () => {
    const date = getDate("4/20/2020");
    expect(date).toEqual(new Date(2020, 3, 20));
});

describe("parse slaughter records for a single day", () => {
    const records = Array.from(parseSlaughter(load<SlaughterResponse>("slaughter.json")));

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

test("parse cutout records for a single day", () => {
    const volume = load<VolumeResponse>("volume.json");
    const primals = load<PrimalsResponse>("primals.json");
    const [cutout] = Array.from(parseCutout(volume, primals));

    expect(cutout.date).toEqual(new Date(2020, 3, 9));
    expect(cutout.reportDate).toEqual(new Date(2020, 3, 9));
    expect(cutout.primalLoads).toBeCloseTo(359.80);
    expect(cutout.trimmingLoads).toBeCloseTo(75.41);
    expect(cutout.carcassPrice).toBeCloseTo(51.07);
    expect(cutout.bellyPrice).toBeCloseTo(31.84);
    expect(cutout.buttPrice).toBeCloseTo(48.39);
    expect(cutout.hamPrice).toBeCloseTo(34.98);
    expect(cutout.loinPrice).toBeCloseTo(88.58);
    expect(cutout.picnicPrice).toBeCloseTo(27.33);
    expect(cutout.ribPrice).toBeCloseTo(95.49);
});

describe("parse daily direct hog purchases", () => {
    const records = Array.from(parsePurchases(load<PurchaseResponse>("purchases.json")));

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

describe("parse prior day direct hog purchases", () => {
    const records = Array.from(parsePurchases(load<PurchaseResponse>("prior_day_purchases.json")));

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

describe("parse daily meat sales", () => {
    const records = Array.from(parseSales(load<SalesResponse>("sales.json")));

    test("parse Derind Belly 7-9#", () => {
        const record = records[0];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.type).toBe(Cut.Belly);
        expect(record.description).toBe("Derind Belly 7-9#");
        expect(record.weight).toBe(0);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });

    test("parse Derind Belly 9-13#", () => {
        const record = records[1];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.type).toBe(Cut.Belly);
        expect(record.description).toBe("Derind Belly 9-13#");
        expect(record.weight).toBe(63_800);
        expect(record.avgPrice).toBeCloseTo(53.66);
        expect(record.lowPrice).toBeCloseTo(53.00);
        expect(record.highPrice).toBeCloseTo(54.00);
    });

    test("parse Derind Belly 13-17#", () => {
        const record = records[2];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.type).toBe(Cut.Belly);
        expect(record.description).toBe("Derind Belly 13-17#");
        expect(record.weight).toBe(281_887);
        expect(record.avgPrice).toBeCloseTo(38.35);
        expect(record.lowPrice).toBeCloseTo(35.00);
        expect(record.highPrice).toBeCloseTo(56.00);
    });

    test("parse Derind Belly 17-19#", () => {
        const record = records[3];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.type).toBe(Cut.Belly);
        expect(record.description).toBe("Derind Belly 17-19#");
        expect(record.weight).toBe(0);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });
});

describe("parse weekly meat sales", () => {
    const records = Array.from(parseSales(load<SalesResponse>("weekly_sales.json")));

    test("parse Derind Belly 7-9#", () => {
        const record = records[0];
        expect(record.date).toEqual(new Date(2021, 8, 24));
        expect(record.reportDate).toEqual(new Date(2021, 8, 24));
        expect(record.type).toBe(Cut.Belly);
        expect(record.description).toBe("Derind Belly 7-9#");
        expect(record.weight).toBe(0);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });

    test("parse Derind Belly 9-13#", () => {
        const record = records[1];
        expect(record.date).toEqual(new Date(2021, 8, 24));
        expect(record.reportDate).toEqual(new Date(2021, 8, 24));
        expect(record.type).toBe(Cut.Belly);
        expect(record.description).toBe("Derind Belly 9-13#");
        expect(record.weight).toBe(285_569);
        expect(record.avgPrice).toBeCloseTo(219.69);
        expect(record.lowPrice).toBeCloseTo(207.10);
        expect(record.highPrice).toBeCloseTo(288.07);
    });

    test("parse Derind Belly 13-17#", () => {
        const record = records[2];
        expect(record.date).toEqual(new Date(2021, 8, 24));
        expect(record.reportDate).toEqual(new Date(2021, 8, 24));
        expect(record.type).toBe(Cut.Belly);
        expect(record.description).toBe("Derind Belly 13-17#");
        expect(record.weight).toBe(722_932);
        expect(record.avgPrice).toBeCloseTo(209.11);
        expect(record.lowPrice).toBeCloseTo(198.23);
        expect(record.highPrice).toBeCloseTo(253.07);
    });

    test("parse Derind Belly 17-19#", () => {
        const record = records[3];
        expect(record.date).toEqual(new Date(2021, 8, 24));
        expect(record.reportDate).toEqual(new Date(2021, 8, 24));
        expect(record.type).toBe(Cut.Belly);
        expect(record.description).toBe("Derind Belly 17-19#");
        expect(record.weight).toBe(0);
        expect(record.avgPrice).toBeNaN();
        expect(record.lowPrice).toBeNaN();
        expect(record.highPrice).toBeNaN();
    });
});
