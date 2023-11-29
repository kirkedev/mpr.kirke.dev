type UnaryOperator<T, R> = (item: T) => R | Promise<R>;
type BinaryOperator<T, U, R> = (first: T, second: U) => R | Promise<R>;
type Accumulator<T, R> = BinaryOperator<R, T, R>;

const iterate = <T>(iterable: AsyncIterable<T>): AsyncIterator<T> =>
    iterable[Symbol.asyncIterator]();

export { iterate };

export type { UnaryOperator, BinaryOperator, Accumulator };
