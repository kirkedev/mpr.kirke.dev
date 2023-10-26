import { derived, writable, type Readable } from "svelte/store";
import Result from "lib/Result";
import cutoutIndex from "lib/CutoutIndex";
import { dropWhile } from "lib/itertools/drop";
import map from "lib/itertools/map";
import type { Resources } from "../api";
import { formatNumber, getObservation, today } from "../api/lib";
import type { Series } from "../ui/LineChart";

interface Stat {
    label: string;
    value: string;
}

interface DataSeries {
    cutout: Series;
    index: Series;
}

export interface CutoutViewModel extends DataSeries {
    date: Date;
    stats: Stat[];
}

interface CutoutStore extends Readable<Result<CutoutViewModel>> {
    select: (date: Date) => void;
}

function store(api: Readable<Result<Resources>>): CutoutStore {
    const date = writable(today);

    const series = derived(api, result =>
        Result.map(result, data => {
            const start = data.period.from(today);
            const records = dropWhile(cutoutIndex(data.cutout), record => record.date < start);

            const index = Array.from(map(records, ({ date, indexPrice: value }) => ({
                date, value
            })));

            const cutout = Array.from(map(records, ({ date, carcassPrice: value }) => ({
                date, value
            })));

            return { cutout, index };
        }));

    const { subscribe } = derived([series, date], ([result, date]) =>
        Result.map(result, ({ cutout, index }) => ({
            date,
            cutout,
            index,
            stats: [{
                label: "Cutout",
                value: formatNumber(getObservation(cutout, date).value)
            }, {
                label: "Index",
                value: formatNumber(getObservation(index, date).value)
            }]
        })));

    return {
        subscribe,
        select: (selected: Date) => date.set(selected)
    };
}

export default store;
