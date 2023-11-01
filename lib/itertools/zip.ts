import { iterate } from ".";

type SpreadIterable<T> = { [K in keyof T]: Iterable<T[K]> };
type SpreadIterator<T> = { [K in keyof T]: Iterator<T[K]> };

function* mergeIterators<T extends Array<unknown>>(...iterators: SpreadIterator<T>): Iterator<T> {
    let results = iterators.map(iterator => iterator.next());

    while (!results.every(result => result.done)) {
        yield results.map(result => result.value) as T;
        results = iterators.map(iterator => iterator.next());
    }
}

class MergedIterable<T extends Array<unknown>> implements Iterable<T> {
    readonly #iterables: SpreadIterable<T>;

    public constructor(iterables: SpreadIterable<T>) {
        this.#iterables = iterables;
    }

    public [Symbol.iterator] = (): Iterator<T> =>
        mergeIterators(...this.#iterables.map(iterate)) as Iterator<T>;
}

const zip = <T extends Array<unknown>>(...iterables: SpreadIterable<T>): Iterable<T> =>
    new MergedIterable(iterables);

export default zip;
