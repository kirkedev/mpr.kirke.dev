import { writable, type Readable } from "svelte/store";
import Week from "lib/Week";
import type Period from "lib/Period";
import type Cutout from "lib/cutout";
import type Purchase from "lib/purchases";
import type Slaughter from "lib/slaughter";
import cutout from "./cutout";
import slaughter from "./slaughter";
import purchases from "./purchases";

interface Resources {
    cutout: Cutout[];
    slaughter: Slaughter[];
    purchases: Purchase[];
}

interface ApiStore extends Readable<Promise<Resources>> {
    fetch(period: Period): void;
}

const today = import.meta.env.PROD ? new Date() : new Date(2021, 11, 23);

const { subscribe, set } = writable<Promise<Resources>>();

const store: ApiStore = {
    subscribe,
    fetch(period: Period) {
        const { start } = Week.with(period.from(today)).previous;

        const request = Promise.all([
            cutout.query(start, today),
            slaughter.query(start, today),
            purchases.query(start, today)
        ]).then(([cutout, slaughter, purchases]) => ({
            cutout,
            slaughter,
            purchases
        }));

        set(request);
    }
};

export default store;
