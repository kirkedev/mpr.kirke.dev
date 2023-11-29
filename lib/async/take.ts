import { invert, type Predicate } from "..";
import { iterate } from ".";
import enumerate from "./enumerate";
import map from "./map";

async function* takeElementsAsync<T>(iterator: AsyncIterator<T>, predicate: Predicate<T>): AsyncIterator<T> {
    try {
        let { done, value } = await iterator.next();

        while (!done && predicate(value)) {
            yield value;

            const result = await iterator.next();
            done = result.done;
            value = result.value;
        }
    } finally {
        await iterator.return?.();
    }
}

class TakeFromAsyncIterable<T> implements AsyncIterable<T> {
    public constructor(
        private readonly iterable: AsyncIterable<T>,
        private readonly predicate: Predicate<T>) {}

    public [Symbol.asyncIterator] = (): AsyncIterator<T> =>
        takeElementsAsync(iterate(this.iterable), this.predicate);
}

const takeUntil = <T>(iterable: AsyncIterable<T>, predicate: Predicate<T>): AsyncIterable<T> =>
    new TakeFromAsyncIterable(iterable, invert(predicate));

const takeWhile = <T>(iterable: AsyncIterable<T>, predicate: Predicate<T>): AsyncIterable<T> =>
    new TakeFromAsyncIterable(iterable, predicate);

const take = <T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T> =>
    map(takeWhile(enumerate(iterable), ([index]) => index < count), ([, value]) => value);

export default take;

export { takeUntil, takeWhile };
