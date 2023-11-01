import { derived, get, type Readable, writable } from "svelte/store";
import Week from "lib/Week";
import Period from "lib/Period";
import type Cutout from "lib/cutout";
import type Purchase from "lib/purchases";
import cutout from "./cutout";
import slaughter from "./slaughter";
import purchases from "./purchases";
import CutoutIndex from "lib/cutout/CutoutIndex";
import CashIndex from "lib/slaughter/CashIndex";
import { dropWhile } from "lib/itertools/drop";

export interface Resources {
    cashIndex: Iterable<CashIndex>;
    cutoutIndex: Iterable<CutoutIndex>;
    purchases: Iterable<Purchase>;
    primals: Iterable<Cutout>;
}

interface ApiStore extends Readable<Promise<Resources>> {
    period: Period;
    fetch(period: Period): void;
}

const period = writable(Period.ThreeMonths);

const { subscribe } = derived(period, function(period): Promise<Resources> {
    const { start } = Week.with(period.start).previous;
    const { end } = period;

    return Promise.all([
        cutout.query(start, end),
        slaughter.query(start, end),
        purchases.query(start, end)
    ]).then(([cutout, slaughter, purchases]) => ({
        cashIndex: dropWhile(CashIndex.from(slaughter), record => record.date < period.start),
        cutoutIndex: dropWhile(CutoutIndex.from(cutout), record => record.date < period.start),
        purchases: dropWhile(purchases, record => record.date < period.start),
        primals: dropWhile(cutout, record => record.date < period.start)
    }));
});

const store: ApiStore = {
    subscribe,
    fetch: period.set,
    get period(): Period {
        return get(period);
    }
};

export default store;
