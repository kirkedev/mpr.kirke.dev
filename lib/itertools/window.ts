import { iterate } from ".";

function* iterateWindows<T>(iterator: Iterator<T>, size: number): Iterator<T[]> {
    const data = new Array<T>();
    let result = iterator.next();

    while (!result.done && data.length < size) {
        data.push(result.value);
        result = iterator.next();
    }

    while (!result.done) {
        yield data.slice();
        data.shift();
        data.push(result.value);
        result = iterator.next();
    }

    yield data.slice();
}

class WindowedIterable<T> implements Iterable<T[]> {
    public constructor(
        private readonly iterable: Iterable<T>,
        private readonly size: number) {
    }

    public [Symbol.iterator] = (): Iterator<T[]> =>
        iterateWindows(iterate(this.iterable), this.size);
}

const window = <T>(iterable: Iterable<T>, size: number): Iterable<T[]> =>
    new WindowedIterable(iterable, size);

export default window;
