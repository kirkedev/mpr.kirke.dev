import type Interactor from "lib/Interactor";
import { type Readable, writable } from "svelte/store";

function store<T>(interactor: Interactor<T>): Readable<T> {
    const { set, subscribe } = writable<T>(interactor.state);
    interactor.each(set);
    return { subscribe };
}

export default store;
