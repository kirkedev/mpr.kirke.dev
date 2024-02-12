import { describe, expect, test } from "vitest";
import { iterate } from "lib/async";
import { collect } from "lib/async/accumulate";
import { Arrangement, Basis, Seller } from "lib/mpr/PurchaseType";
import parse, { type BarrowsGilts } from "lib/slaughter/mpr";
import CashIndex from "lib/slaughter/CashIndex";
import CashIndexViewModel from "lib/slaughter/CashIndexViewModel";
import CashIndexInteractor from "lib/slaughter/CashIndexInteractor";
import { tick } from ".";
import load from "./resources";

describe("Parse daily slaughter response from MPR", () => {
    const records = Array.from(parse(load<BarrowsGilts>("slaughter.json")));

    test("Producer sold negotiated", () => {
        const record = records[0];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.reportDate).toEqual(new Date(2019, 1, 21));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.Negotiated);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(6274);
        expect(record.basePrice).toBeCloseTo(48.05);
        expect(record.netPrice).toBeCloseTo(50.66);
        expect(record.lowPrice).toBeCloseTo(42.60);
        expect(record.highPrice).toBeCloseTo(57.72);
        expect(record.liveWeight).toBeCloseTo(267.62);
        expect(record.carcassWeight).toBeCloseTo(194.71);
        expect(record.leanPercent).toBeCloseTo(54.99);
    });

    test("Producer sold other market formula", () => {
        const record = records[1];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.reportDate).toEqual(new Date(2019, 1, 21));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.OtherMarketFormula);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(46_884);
        expect(record.basePrice).toBeCloseTo(59.20);
        expect(record.netPrice).toBeCloseTo(61.72);
        expect(record.lowPrice).toBeCloseTo(49.02);
        expect(record.highPrice).toBeCloseTo(73.39);
        expect(record.liveWeight).toBeCloseTo(288.53);
        expect(record.carcassWeight).toBeCloseTo(218.24);
        expect(record.leanPercent).toBeCloseTo(56.38);
    });

    test("Producer sold market formula", () => {
        const record = records[2];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.reportDate).toEqual(new Date(2019, 1, 21));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.MarketFormula);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(131_718);
        expect(record.basePrice).toBeCloseTo(51.94);
        expect(record.netPrice).toBeCloseTo(54.07);
        expect(record.lowPrice).toBeCloseTo(41.12);
        expect(record.highPrice).toBeCloseTo(74.75);
        expect(record.liveWeight).toBeCloseTo(284.23);
        expect(record.carcassWeight).toBeCloseTo(213.61);
        expect(record.leanPercent).toBeCloseTo(56.03);
    });

    test("Producer sold other purchase arrangement", () => {
        const record = records[3];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.reportDate).toEqual(new Date(2019, 1, 21));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.OtherPurchase);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(92_436);
        expect(record.basePrice).toBeCloseTo(60.10);
        expect(record.netPrice).toBeCloseTo(61.26);
        expect(record.lowPrice).toBeCloseTo(45.54);
        expect(record.highPrice).toBeCloseTo(78.75);
        expect(record.liveWeight).toBeCloseTo(283.73);
        expect(record.carcassWeight).toBeCloseTo(212.56);
        expect(record.leanPercent).toBeCloseTo(55.78);
    });

    test("Producer sold negotiated formula", () => {
        const record = records[4];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.reportDate).toEqual(new Date(2019, 1, 21));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.NegotiatedFormula);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(1359);
        expect(record.basePrice).toBeNull();
        expect(record.netPrice).toBeNull();
        expect(record.lowPrice).toBeNull();
        expect(record.highPrice).toBeNull();
        expect(record.liveWeight).toBeNull();
        expect(record.carcassWeight).toBeNull();
        expect(record.leanPercent).toBeNull();
    });

    test("All producer sold", () => {
        const record = records[5];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.reportDate).toEqual(new Date(2019, 1, 21));
        expect(record.seller).toBe(Seller.Producer);
        expect(record.arrangement).toBe(Arrangement.All);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(278_671);
        expect(record.basePrice).toBeCloseTo(55.85);
        expect(record.netPrice).toBeCloseTo(57.76);
        expect(record.lowPrice).toBeCloseTo(47.02);
        expect(record.highPrice).toBeCloseTo(75.31);
        expect(record.liveWeight).toBeCloseTo(284.48);
        expect(record.carcassWeight).toBeCloseTo(213.70);
        expect(record.leanPercent).toBeCloseTo(56.02);
    });

    test("All packer sold", () => {
        const record = records[6];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.reportDate).toEqual(new Date(2019, 1, 21));
        expect(record.seller).toBe(Seller.Packer);
        expect(record.arrangement).toBe(Arrangement.All);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(7920);
        expect(record.basePrice).toBeCloseTo(51.61);
        expect(record.netPrice).toBeCloseTo(53.45);
        expect(record.lowPrice).toBeCloseTo(50.38);
        expect(record.highPrice).toBeCloseTo(56.55);
        expect(record.liveWeight).toBeCloseTo(285.54);
        expect(record.carcassWeight).toBeCloseTo(212.01);
        expect(record.leanPercent).toBeCloseTo(55.44);
    });

    test("Packer owned", () => {
        const record = records[7];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.reportDate).toEqual(new Date(2019, 1, 21));
        expect(record.seller).toBe(Seller.Packer);
        expect(record.arrangement).toBe(Arrangement.PackerOwned);
        expect(record.basis).toBe(Basis.All);
        expect(record.headCount).toBe(142_767);
        expect(record.basePrice).toBeNull();
        expect(record.netPrice).toBeNull();
        expect(record.lowPrice).toBeNull();
        expect(record.highPrice).toBeNull();
        expect(record.liveWeight).toBeCloseTo(286.96);
        expect(record.carcassWeight).toBeCloseTo(218.09);
        expect(record.leanPercent).toBeCloseTo(54.23);
    });
});

describe("Calculate the CME Lean Hog Index", () => {
    const slaughter = parse(load<BarrowsGilts>("slaughter.json"));
    const index = Array.from(CashIndex.from(slaughter));

    test("Lean Hog Index for 2/1/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190201.txt
        const record = index[0];
        expect(record.date).toEqual(new Date(2019, 1, 1));
        expect(record.dailyPrice).toBeCloseTo(57.45);
        expect(record.indexPrice).toBeCloseTo(57.41);
    });

    test("Lean Hog Index for 2/4/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190204.txt
        const record = index[1];
        expect(record.date).toEqual(new Date(2019, 1, 4));
        expect(record.dailyPrice).toBeCloseTo(57.18);
        expect(record.indexPrice).toBeCloseTo(57.36);
    });

    test("Lean Hog Index for 2/5/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190205.txt
        const record = index[2];
        expect(record.date).toEqual(new Date(2019, 1, 5));
        expect(record.dailyPrice).toBeCloseTo(57.13);
        expect(record.indexPrice).toBeCloseTo(57.16);
    });

    test("Lean Hog Index for 2/6/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190206.txt
        const record = index[3];
        expect(record.date).toEqual(new Date(2019, 1, 6));
        expect(record.dailyPrice).toBeCloseTo(56.65);
        expect(record.indexPrice).toBeCloseTo(56.89);
    });

    test("Lean Hog Index for 2/7/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190207.txt
        const record = index[4];
        expect(record.date).toEqual(new Date(2019, 1, 7));
        expect(record.dailyPrice).toBeCloseTo(56.40);
        expect(record.indexPrice).toBeCloseTo(56.53);
    });

    test("Lean Hog Index for 2/8/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190208.txt
        const record = index[5];
        expect(record.date).toEqual(new Date(2019, 1, 8));
        expect(record.dailyPrice).toBeCloseTo(55.98);
        expect(record.indexPrice).toBeCloseTo(56.14);
    });

    test("Lean Hog Index for 2/11/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190211.txt
        const record = index[6];
        expect(record.date).toEqual(new Date(2019, 1, 11));
        expect(record.dailyPrice).toBeCloseTo(55.78);
        expect(record.indexPrice).toBeCloseTo(55.91);
    });

    test("Lean Hog Index for 2/12/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190212.txt
        const record = index[7];
        expect(record.date).toEqual(new Date(2019, 1, 12));
        expect(record.dailyPrice).toBeCloseTo(55.32);
        expect(record.indexPrice).toBeCloseTo(55.55);
    });

    test("Lean Hog Index for 2/13/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190213.txt
        const record = index[8];
        expect(record.date).toEqual(new Date(2019, 1, 13));
        expect(record.dailyPrice).toBeCloseTo(55.16);
        expect(record.indexPrice).toBeCloseTo(55.24);
    });

    test("Lean Hog Index for 2/14/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190214.txt
        const record = index[9];
        expect(record.date).toEqual(new Date(2019, 1, 14));
        expect(record.dailyPrice).toBeCloseTo(54.89);
        expect(record.indexPrice).toBeCloseTo(55.02);
    });

    test("Lean Hog Index for 2/15/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190215.txt
        const record = index[10];
        expect(record.date).toEqual(new Date(2019, 1, 15));
        expect(record.dailyPrice).toBeCloseTo(54.64);
        expect(record.indexPrice).toBeCloseTo(54.74);
    });

    test("Lean Hog Index for 2/18/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190218.txt
        const record = index[11];
        expect(record.date).toEqual(new Date(2019, 1, 18));
        expect(record.dailyPrice).toBeCloseTo(54.08);
        expect(record.indexPrice).toBeCloseTo(54.43);
    });

    test("Lean Hog Index for 2/19/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190219.txt
        const record = index[12];
        expect(record.date).toEqual(new Date(2019, 1, 19));
        expect(record.dailyPrice).toBeCloseTo(54.19);
        expect(record.indexPrice).toBeCloseTo(54.13);
    });

    test("Lean Hog Index for 2/20/2019", () => {
        // https://www.cmegroup.com/ftp/cash_settled_commodity_index_prices/daily_data/lean_hogs/2019/LH190220.txt
        const record = index[13];
        expect(record.date).toEqual(new Date(2019, 1, 20));
        expect(record.dailyPrice).toBeCloseTo(53.93);
        expect(record.indexPrice).toBeCloseTo(54.06);
    });
});

describe("Map cash index values to data series", () => {
    const slaughter = parse(load<BarrowsGilts>("slaughter.json"));
    const cash = Array.from(CashIndex.from(slaughter));

    test("Cash Index series", () => {
        expect(CashIndex.index(cash).slice(-5)).toEqual([{
            date: new Date(2019, 1, 14),
            value: 55.02
        }, {
            date: new Date(2019, 1, 15),
            value: 54.74
        }, {
            date: new Date(2019, 1, 18),
            value: 54.43
        }, {
            date: new Date(2019, 1, 19),
            value: 54.13
        }, {
            date: new Date(2019, 1, 20),
            value: 54.06
        }]);
    });

    test("Daily value series", () => {
        expect(CashIndex.daily(cash).slice(-5)).toEqual([{
            date: new Date(2019, 1, 14),
            value: 54.89
        }, {
            date: new Date(2019, 1, 15),
            value: 54.64
        }, {
            date: new Date(2019, 1, 18),
            value: 54.08
        }, {
            date: new Date(2019, 1, 19),
            value: 54.19
        }, {
            date: new Date(2019, 1, 20),
            value: 53.93
        }]);
    });
});

describe("CashIndex ViewModel", () => {
    const slaughter = parse(load<BarrowsGilts>("slaughter.json"));
    const cash = Array.from(CashIndex.from(slaughter));
    const model = CashIndexViewModel.from(cash);

    test("Cash Index series", () => {
        expect(model.series.slice(-5)).toEqual([{
            date: new Date(2019, 1, 14),
            value: 55.02
        }, {
            date: new Date(2019, 1, 15),
            value: 54.74
        }, {
            date: new Date(2019, 1, 18),
            value: 54.43
        }, {
            date: new Date(2019, 1, 19),
            value: 54.13
        }, {
            date: new Date(2019, 1, 20),
            value: 54.06
        }]);
    });

    test("Extents for series dates and values", () => {
        expect(model.dates).toEqual([new Date(2019, 1, 1), new Date(2019, 1, 20)]);
        expect(model.values).toEqual([54.06, 57.41]);
    });

    test("Selected date and formatted stats", () => {
        expect(model.selected).toEqual({
            date: new Date(2019, 1, 20),
            value: 54.06
        });

        expect(model.stats).toEqual({
            label: "Cash Index",
            value: "54.06"
        });
    });
});

describe("Cash Index Interactor", () => {
    const slaughter = parse(load<BarrowsGilts>("slaughter.json"));
    const cash = Array.from(CashIndex.from(slaughter));
    const interactor = new CashIndexInteractor(cash);

    test("series and scales", () => {
        expect(interactor.series.length).toEqual(14);

        expect(interactor.dates).toEqual([
            new Date(2019, 1, 1),
            new Date(2019, 1, 20)
        ]);

        expect(interactor.values).toEqual([54.06, 57.41]);
    });

    test("select a date", async () => {
        const iterator = iterate(interactor.selected);
        const next = iterator.next();

        interactor.selectDate(new Date(2019, 1, 14));
        const { value: selected } = await next;

        expect(selected).toEqual({
            date: new Date(2019, 1, 14),
            value: 55.02
        });
    });

    test("reset selected date", async () => {
        const stats = collect(interactor.stats);
        const selected = collect(interactor.selected);

        interactor.selectDate(new Date(2019, 1, 14));
        await tick();

        interactor.resetDate();
        await tick();

        expect(selected()).toEqual([{
            date: new Date(2019, 1, 14),
            value: 55.02
        }, {
            date: new Date(2019, 1, 20),
            value: 54.06
        }]);

        expect(stats()).toEqual([{
            label: "Cash Index",
            value: "55.02"
        }, {
            label: "Cash Index",
            value: "54.06"
        }]);
    });
});
