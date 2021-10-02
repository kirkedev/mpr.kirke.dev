import { iterate } from "./index";

function* iterateWindows<T>(iterator: Iterator<T>, size: number): Iterator<T[]> {
    const data = new Array<T>();
    let result = iterator.next();

    while (!result.done) {
        if (data.length === size) {
            yield data.slice();
            data.shift();
        }

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

    [Symbol.iterator] = (): Iterator<T[]> =>
        iterateWindows(iterate(this.iterable), this.size);
}

const rolling = <T>(iterable: Iterable<T>, size: number): Iterable<T[]> =>
    new WindowedIterable(iterable, size);

export default rolling;
