import { iterate } from ".";

type EnumeratedValue<T> = [number, T];

async function* enumerateElementsAsync<T>(iterator: AsyncIterator<T>): AsyncIterator<EnumeratedValue<T>> {
    try {
        let i = 0;
        let result = await iterator.next();

        while (!result.done) {
            yield [i++, result.value];
            result = await iterator.next();
        }
    } finally {
        await iterator.return?.();
    }
}

class EnumeratedAsyncIterable<T> implements AsyncIterable<EnumeratedValue<T>> {
    public constructor(private readonly iterable: AsyncIterable<T>) {}

    public [Symbol.asyncIterator] = (): AsyncIterator<EnumeratedValue<T>> =>
        enumerateElementsAsync(iterate(this.iterable));
}

const enumerate = <T>(iterable: AsyncIterable<T>): AsyncIterable<EnumeratedValue<T>> =>
    new EnumeratedAsyncIterable(iterable);

export default enumerate;
