import type { Accumulator, Callback, Predicate, UnaryOperator } from "..";
import { iterate } from ".";
import { filter, find } from "./filter";
import { map } from "./map";
import { last } from "./slice";

function* accumulate<T, R>(iterable: Iterable<T>, accumulator: Accumulator<T, R>, value: R): Iterable<R> {
    for (const item of iterable) {
        yield value = accumulator(value, item);
    }
}

const reduce = <T, R>(iterable: Iterable<T>, accumulator: Accumulator<T, R>, value: R): R =>
    last(accumulate(iterable, accumulator, value));

const sum = (iterable: Iterable<number>): number =>
    reduce(iterable, (value, item) => value + item, 0);

const sumBy = <T>(iterable: Iterable<T>, operator: UnaryOperator<T, number>): number =>
    sum(map(iterable, operator));

const count = <T>(iterable: Iterable<T>): number =>
    reduce(iterable, total => ++total, 0);

const countIf = <T>(iterable: Iterable<T>, predicate: Predicate<T>): number =>
    count(filter(iterable, predicate));

const none = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    find(iterable, predicate) === undefined;

const some = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    !none(iterable, predicate);

const all = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    none(iterable, item => !predicate(item));

function one<T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean {
    const iterator = iterate(filter(iterable, predicate));

    let result = iterator.next();
    if (result.done && result.value === undefined) return false;

    result = iterator.next();
    return result.done !== undefined && result.done && result.value === undefined;
}

function each<T>(iterable: Iterable<T>, callback: Callback<T>): void {
    for (const item of iterable) {
        callback(item);
    }
}

export { accumulate, reduce, sum, sumBy, count, countIf, one, none, some, all, each };
