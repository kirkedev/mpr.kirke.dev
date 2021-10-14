import type { SalesResponse } from "lib/sales/mpr";
import parse, { Cut } from "lib/sales/parse";
import load from "./resources";

describe("parse daily meat sales", () => {
    const records = Array.from(parse(load<SalesResponse>("sales.json")));

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
    const records = Array.from(parse(load<SalesResponse>("weekly_sales.json")));

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
