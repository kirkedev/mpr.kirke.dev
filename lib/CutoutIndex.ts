import { round } from ".";
import Observation from "./Observation";
import { sumBy } from "./itertools/accumulate";
import map from "./itertools/map";
import rolling from "./itertools/rolling";
import type Cutout from "./cutout";

interface CutoutIndex extends Observation {
    indexPrice: number;
    carcassPrice: number;
    loads: number;
}

const totalLoads = (record: Cutout): number =>
    record.primalLoads + record.trimmingLoads;

const totalValue = (record: Cutout): number =>
    record.carcassPrice * totalLoads(record);

const avgPrice = (records: Cutout[]): number =>
    sumBy(records, totalValue) / sumBy(records, totalLoads);

const cutoutIndex = (cutout: Iterable<Cutout>): Iterable<CutoutIndex> =>
    map(rolling(Observation.sort(Array.from(cutout)), 5), function(records) {
        const record = records[records.length - 1];

        return {
            date: record.date,
            carcassPrice: record.carcassPrice,
            indexPrice: round(avgPrice(records)),
            loads: round(totalLoads(record))
        };
    });

export default cutoutIndex;

export type { CutoutIndex };
