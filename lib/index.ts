import compareAsc from "date-fns/compareAsc";

type UnaryOperator<T, R> = (item: T) => R;
type Predicate<T> = UnaryOperator<T, boolean>;
type BinaryOperator<T, U, R> = (first: T, second: U) => R;
type Accumulator<T, R> = BinaryOperator<R, T, R>;
type Callback<T> = UnaryOperator<T, unknown>;
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

interface Observation {
    date: Date;
}

const invert = <T>(predicate: Predicate<T>): Predicate<T> =>
    item => !predicate(item);

const round = (value: number): number =>
    Math.round((value + Number.EPSILON) * 100) / 100;

const compareObservations: Comparator<Observation> = (a: Observation, b: Observation) =>
    compareAsc(a.date, b.date) as -1 | 0 | 1;

const sortObservations = <T extends Observation>(observations: T[]): T[] =>
    observations.sort(compareObservations);

export type {
    UnaryOperator,
    BinaryOperator,
    Predicate,
    Callback,
    Accumulator,
    Nullable,
    Optional,
    Comparator,
    Observation
};

export { invert, round, sortObservations };
