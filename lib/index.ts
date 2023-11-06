import { reduce } from "./itertools/accumulate";

type UnaryOperator<T, R> = (item: T) => R;
type Callback<T> = UnaryOperator<T, unknown>;
type Predicate<T> = UnaryOperator<T, boolean>;
type BinaryOperator<T, U, R> = (first: T, second: U) => R;
type Accumulator<T, R> = BinaryOperator<R, T, R>;
type Comparator<T> = BinaryOperator<T, T, -1 | 0 | 1>;
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

const invert = <T>(predicate: Predicate<T>): Predicate<T> =>
    item => !predicate(item);

const round = (value: number): number =>
    Math.round((value + Number.EPSILON) * 100) / 100;

const extent = (values: Iterable<number>): readonly [number, number] =>
    reduce(values, ([min, max], value) =>
        [Math.min(value, min), Math.max(value, max)]
    , [Infinity, -Infinity]);

export type {
    UnaryOperator,
    BinaryOperator,
    Predicate,
    Callback,
    Accumulator,
    Nullable,
    Optional,
    Comparator
};

export { invert, round, extent };
