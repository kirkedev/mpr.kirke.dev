import type { Predicate } from "..";
import { invert } from "..";
import { iterate } from ".";
import enumerate from "./enumerate";
import { map } from "./map";

function* dropElements<T>(iterator: Iterator<T>, predicate: Predicate<T>): Iterator<T> {
    let result = iterator.next();

    while (!result.done && predicate(result.value)) {
        result = iterator.next();
    }

    while (!result.done) {
        yield result.value;
        result = iterator.next();
    }
}

class DroppedIterable<T> implements Iterable<T> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly predicate: Predicate<T>) {}

    public [Symbol.iterator] = () =>
        dropElements(iterate(this.iterable), this.predicate);
}

const dropUntil = <T>(iterable: Iterable<T>, predicate: Predicate<T>): Iterable<T> =>
    new DroppedIterable(iterable, invert(predicate));

const dropWhile = <T>(iterable: Iterable<T>, predicate: Predicate<T>): Iterable<T> =>
    new DroppedIterable(iterable, predicate);

const drop = <T>(iterable: Iterable<T>, count: number): Iterable<T> =>
    map(dropWhile(enumerate(iterable), ([index]) => index < count), ([, value]) => value);

export { drop, dropWhile, dropUntil };
