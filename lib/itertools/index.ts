const iterate = <T>(iterable: Iterable<T>): Iterator<T> =>
    iterable[Symbol.iterator]();

export { iterate };
