import { round } from ".";
import Observation from "./Observation";
import { sumBy } from "./itertools/accumulate";
import { map } from "./itertools/map";
import rolling from "./itertools/rolling";
import type Cutout from "./cutout";

interface CutoutIndex extends Cutout {
    indexPrice: number;
}

const totalLoads = (records: Cutout[]): number =>
    sumBy(records, record => record.primalLoads + record.trimmingLoads);

const totalValue = (records: Cutout[]): number =>
    sumBy(records, record => record.carcassPrice * (record.primalLoads + record.trimmingLoads));

const avgPrice = (records: Cutout[]): number =>
    round(totalValue(records) / totalLoads(records));

const cutoutIndex = (cutout: Iterable<Cutout>): Iterable<CutoutIndex> =>
    map(rolling(Observation.sort(Array.from(cutout)), 5), records =>
        Object.assign({ indexPrice: avgPrice(records) }, records[records.length - 1]));

export default cutoutIndex;

export type { CutoutIndex };
