import cutoutIndex from "@ams/lib/CutoutIndex";
import parseCutout from "@ams/lib/cutout/parse";
import type { PrimalsResponse, VolumeResponse } from "@ams/lib/cutout/mpr";
import load from "./resources";

describe("Calculate the CME Cutout Index", () => {
    const [primals, volume] = load<[PrimalsResponse, VolumeResponse]>("cutout_index.json");
    const cutout = Array.from(cutoutIndex(parseCutout(volume, primals)));

    test("Cutout Index for 4/7/2020", () => {
        const record = cutout[0];
        expect(record.date).toEqual(new Date(2020, 3, 7));
        expect(record.indexPrice).toBeCloseTo(57.91);
    });

    test("Cutout Index for 4/8/2020", () => {
        const record = cutout[1];
        expect(record.date).toEqual(new Date(2020, 3, 8));
        expect(record.indexPrice).toBeCloseTo(55.82);
    });

    test("Cutout Index for 4/9/2020", () => {
        const record = cutout[2];
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.indexPrice).toBeCloseTo(54.30);
    });

    test("Cutout Index for 4/10/2020", () => {
        const record = cutout[3];
        expect(record.date).toEqual(new Date(2020, 3, 10));
        expect(record.indexPrice).toBeCloseTo(53.47);
    });

    test("Cutout Index for 4/13/2020", () => {
        const record = cutout[4];
        expect(record.date).toEqual(new Date(2020, 3, 13));
        expect(record.indexPrice).toBeCloseTo(52.57);
    });

    test("Cutout Index for 4/14/2020", () => {
        const record = cutout[5];
        expect(record.date).toEqual(new Date(2020, 3, 14));
        expect(record.indexPrice).toBeCloseTo(52.26);
    });

    test("Cutout Index for 4/15/2020", () => {
        const record = cutout[6];
        expect(record.date).toEqual(new Date(2020, 3, 15));
        expect(record.indexPrice).toBeCloseTo(52.42);
    });

    test("Cutout Index for 4/16/2020", () => {
        const record = cutout[7];
        expect(record.date).toEqual(new Date(2020, 3, 16));
        expect(record.indexPrice).toBeCloseTo(53.31);
    });

    test("Cutout Index for 4/17/2020", () => {
        const record = cutout[8];
        expect(record.date).toEqual(new Date(2020, 3, 17));
        expect(record.indexPrice).toBeCloseTo(54.68);
    });

    test("Cutout Index for 4/20/2020", () => {
        const record = cutout[9];
        expect(record.date).toEqual(new Date(2020, 3, 20));
        expect(record.indexPrice).toBeCloseTo(57.11);
    });
});
