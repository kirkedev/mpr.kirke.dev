import { test, expect } from "vitest";
import type { ValuesResponse, VolumeResponse } from "lib/cutout/mpr";
import parse from "lib/cutout/parse";
import load from "./resources";

test("Parse daily cutout records", () => {
    const volume = load<VolumeResponse>("volume.json");
    const values = load<ValuesResponse>("cutout.json");
    const [record] = Array.from(parse(volume, values));

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
