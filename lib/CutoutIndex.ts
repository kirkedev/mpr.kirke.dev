import { round } from ".";
import Observation from "./Observation";
import { sumBy } from "./itertools/accumulate";
import { map } from "./itertools/map";
import rolling from "./itertools/rolling";
import type Cutout from "./cutout";

interface CutoutIndex extends Observation {
    indexPrice: number;
    carcassPrice: number;
    loads: number;
}

const totalLoads = (records: Cutout[]): number =>
    sumBy(records, record => record.primalLoads + record.trimmingLoads);

const totalValue = (records: Cutout[]): number =>
    sumBy(records, record => record.carcassPrice * (record.primalLoads + record.trimmingLoads));

const avgPrice = (records: Cutout[]): number =>
    round(totalValue(records) / totalLoads(records));

const cutoutIndex = (cutout: Iterable<Cutout>): Iterable<CutoutIndex> =>
    map(rolling(Observation.sort(Array.from(cutout)), 5), function(records) {
        const { date, primalLoads, trimmingLoads, carcassPrice } = records[records.length - 1];

        return {
            date,
            carcassPrice,
            indexPrice: avgPrice(records),
            loads: round(primalLoads + trimmingLoads)
        };
    });

export default cutoutIndex;

export type { CutoutIndex };
