import type { Predicate } from "..";
import { iterate } from ".";
import { first } from "./slice";

function* filterElements<T>(iterator: Iterator<T>, predicate: Predicate<T>): Iterator<T> {
    let result = iterator.next();

    while (!result.done) {
        const value = result.value;
        if (predicate(value)) yield value;
        result = iterator.next();
    }
}

class FilteredIterable<T> implements Iterable<T> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly predicate: Predicate<T>) {}

    public [Symbol.iterator] = (): Iterator<T> =>
        filterElements(iterate(this.iterable), this.predicate);
}

const filter = <T>(iterable: Iterable<T>, predicate: Predicate<T>): Iterable<T> =>
    new FilteredIterable(iterable, predicate);

const find = <T>(iterable: Iterable<T>, predicate: Predicate<T>): T =>
    first(filter(iterable, predicate));

export { filter, find };
