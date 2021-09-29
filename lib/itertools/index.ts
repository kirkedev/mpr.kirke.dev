export { accumulate, each, count, countIf, sum, sumBy, all, none, reduce, some, one } from "./accumulate";
export { default as chunk } from "./chunk";
export { drop, dropWhile, dropUntil } from "./drop";
export { default as enumerate } from "./enumerate";
export { filter, find } from "./filter";
export { default as flatten } from "./flatten";
export { default as groupBy } from "./groupBy";
export { map, flatMap } from "./map";
export { first, last, elementAt, slice } from "./slice";
export { take, takeWhile, takeUntil } from "./take";
export { default as zip } from "./zip";

const iterate = <T>(iterable: Iterable<T>): Iterator<T> =>
    iterable[Symbol.iterator]();

export { iterate };
