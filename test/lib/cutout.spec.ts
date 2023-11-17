import { describe, expect, test } from "vitest";
import parse from "lib/cutout/mpr";
import type { ValuesResponse, VolumeResponse } from "lib/cutout/mpr";
import CutoutIndex from "lib/cutout/CutoutIndex";
import CutoutViewModel from "lib/cutout/CutoutViewModel";
import CutoutInteractor from "lib/cutout/CutoutInteractor";
import Primal from "lib/cutout/Primal";
import PrimalViewModel from "lib/cutout/PrimalViewModel";
import PrimalInteractor from "lib/cutout/PrimalInteractor";
import load from "./resources";
import { tick, collect } from ".";

test("Parse primal cutout values and volume response from MPR endpoint", () => {
    const [values, volume] = load<[ValuesResponse, VolumeResponse]>("cutout.json");
    const cutout = Array.from(parse(volume, values));
    expect(cutout.length).toBe(14);

    const record = cutout[0];
    expect(record.reportDate).toEqual(new Date(2020, 3, 20));
    expect(record.primalLoads).toBeCloseTo(282.6);
    expect(record.trimmingLoads).toBeCloseTo(62.93);
    expect(record.carcassPrice).toBeCloseTo(66.68);
    expect(record.bellyPrice).toBeCloseTo(81.32);
    expect(record.buttPrice).toBeCloseTo(66.75);
    expect(record.hamPrice).toBeCloseTo(40.83);
    expect(record.loinPrice).toBeCloseTo(94.94);
    expect(record.picnicPrice).toBeCloseTo(41.57);
    expect(record.ribPrice).toBeCloseTo(111.59);
});

describe("Calculate the CME Cutout Index", () => {
    const [values, volume] = load<[ValuesResponse, VolumeResponse]>("cutout.json");
    const cutout = Array.from(CutoutIndex.from(parse(volume, values)));

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

describe("Map cutout index values to data series", () => {
    const [values, volume] = load<[ValuesResponse, VolumeResponse]>("cutout.json");
    const cutout = Array.from(CutoutIndex.from(parse(volume, values)));

    test("Cutout index series", () => {
        expect(CutoutIndex.index(cutout).slice(-5)).toEqual([{
            date:new Date(2020, 3, 14),
            value: 52.26
        }, {
            date:new Date(2020, 3, 15),
            value: 52.42
        }, {
            date:new Date(2020, 3, 16),
            value: 53.31
        }, {
            date:new Date(2020, 3, 17),
            value: 54.68
        }, {
            date:new Date(2020, 3, 20),
            value: 57.11
        }]);
    });

    test("Daily value series", () => {
        expect(CutoutIndex.daily(cutout).slice(-5)).toEqual([{
            date:new Date(2020, 3, 14),
            value: 53.07
        }, {
            date:new Date(2020, 3, 15),
            value: 52.10
        }, {
            date:new Date(2020, 3, 16),
            value: 55.86
        }, {
            date:new Date(2020, 3, 17),
            value: 60.13
        }, {
            date:new Date(2020, 3, 20),
            value: 66.68
        }]);
    });
});

describe("Cutout ViewModel", () => {
    const [values, volume] = load<[ValuesResponse, VolumeResponse]>("cutout.json");
    const cutout = Array.from(CutoutIndex.from(parse(volume, values)));
    const model = CutoutViewModel.from(cutout);

    test("Cutout Index series", () => {
        expect(model.index.slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 52.26
        }, {
            date: new Date(2020, 3, 15),
            value: 52.42
        }, {
            date: new Date(2020, 3, 16),
            value: 53.31
        }, {
            date: new Date(2020, 3, 17),
            value: 54.68
        }, {
            date: new Date(2020, 3, 20),
            value: 57.11
        }]);
    });

    test("Cutout series", () => {
        expect(model.cutout.slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 53.07
        }, {
            date: new Date(2020, 3, 15),
            value: 52.10
        }, {
            date: new Date(2020, 3, 16),
            value: 55.86
        }, {
            date: new Date(2020, 3, 17),
            value: 60.13
        }, {
            date: new Date(2020, 3, 20),
            value: 66.68
        }]);
    });

    test("Extents for series dates and values", () => {
        expect(model.dates).toEqual([new Date(2020, 3, 7), new Date(2020, 3, 20)]);
        expect(model.values).toEqual([51.07, 66.68]);
    });

    test("Selected date and formatted stats", () => {
        expect(model.selected).toEqual({
            date: new Date(2020, 3, 20),
            value: 66.68
        });

        expect(model.stats).toEqual([{
            label: "Cutout",
            value: "66.68"
        }, {
            label: "Index",
            value: "57.11"
        }]);
    });
});

describe("Cutout Interactor", () => {
    const [values, volume] = load<[ValuesResponse, VolumeResponse]>("cutout.json");
    const cutout = Array.from(CutoutIndex.from(parse(volume, values)));

    test("select a date", async () => {
        const interactor = new CutoutInteractor(cutout);
        const next = interactor.next();
        interactor.selectDate(new Date(2020, 3, 14));
        const { value: model } = await next;

        expect(model.selected).toEqual({
            date: new Date(2020, 3, 14),
            value: 53.07
        });
    });

    test("reset selected date", async () => {
        const interactor = new CutoutInteractor(cutout);
        const collectStates = collect(interactor);

        interactor.selectDate(new Date(2020, 3, 17));
        await tick();

        interactor.resetDate();
        await tick();

        interactor.close();
        const states = await collectStates;

        expect(states.map(state => state.selected)).toEqual([{
            date: new Date(2020, 3, 20),
            value: 66.68
        }, {
            date: new Date(2020, 3, 17),
            value: 60.13
        }, {
            date: new Date(2020, 3, 20),
            value: 66.68
        }]);

        expect(states.map(state => state.stats)).toEqual([[{
            label: "Cutout",
            value: "66.68"
        }, {
            label: "Index",
            value: "57.11"
        }], [{
            label: "Cutout",
            value: "60.13"
        }, {
            label: "Index",
            value: "54.68"
        }], [{
            label: "Cutout",
            value: "66.68"
        }, {
            label: "Index",
            value: "57.11"
        }]]);
    });
});

describe("Map cutout primal values to data series", () => {
    const [values, volume] = load<[ValuesResponse, VolumeResponse]>("cutout.json");
    const cutout = Array.from(parse(volume, values));

    test("Belly series", () => {
        expect(Primal.belly(cutout).slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 47.77
        }, {
            date: new Date(2020, 3, 15),
            value: 42.75
        }, {
            date: new Date(2020, 3, 16),
            value: 52.63
        }, {
            date: new Date(2020, 3, 17),
            value: 59.01
        }, {
            date: new Date(2020, 3, 20),
            value: 81.32
        }]);
    });

    test("Ham series", () => {
        expect(Primal.ham(cutout).slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 33.69
        }, {
            date: new Date(2020, 3, 15),
            value: 35.55
        }, {
            date: new Date(2020, 3, 16),
            value: 33.90
        }, {
            date: new Date(2020, 3, 17),
            value: 38.71
        }, {
            date: new Date(2020, 3, 20),
            value: 40.83
        }]);
    });

    test("Loin series", () => {
        expect(Primal.loin(cutout).slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 84.14
        }, {
            date: new Date(2020, 3, 15),
            value: 80.11
        }, {
            date: new Date(2020, 3, 16),
            value: 88.60
        }, {
            date: new Date(2020, 3, 17),
            value: 91.98
        }, {
            date: new Date(2020, 3, 20),
            value: 94.94
        }]);
    });

    test("Butt series", () => {
        expect(Primal.butt(cutout).slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 54.58
        }, {
            date: new Date(2020, 3, 15),
            value: 53.61
        }, {
            date: new Date(2020, 3, 16),
            value: 55.78
        }, {
            date: new Date(2020, 3, 17),
            value: 61.84
        }, {
            date: new Date(2020, 3, 20),
            value: 66.75
        }]);
    });

    test("Rib series", () => {
        expect(Primal.rib(cutout).slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 94.07
        }, {
            date: new Date(2020, 3, 15),
            value: 98.07
        }, {
            date: new Date(2020, 3, 16),
            value: 101.38
        }, {
            date: new Date(2020, 3, 17),
            value: 107.43
        }, {
            date: new Date(2020, 3, 20),
            value: 111.59
        }]);
    });

    test("Picnic series", () => {
        expect(Primal.picnic(cutout).slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 29.86
        }, {
            date: new Date(2020, 3, 15),
            value: 32.24
        }, {
            date: new Date(2020, 3, 16),
            value: 34.14
        }, {
            date: new Date(2020, 3, 17),
            value: 34.32
        }, {
            date: new Date(2020, 3, 20),
            value: 41.57
        }]);
    });
});

describe("Primal ViewModel", () => {
    const [values, volume] = load<[ValuesResponse, VolumeResponse]>("cutout.json");
    const cutout = Array.from(parse(volume, values)).slice(0, 10);
    const model = PrimalViewModel.from(cutout);

    test("Get active series", () => {
        expect(model.series.slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 47.77
        }, {
            date: new Date(2020, 3, 15),
            value: 42.75
        }, {
            date: new Date(2020, 3, 16),
            value: 52.63
        }, {
            date: new Date(2020, 3, 17),
            value: 59.01
        }, {
            date: new Date(2020, 3, 20),
            value: 81.32
        }]);
    });

    test("Selected date and formatted stats", () => {
        expect(model.selected).toEqual({
            date: new Date(2020, 3, 20),
            value: 81.32
        });

        expect(model.stats).toEqual([{
            label: "Belly",
            value: "81.32",
            selected: true
        }, {
            label: "Ham",
            value: "40.83",
            selected: false
        }, {
            label: "Loin",
            value: "94.94",
            selected: false
        }, {
            label: "Butt",
            value: "66.75",
            selected: false
        }, {
            label: "Rib",
            value: "111.59",
            selected: false
        }, {
            label: "Picnic",
            value: "41.57",
            selected: false
        }]);
    });

    test("Extents for series dates and values", () => {
        expect(model.dates).toEqual([new Date(2020, 3, 7), new Date(2020, 3, 20)]);
        expect(model.values).toEqual([31.84, 81.32]);
    });
});

describe("Primal interactor", () => {
    const [values, volume] = load<[ValuesResponse, VolumeResponse]>("cutout.json");
    const cutout = Array.from(parse(volume, values));

    test("select a primal", async () => {
        const interactor = new PrimalInteractor(cutout);
        const next = interactor.next();
        interactor.selectPrimal(Primal.Ham);
        const { value: model } = await next;

        expect(model.series.slice(-5)).toEqual([{
            date: new Date(2020, 3, 14),
            value: 33.69
        }, {
            date: new Date(2020, 3, 15),
            value: 35.55
        }, {
            date: new Date(2020, 3, 16),
            value: 33.90
        }, {
            date: new Date(2020, 3, 17),
            value: 38.71
        }, {
            date: new Date(2020, 3, 20),
            value: 40.83
        }]);

        expect(model.selected).toEqual({
            date: new Date(2020, 3, 20),
            value: 40.83
        });
    });

    test("select a date", async () => {
        const interactor = new PrimalInteractor(cutout);
        const next = interactor.next();
        interactor.selectDate(new Date(2020, 3, 14));
        const { value: model } = await next;

        expect(model.selected).toEqual({
            date: new Date(2020, 3, 14),
            value: 47.77
        });
    });

    test("select primals", async () => {
        const interactor = new PrimalInteractor(cutout);
        const collectStates = collect(interactor);

        interactor.selectPrimal(Primal.Ham);
        await tick();

        interactor.selectPrimal(Primal.Loin);
        await tick();

        interactor.selectPrimal(Primal.Butt);
        await tick();

        interactor.selectPrimal(Primal.Rib);
        await tick();

        interactor.selectPrimal(Primal.Picnic);
        await tick();

        interactor.selectPrimal(Primal.Belly);
        await tick();

        interactor.close();
        const states = await collectStates;

        expect(states.map(state => state.selected)).toEqual([{
            date: new Date(2020, 3, 20),
            value: 81.32
        }, {
            date: new Date(2020, 3, 20),
            value: 40.83
        }, {
            date: new Date(2020, 3, 20),
            value: 94.94
        }, {
            date: new Date(2020, 3, 20),
            value: 66.75
        }, {
            date: new Date(2020, 3, 20),
            value: 111.59
        }, {
            date: new Date(2020, 3, 20),
            value: 41.57
        }, {
            date: new Date(2020, 3, 20),
            value: 81.32
        }]);
    });

    test("reset selected date", async () => {
        const interactor = new PrimalInteractor(cutout);
        const collector = collect(interactor);

        interactor.selectDate(new Date(2020, 3, 17));
        await tick();

        interactor.resetDate();
        await tick();

        interactor.close();
        const states = await collector;

        expect(states.map(state => state.selected)).toEqual([{
            date: new Date(2020, 3, 20),
            value: 81.32
        }, {
            date: new Date(2020, 3, 17),
            value: 59.01
        }, {
            date: new Date(2020, 3, 20),
            value: 81.32
        }]);
    });
});
