import type { ValuesResponse, VolumeResponse } from "@ams/lib/cutout/mpr";
import Cutout from "@ams/lib/cutout";
import parse from "@ams/lib/cutout/parse";
import serialize from "@ams/lib/cutout/serialize";
import load from "./resources";

describe("Parse daily cutout records", () => {
    const volume = load<VolumeResponse>("volume.json");
    const values = load<ValuesResponse>("cutout.json");
    const cutout = Array.from(parse(volume, values));
    const serialized = serialize(cutout);

    test("parse cutout records for a single day", () => {
        const [record] = cutout;
        expect(record.date).toEqual(new Date(2020, 3, 9));
        expect(record.reportDate).toEqual(new Date(2020, 3, 9));
        expect(record.primalLoads).toBeCloseTo(359.80);
        expect(record.trimmingLoads).toBeCloseTo(75.41);
        expect(record.carcassPrice).toBeCloseTo(51.07);
        expect(record.bellyPrice).toBeCloseTo(31.84);
        expect(record.buttPrice).toBeCloseTo(48.39);
        expect(record.hamPrice).toBeCloseTo(34.98);
        expect(record.loinPrice).toBeCloseTo(88.58);
        expect(record.picnicPrice).toBeCloseTo(27.33);
        expect(record.ribPrice).toBeCloseTo(95.49);
    });

    test("serialize cutout records", () => {
        const [record] = serialized;
        expect(record.date).toBe("2020-04-09");
        expect(record.reportDate).toBe("2020-04-09");
        expect(Cutout.parse(serialized)).toEqual(cutout);
    });
});
