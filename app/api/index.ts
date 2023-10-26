import { writable, type Readable } from "svelte/store";
import Week from "lib/Week";
import Result from "lib/Result";
import type Period from "lib/Period";
import type Cutout from "lib/cutout";
import type Purchase from "lib/purchases";
import type Slaughter from "lib/slaughter";
import cutout from "./cutout";
import slaughter from "./slaughter";
import purchases from "./purchases";
import { today } from "./lib";

export interface Resources {
    period: Period;
    cutout: Cutout[];
    slaughter: Slaughter[];
    purchases: Purchase[];
}

interface ApiStore extends Readable<Result<Resources>> {
    fetch(period: Period): void;
}

const { subscribe, set } = writable<Result<Resources>>();

const store: ApiStore = {
    subscribe,
    fetch(period: Period) {
        const { start } = Week.with(period.from(today)).previous;

        set(Result.Loading());

        Promise.all([
            cutout.query(start, today),
            slaughter.query(start, today),
            purchases.query(start, today)
        ]).then(([cutout, slaughter, purchases]) =>
            set(Result.Success({ period, cutout, slaughter, purchases }))
        ).catch(error =>
            set(Result.Failure(error)));
    }
};

export default store;
