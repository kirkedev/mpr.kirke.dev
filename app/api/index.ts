import { derived, get, type Readable, writable } from "svelte/store";
import Week from "lib/Week";
import Period from "lib/Period";
import type Cutout from "lib/cutout";
import type Purchase from "lib/purchases";
import type Slaughter from "lib/slaughter";
import cutout from "./cutout";
import slaughter from "./slaughter";
import purchases from "./purchases";

export interface Resources {
    cutout: Cutout[];
    slaughter: Slaughter[];
    purchases: Purchase[];
}

interface ApiStore extends Readable<Promise<Resources>> {
    period: Period;
    fetch(period: Period): void;
}

const period = writable(Period.ThreeMonths);

const { subscribe } = derived(period, function(period) {
    const { start } = Week.with(period.start).previous;
    const { end } = period;

    return Promise.all([
        cutout.query(start, end),
        slaughter.query(start, end),
        purchases.query(start, end)
    ]).then(([cutout, slaughter, purchases]) => ({
        cutout,
        slaughter,
        purchases
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
