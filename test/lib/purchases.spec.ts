import type { BarrowsGilts } from "@ams/lib/purchases/mpr";
import { Arrangement, Basis, Seller } from "@ams/lib/PurchaseType";
import Purchase from "@ams/lib/purchases";
import parse from "@ams/lib/purchases/parse";
import type { PurchaseResponse } from "@ams/lib/purchases/serialize";
import serialize from "@ams/lib/purchases/serialize";
import load from "./resources";

const deserialize = (purchase: PurchaseResponse): Purchase =>
    Purchase.parse(purchase)[0];

describe("Parse daily purchase records", () => {
    const records = Array.from(parse(load<BarrowsGilts>("prior_day_purchases.json")));
    const serialized = serialize(records);

    describe("Negotiated, carcass basis", () => {
        test("parse", () => {
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

        test("serialize", () => {
            const record = serialized[0];
            expect(record.date).toBe("2020-04-07");
            expect(record.reportDate).toBe("2020-04-08");
            expect(deserialize([record])).toEqual(records[0]);
        });
    });

    describe("Negotiated formula, carcass basis", () => {
        test("parse", () => {
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

        test("serialize", () => {
            const record = serialized[1];
            expect(record.date).toBe("2020-04-07");
            expect(record.reportDate).toBe("2020-04-08");
            expect(deserialize([record])).toEqual(records[1]);
        });
    });

    describe("All negotiated, carcass basis", () => {
        test("parse", () => {
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

        test("serialize", () => {
            const record = serialized[2];
            expect(record.date).toBe("2020-04-07");
            expect(record.reportDate).toBe("2020-04-08");
            expect(deserialize([record])).toEqual(records[2]);
        });
    });

    describe("Market formula, carcass basis", () => {
        test("parse", () => {
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

        test("serialize", () => {
            const record = serialized[3];
            expect(record.date).toBe("2020-04-07");
            expect(record.reportDate).toBe("2020-04-08");
            expect(deserialize([record])).toEqual(records[3]);
        });
    });

    describe("Negotiated, live basis", () => {
        test("parse", () => {
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

        test("serialize", () => {
            const record = serialized[4];
            expect(record.date).toBe("2020-04-07");
            expect(record.reportDate).toBe("2020-04-08");
            expect(deserialize([record])).toEqual(records[4]);
        });
    });

    describe("Negotiated formula, live basis", () => {
        test("parse", () => {
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

        test("serialize", () => {
            const record = serialized[5];
            expect(record.date).toBe("2020-04-07");
            expect(record.reportDate).toBe("2020-04-08");
            expect(deserialize([record])).toEqual(records[5]);
        });
    });

    describe("All negotiated, live basis", () => {
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

        test("serialize", () => {
            const record = serialized[6];
            expect(record.date).toBe("2020-04-07");
            expect(record.reportDate).toBe("2020-04-08");
            expect(deserialize([record])).toEqual(records[6]);
        });
    });
});
