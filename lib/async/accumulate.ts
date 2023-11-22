import type { Callback, UnaryOperator } from "..";
import { iterate } from ".";
import ObservableState from "./ObservableState";

function each<T>(iterable: AsyncIterable<T>, callback: Callback<T>): Callback<void> {
    const iterator = iterate(iterable);

    if (iterable instanceof ObservableState) {
        callback(iterable.state);
    }

    (async function() {
        let result = await iterator.next();

        while (!result.done) {
            callback(result.value);
            result = await iterator.next();
        }
    })();

    return () => {
        iterator.return?.();
    };
}

function collect<T>(iterable: AsyncIterable<T>): UnaryOperator<void, Array<T>> {
    const iterator = iterate(iterable);
    const results = new Array<T>();

    if (iterable instanceof ObservableState) {
        results.push(iterable.state);
    }

    (async function() {
        let result = await iterator.next();

        while (!result.done) {
            results.push(result.value);
            result = await iterator.next();
        }
    })();

    return (): Array<T> => {
        iterator.return?.();
        return results;
    };
}

export { each, collect };
