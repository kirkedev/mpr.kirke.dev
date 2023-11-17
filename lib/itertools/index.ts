const iterate = <T>(iterable: Iterable<T>): Iterator<T> =>
    iterable[Symbol.iterator]();

const iterateAsync = <T>(iterable: AsyncIterable<T>): AsyncIterator<T> =>
    iterable[Symbol.asyncIterator]();

export { iterate, iterateAsync };
