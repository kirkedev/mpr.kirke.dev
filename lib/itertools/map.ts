import type { UnaryOperator } from "..";
import { iterate } from ".";
import flatten from "./flatten";

function* mapElements<T, R>(iterator: Iterator<T>, operator: UnaryOperator<T, R>): Iterator<R> {
    let result = iterator.next();

    while (!result.done) {
        yield operator(result.value);
        result = iterator.next();
    }
}

class MappedIterable<T, R> implements Iterable<R> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly operator: UnaryOperator<T, R>) {}

    public [Symbol.iterator] = (): Iterator<R> =>
        mapElements(iterate(this.iterable), this.operator);
}

const map = <T, R>(iterable: Iterable<T>, operator: UnaryOperator<T, R>): Iterable<R> =>
    new MappedIterable(iterable, operator);

const flatMap = <T, R>(iterable: Iterable<Iterable<T>>, operator: UnaryOperator<T, R>): Iterable<R> =>
    map(flatten(iterable), operator);

export { map, flatMap };
