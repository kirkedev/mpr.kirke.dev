type UnaryOperator<T, R> = (item: T) => R;
type Predicate<T> = UnaryOperator<T, boolean>;
type BinaryOperator<T, U, R> = (first: T, second: U) => R;
type Accumulator<T, R> = BinaryOperator<R, T, R>;
type Callback<T> = UnaryOperator<T, unknown>;
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

export type { UnaryOperator, BinaryOperator, Predicate, Callback, Accumulator, Nullable, Optional };

const invert = <T>(predicate: Predicate<T>): Predicate<T> =>
    item => !predicate(item);

export { invert };
