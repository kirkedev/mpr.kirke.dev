import { derived, type Readable, writable } from "svelte/store";
import type Cutout from "lib/cutout";
import cutoutIndex from "lib/CutoutIndex";
import map from "lib/itertools/map";
import { dropWhile } from "lib/itertools/drop";
import { formatNumber, getObservation } from "../api/lib";
import type { Series } from "../ui/LineChart";
import api from "../api";

interface Stat {
    label: string;
    value: string;
}

interface CutoutViewModel {
    date: Date;
    stats: Stat[];
    cutout: Series;
    index: Series;
}

interface CutoutStore extends Readable<CutoutViewModel> {
    selectDate: (date: Date) => void;
    resetDate: () => void;
}

function store(response: Cutout[]): CutoutStore {
    const { start, end } = api.period;
    const date = writable(end);
    const records = dropWhile(cutoutIndex(response), record => record.date < start);

    const index = Array.from(map(records, ({ date, indexPrice: value }) => ({
        date, value
    })));

    const cutout = Array.from(map(records, ({ date, carcassPrice: value }) => ({
        date, value
    })));

    const { subscribe } = derived(date, date => ({
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
    }));

    return {
        subscribe,
        selectDate: (selected: Date) => date.set(selected),
        resetDate: () => date.set(api.period.end)
    };
}

export default store;

export type { CutoutViewModel, CutoutStore };
