import LRU from "lru-cache";
import min from "date-fns/min";
import getISODay from "date-fns/getISODay";
import isThisISOWeek from "date-fns/isThisISOWeek";
import type { BinaryOperator, Optional } from ".";
import Observation from "./Observation";
import Week, { Weekday } from "./Week";
import map from "./itertools/map";
import filter from "./itertools/filter";
import flatten from "./itertools/flatten";
import groupBy from "./itertools/groupBy";
import { reduce } from "./itertools/accumulate";
import { dropWhile } from "./itertools/drop";
import { takeWhile } from "./itertools/take";

interface Archive<T extends Observation> {
    readonly week: Week;
    readonly day: Weekday;
    readonly data: T[];
}

namespace Archive {
    export const from = <T extends Observation>(data: T[]): Archive<T> => {
        const { date: first } = data[0];
        const { date: end } = data[data.length - 1];

        return {
            week: Week.with(first),
            day: isThisISOWeek(end) ? getISODay(end) : Weekday.Sunday,
            data
        };
    };
}

function archives<T extends Observation>(data: T[]): Iterable<Archive<T>> {
    const weeks = groupBy(Observation.sort(data), (previous, current) =>
        Week.with(current.date).equals(Week.with(previous.date)));

    return map(weeks, Archive.from);
}

function merge<T extends Observation>(archive: Archive<T>, other: Archive<T>): Archive<T> {
    const data = reduce(other.data, (values, value) => {
        values[getISODay(value.date) - 1] = value;
        return values;
    }, reduce(archive.data, (values, value) => {
        values[getISODay(value.date) - 1] = value;
        return values;
    }, new Array<T>(7)));

    return Archive.from(data);
}

class Repository<T extends Observation> {
    private readonly data = new LRU<string, Archive<T>>({
        max: 54,
        maxAge: 24 * 60 * 60 * 1000
    });

    public constructor(
        private readonly fetch: BinaryOperator<Date, Date, Promise<T[]>>) {
    }

    public get = (week: Week): Optional<Archive<T>> =>
        this.data.get(week.toString());

    public set = (archive: Archive<T>): Archive<T> => {
        const key = archive.week.toString();
        const data = this.data.get(key);

        if (data === undefined) {
            this.data.set(key, archive);
        } else {
            this.data.set(key, merge(data, archive));
        }

        return archive;
    };

    public save = (data: T[]): Archive<T>[] =>
        Array.from(map(archives(data), this.set));

    public async query(start: Date, end: Date): Promise<T[]> {
        end = min([end, new Date()]);

        if (start > end) {
            return [];
        }

        const missing = filter(Week.with(start, end), week =>
            !(this.get(week)?.day === Weekday.Sunday));

        const grouped = groupBy(missing, (previous, current) =>
            current.previous.equals(previous));

        const dates = map(grouped, group => {
            const today = new Date();
            const first = group[0];
            const last = group[group.length - 1];
            const start = first.day((this.get(first)?.day ?? 0) + 1);

            return [start, min([today, last.end])];
        });

        await Promise.all(map(dates, ([start, end]) =>
            this.fetch(start, end).then(this.save)));

        const results = flatten(map(Week.with(start, end), week => this.get(week)?.data ?? []));

        return Array.from(takeWhile(dropWhile(Observation.sort(results), result =>
            result.date < start), result => result.date <= end));
    }
}

export default Repository;
