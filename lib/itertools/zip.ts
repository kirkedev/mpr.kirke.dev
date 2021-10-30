import { iterate } from ".";

function* mergeIterators<T, U>(first: Iterator<T>, second: Iterator<U>): Iterator<[T, U]> {
    let firstResult = first.next();
    let secondResult = second.next();

    while (!firstResult.done || !secondResult.done) {
        yield [firstResult.value, secondResult.value];
        firstResult = first.next();
        secondResult = second.next();
    }
}

class MergedIterable<T, U> implements Iterable<[T, U]> {
    public constructor(
        private readonly first: Iterable<T>,
        private readonly second: Iterable<U>) {}

    public [Symbol.iterator] = (): Iterator<[T, U]> =>
        mergeIterators(iterate(this.first), iterate(this.second));
}

const zip = <T, U>(first: Iterable<T>, second: Iterable<U>): Iterable<[T, U]> =>
    new MergedIterable(first, second);

export default zip;
