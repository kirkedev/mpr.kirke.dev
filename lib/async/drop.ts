import { invert, type Predicate } from "..";
import { iterate } from ".";
import enumerate from "./enumerate";
import map from "./map";

async function* dropElementsAsync<T>(iterator: AsyncIterator<T>, predicate: Predicate<T>): AsyncIterator<T> {
    try {
        let result = await iterator.next();

        while (!result.done && predicate(result.value)) {
            result = await iterator.next();
        }

        while (!result.done) {
            yield result.value;
            result = await iterator.next();
        }
    } finally {
        await iterator.return?.();
    }
}

class DroppedAsyncIterable<T> implements AsyncIterable<T> {
    public constructor(
        private readonly iterable: AsyncIterable<T>,
        private readonly predicate: Predicate<T>) {}

    public [Symbol.asyncIterator] = (): AsyncIterator<T> =>
        dropElementsAsync(iterate(this.iterable), this.predicate);
}

const dropUntil = <T>(iterable: AsyncIterable<T>, predicate: Predicate<T>): AsyncIterable<T> =>
    new DroppedAsyncIterable(iterable, invert(predicate));

const dropWhile = <T>(iterable: AsyncIterable<T>, predicate: Predicate<T>): AsyncIterable<T> =>
    new DroppedAsyncIterable(iterable, predicate);

const drop = <T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T> =>
    map(dropWhile(enumerate(iterable), ([index]) => index < count), ([, value]) => value);

export default drop;

export { dropWhile, dropUntil };
