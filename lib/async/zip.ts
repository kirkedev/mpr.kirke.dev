import { iterate } from ".";

type SpreadIterable<T> = { [K in keyof T]: AsyncIterable<T[K]> };
type SpreadIterator<T> = { [K in keyof T]: AsyncIterator<T[K]> };

async function* mergeAsyncIterators<T extends Array<unknown>>(...iterators: SpreadIterator<T>): AsyncIterator<T> {
    try {
        let results = await Promise.all(iterators.map(iterator => iterator.next()));

        while (!results.every(result => result.done)) {
            yield results.map(result => result.value) as T;
            results = await Promise.all(iterators.map(iterator => iterator.next()));
        }
    } finally {
        await Promise.all(iterators.map(iterator => Promise.resolve(iterator.return?.())));
    }
}

class MergedAsyncIterable<T extends Array<unknown>> implements AsyncIterable<T> {
    readonly #iterables: SpreadIterable<T>;

    public constructor(iterables: SpreadIterable<T>) {
        this.#iterables = iterables;
    }

    public [Symbol.asyncIterator] = (): AsyncIterator<T> =>
        mergeAsyncIterators(...this.#iterables.map(iterate)) as AsyncIterator<T>;
}

const zip = <T extends Array<unknown>>(...iterables: SpreadIterable<T>): AsyncIterable<T> =>
    new MergedAsyncIterable(iterables);

export default zip;
