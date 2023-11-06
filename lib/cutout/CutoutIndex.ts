import { round } from "..";
import Series, { type Observation } from "../time/Series";
import { sumBy } from "../itertools/accumulate";
import map from "../itertools/map";
import rolling from "../itertools/rolling";
import type Cutout from ".";

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
    map(rolling(Series.sort(Array.from(cutout)), 5), function(records) {
        const record = records[records.length - 1];

        return {
            date: record.date,
            carcassPrice: record.carcassPrice,
            indexPrice: round(avgPrice(records)),
            loads: round(totalLoads(record))
        };
    });

namespace CutoutIndex {
    export const from = cutoutIndex;

    export const index = (cutout: Iterable<CutoutIndex>): Series =>
        Array.from(map(cutout, ({ date, indexPrice: value }) => ({
            date, value
        })));

    export const daily = (cutout: Iterable<CutoutIndex>): Series =>
        Array.from(map(cutout, ({ date, carcassPrice: value }) => ({
            date, value
        })));
}

export default CutoutIndex;
