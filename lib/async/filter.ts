import type { Predicate } from "..";
import { iterate } from ".";

async function* filterElementsAsync<T>(iterator: AsyncIterator<T>, predicate: Predicate<T>): AsyncIterator<T> {
    try {
        let result = await iterator.next();

        while (!result.done) {
            const value = result.value;
            if (predicate(value)) yield value;
            result = await iterator.next();
        }
    } finally {
        await iterator.return?.();
    }
}

class FilteredAsyncIterable<T> implements AsyncIterable<T> {
    public constructor(
        private readonly iterable: AsyncIterable<T>,
        private readonly predicate: Predicate<T>) {}

    public [Symbol.asyncIterator] = (): AsyncIterator<T> =>
        filterElementsAsync(iterate(this.iterable), this.predicate);
}

const filter = <T>(iterable: AsyncIterable<T>, predicate: Predicate<T>): AsyncIterable<T> =>
    new FilteredAsyncIterable(iterable, predicate);

export default filter;
