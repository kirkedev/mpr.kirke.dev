import type { Callback } from "lib";
import type ObservableState from "lib/async/ObservableState";

const tick = (): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, 0));

function get<T>(interactor: ObservableState<T>): T {
    let value: T;
    const unsubscribe = interactor.subscribe(result => value = result);
    unsubscribe();
    return value as T;
}

const collect = <T>(interactor: ObservableState<T>): [T[], Callback<void>] => {
    const states = new Array<T>();
    const close = interactor.subscribe(value => states.push(value));
    return [states, close];
};

export { tick, collect, get };
