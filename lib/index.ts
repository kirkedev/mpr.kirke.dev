import parseDate from "date-fns/parse";

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

const compareObservations: Comparator<Observation> = ({ date: a }: Observation, { date: b }: Observation) =>
    a === b ? 0 : a < b ? -1 : 1;

const dateFormat = "yyyy-mm-dd";

const today = new Date();

const getDate = (date: string): Date =>
    parseDate(date, dateFormat, today);

export { getDate };

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
