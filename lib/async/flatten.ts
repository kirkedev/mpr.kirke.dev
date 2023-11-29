import { iterate } from ".";

async function* flattenElementsAsync<T>(iterator: AsyncIterator<AsyncIterable<T>>): AsyncIterator<T> {
    try {
        let result = await iterator.next();

        while (!result.done) {
            yield* result.value;
            result = await iterator.next();
        }
    } finally {
        await iterator.return?.();
    }
}

class FlattenedAsyncIterable<T> implements AsyncIterable<T> {
    public constructor(private readonly iterable: AsyncIterable<AsyncIterable<T>>) {}

    public [Symbol.asyncIterator] = (): AsyncIterator<T> =>
        flattenElementsAsync(iterate(this.iterable));
}

const flatten = <T>(iterable: AsyncIterable<AsyncIterable<T>>): AsyncIterable<T> =>
    new FlattenedAsyncIterable(iterable);

export default flatten;
