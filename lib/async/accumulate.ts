import type { Callback, UnaryOperator } from "..";
import { iterate, type Accumulator } from ".";

function each<T>(iterable: AsyncIterable<T>, callback: Callback<T>): UnaryOperator<void, Promise<void>> {
    const iterator = iterate(iterable);

    (async function() {
        let result = await iterator.next();

        while (!result.done) {
            callback(result.value);
            result = await iterator.next();
        }
    })();

    return async () => {
        await iterator.return?.();
    };
}

function collect<T>(iterable: AsyncIterable<T>): UnaryOperator<void, Array<T>> {
    const iterator = iterate(iterable);
    const results = new Array<T>();

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

async function* accumulate<T, R>(iterable: AsyncIterable<T>, accumulator: Accumulator<T, R>, value: R): AsyncIterable<R> {
    const iterator = iterate(iterable);

    try {
        let result = await iterator.next();

        while (!result.done) {
            yield value = await accumulator(value, result.value);
            result = await iterator.next();
        }
    } finally {
        iterator.return?.();
    }
}

export { each, collect, accumulate };
