import { type Accumulator, iterate } from ".";

async function* accumulate<T, R>(iterable: AsyncIterable<T>, accumulator: Accumulator<T, R>, value: R): AsyncIterator<R> {
    const iterator = iterate(iterable);

    try {
        let result = await iterator.next();

        while (!result.done) {
            yield value = await accumulator(value, result.value);
            result = await iterator.next();
        }
    } finally {
        await iterator.return?.();
    }
}

export default accumulate;
