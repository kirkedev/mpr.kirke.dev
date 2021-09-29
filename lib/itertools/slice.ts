import { iterate } from ".";
import { drop } from "./drop";
import { take } from "./take";

const slice = <T>(iterable: Iterable<T>, start: number, end?: number): Iterable<T> =>
    end === undefined ? drop(iterable, start) : take(drop(iterable, start), end - start);

const first = <T>(iterable: Iterable<T>): T =>
    iterate(iterable).next().value;

function last<T>(iterable: Iterable<T>): T {
    const iterator = iterate(iterable);
    let result = iterator.next();
    let value = result.value;

    while (!result.done) {
        value = result.value;
        result = iterator.next();
    }

    return value;
}

const elementAt = <T>(iterable: Iterable<T>, index: number): T =>
    first(drop(iterable, index));

export { slice, first, last, elementAt };
