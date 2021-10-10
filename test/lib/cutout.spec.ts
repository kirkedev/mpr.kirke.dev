import type { PrimalsResponse, VolumeResponse } from "@ams/lib/cutout/mpr";
import parse from "@ams/lib/cutout/parse";
import load from "./resources";

test("parse cutout records for a single day", () => {
    const volume = load<VolumeResponse>("volume.json");
    const primals = load<PrimalsResponse>("primals.json");
    const [cutout] = Array.from(parse(volume, primals));

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
