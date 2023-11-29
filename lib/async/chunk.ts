import { iterate } from ".";

async function* chunkElementsAsync<T>(iterator: AsyncIterator<T>, size: number): AsyncIterator<T[]> {
    try {
        const group = new Array(size);
        let result = await iterator.next();

        while (!result.done) {
            let i = 0;

            while (!result.done && i < size) {
                group[i++] = result.value;
                result = await iterator.next();
            }

            yield group.slice(0, i);
        }
    } finally {
        await iterator.return?.();
    }
}

class ChunkedAsyncIterable<T> implements AsyncIterable<T[]> {
    public constructor(
        private readonly iterable: AsyncIterable<T>,
        private readonly size: number) {}

    public [Symbol.asyncIterator] = (): AsyncIterator<T[]> =>
        chunkElementsAsync(iterate(this.iterable), this.size);
}

const chunk = <T>(iterable: AsyncIterable<T>, size: number): AsyncIterable<T[]> =>
    new ChunkedAsyncIterable(iterable, size);

export default chunk;
