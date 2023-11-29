import { describe, expect, test } from "vitest";
import { iterate } from "lib/async";
import { collect } from "lib/async/accumulate";
import { Arrangement, Basis, Seller } from "lib/mpr/PurchaseType";
import Purchase from "lib/purchases";
import parse, { type Purchases } from "lib/purchases/mpr";
import PurchasesViewModel from "lib/purchases/PurchasesViewModel";
import PurchasesInteractor from "lib/purchases/PurchasesInteractor";
import { tick } from ".";
import load from "./resources";

describe("Parse prior day purchase records", () => {
    const records = Array.from(parse(load<Purchases>("purchases.json")));

    test("Negotiated, carcass basis", () => {
        const record = records[0];
        expect(record.date).toEqual(new Date(2021, 11, 22));
        expect(record.reportDate).toEqual(new Date(2021, 11, 23));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(6401);
        expect(record.avgPrice).toBeCloseTo(61.19);
        expect(record.lowPrice).toBeCloseTo(59);
        expect(record.highPrice).toBeCloseTo(65);
    });

    test("Negotiated formula, carcass basis", () => {
        const record = records[1];
        expect(record.date).toEqual(new Date(2021, 11, 22));
        expect(record.reportDate).toEqual(new Date(2021, 11, 23));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(40);
        expect(record.avgPrice).toBeNull();
        expect(record.lowPrice).toBeNull();
        expect(record.highPrice).toBeNull();
    });

    test("All negotiated, carcass basis", () => {
        const record = records[2];
        expect(record.date).toEqual(new Date(2021, 11, 22));
        expect(record.reportDate).toEqual(new Date(2021, 11, 23));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.AllNegotiated);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(40);
        expect(record.avgPrice).toBeNull();
        expect(record.lowPrice).toBeNull();
        expect(record.highPrice).toBeNull();
    });

    test("Other market formula, carcass basis", () => {
        const record = records[3];
        expect(record.date).toEqual(new Date(2021, 11, 22));
        expect(record.reportDate).toEqual(new Date(2021, 11, 23));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.OtherMarketFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(31_604);
        expect(record.avgPrice).toBeCloseTo(78.56);
        expect(record.lowPrice).toBeCloseTo(56.98);
        expect(record.highPrice).toBeCloseTo(97.72);
    });

    test("Market formula, carcass basis", () => {
        const record = records[4];
        expect(record.date).toEqual(new Date(2021, 11, 22));
        expect(record.reportDate).toEqual(new Date(2021, 11, 23));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.MarketFormula);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(138_853);
        expect(record.avgPrice).toBeCloseTo(70.84);
        expect(record.lowPrice).toBeCloseTo(57.86);
        expect(record.highPrice).toBeCloseTo(80.24);
    });

    test("Other purchase arrangement, carcass basis", () => {
        const record = records[5];
        expect(record.date).toEqual(new Date(2021, 11, 22));
        expect(record.reportDate).toEqual(new Date(2021, 11, 23));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.OtherPurchase);
        expect(record.basis).toBe(Basis.Carcass);
        expect(record.headCount).toBe(54_544);
        expect(record.avgPrice).toBeCloseTo(76.57);
        expect(record.lowPrice).toBeCloseTo(61.89);
        expect(record.highPrice).toBeCloseTo(96.98);
    });

    test("Negotiated, live basis", () => {
        const record = records[6];
        expect(record.date).toEqual(new Date(2021, 11, 22));
        expect(record.reportDate).toEqual(new Date(2021, 11, 23));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(836);
        expect(record.avgPrice).toBeNull();
        expect(record.lowPrice).toBeNull();
        expect(record.highPrice).toBeNull();
    });

    test("Negotiated formula, live basis", () => {
        const record = records[7];
        expect(record.date).toEqual(new Date(2021, 11, 22));
        expect(record.reportDate).toEqual(new Date(2021, 11, 23));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(0);
        expect(record.avgPrice).toBeNull();
        expect(record.lowPrice).toBeNull();
        expect(record.highPrice).toBeNull();
    });

    test("Combined Negotiated / Negotiated formula, live basis", () => {
        const record = records[8];
        expect(record.date).toEqual(new Date(2021, 11, 22));
        expect(record.reportDate).toEqual(new Date(2021, 11, 23));
        expect(record.seller).toBe(Seller.All);
        expect(record.arrangement).toBe(Arrangement.AllNegotiated);
        expect(record.basis).toBe(Basis.Live);
        expect(record.headCount).toBe(0);
        expect(record.avgPrice).toBeNull();
        expect(record.lowPrice).toBeNull();
        expect(record.highPrice).toBeNull();
    });
});

test("Map market formula purchases to data series", () => {
    const purchases = Array.from(parse(load<Purchases>("purchases.json")));

    expect(Purchase.marketFormula(purchases).slice(-5)).toEqual([{
        date: new Date(2021, 11, 16),
        value: 72.56
    }, {
        date: new Date(2021, 11, 17),
        value: 72.3
    }, {
        date: new Date(2021, 11, 20),
        value: 71.55
    }, {
        date: new Date(2021, 11, 21),
        value: 71.17
    }, {
        date: new Date(2021, 11, 22),
        value: 70.84
    }]);
});

describe("Purchases ViewModel", () => {
    const purchases = parse(load<Purchases>("purchases.json"));
    const model = PurchasesViewModel.from(purchases);

    test("Market formula series", () => {
        expect(model.series.slice(-5)).toEqual([{
            date: new Date(2021, 11, 16),
            value: 72.56
        }, {
            date: new Date(2021, 11, 17),
            value: 72.3
        }, {
            date: new Date(2021, 11, 20),
            value: 71.55
        }, {
            date: new Date(2021, 11, 21),
            value: 71.17
        }, {
            date: new Date(2021, 11, 22),
            value: 70.84
        }]);
    });

    test("Extents for series dates and values", () => {
        expect(model.dates).toEqual([new Date(2021, 11, 9), new Date(2021, 11, 22)]);
        expect(model.values).toEqual([70.84, 72.56]);
    });

    test("Selected date and formatted stats", () => {
        expect(model.selected).toEqual({
            date: new Date(2021, 11, 22),
            value: 70.84
        });

        expect(model.stats).toEqual({
            label: "Formula",
            value: "70.84"
        });
    });
});

describe("Purchases Interactor", () => {
    const purchases = parse(load<Purchases>("purchases.json"));

    test("select a date", async () => {
        const interactor = new PurchasesInteractor(purchases);
        const iterator = iterate(interactor.selected);
        const next = iterator.next();
        interactor.selectDate(new Date(2021, 11, 16));
        const { value: selected } = await next;

        expect(selected).toEqual({
            date: new Date(2021, 11, 16),
            value: 72.56
        });
    });

    test("reset selected date", async () => {
        const interactor = new PurchasesInteractor(purchases);
        const selected = collect(interactor.selected);
        const stats = collect(interactor.stats);

        interactor.selectDate(new Date(2021, 11, 16));
        await tick();

        interactor.resetDate();
        await tick();

        expect(selected()).toEqual([{
            date: new Date(2021, 11, 16),
            value: 72.56
        }, {
            date: new Date(2021, 11, 22),
            value: 70.84
        }]);

        expect(stats()).toEqual([{
            label: "Formula",
            value: "72.56"
        }, {
            label: "Formula",
            value: "70.84"
        }]);
    });
});
