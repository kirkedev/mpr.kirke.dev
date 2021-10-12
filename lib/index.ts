import format from "date-fns/format";
import parseDate from "date-fns/parse";

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

const dateFormat = "yyyy-MM-dd";

const today = new Date();

const getDate = (date: string): Date =>
    parseDate(date, dateFormat, today);

const formatDate = (date: Date): string =>
    format(date, dateFormat);

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

export { invert, round, getDate, formatDate };
