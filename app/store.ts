import type Interactor from "lib/Interactor";
import { type Readable, writable } from "svelte/store";

function store<T>(interactor: Interactor<T>): Readable<T> {
    const { set, subscribe } = writable<T>(interactor.state);

    (async function() {
        for await (const state of interactor) {
            set(state);
        }
    })();

    return { subscribe };
}

export default store;
