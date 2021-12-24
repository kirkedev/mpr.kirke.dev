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
import { dropWhile } from "./itertools/drop";
import { takeWhile } from "./itertools/take";
import { each } from "./itertools/accumulate";

interface Archive<T extends Observation> {
    readonly week: Week;
    readonly day: Weekday;
    readonly data: T[];
}

namespace Archive {
    export const from = <T extends Observation>(data: T[]): Archive<T> => {
        const { reportDate: first } = data[0];
        const { reportDate: end } = data[data.length - 1];

        return {
            week: Week.with(first),
            day: isThisISOWeek(end) ? getISODay(end) : Weekday.Sunday,
            data
        };
    };
}

function archives<T extends Observation>(data: Iterable<T>): Iterable<Archive<T>> {
    const weeks = groupBy(Observation.sort(data), (previous, current) =>
        Week.with(current.reportDate).equals(Week.with(previous.reportDate)));

    return map(weeks, Archive.from);
}

class Repository<T extends Observation> {
    readonly #data = new LRU<string, Archive<T>>({
        max: 54,
        maxAge: 24 * 60 * 60 * 1000
    });

    readonly #fetch: BinaryOperator<Date, Date, Promise<T[]>>;

    public constructor(fetch: BinaryOperator<Date, Date, Promise<T[]>>) {
        this.#fetch = fetch;
    }

    #get = (week: Week): Optional<Archive<T>> =>
        this.#data.get(week.toString());

    #save = (data: T[]): void => {
        if (data.length === 0) {
            return;
        }

        const start = data[0].reportDate;
        const end = data[data.length - 1].reportDate;
        const dates = new Set(map(data, record => record.reportDate.getTime()));

        const cached = filter(flatten(map(Week.with(start, end), week =>
            this.#get(week)?.data ?? [])), record => !dates.has(record.reportDate.getTime()));

        each(archives(Observation.sort(flatten([cached, data]))), archive =>
            this.#data.set(archive.week.toString(), archive));
    };

    public async query(start: Date, end: Date): Promise<T[]> {
        end = min([end, new Date()]);

        if (start > end) {
            return [];
        }

        const missing = filter(Week.with(start, end), week =>
            !(this.#get(week)?.day === Weekday.Sunday));

        const grouped = groupBy(missing, (previous, current) =>
            current.previous.equals(previous));

        const dates = takeWhile(map(grouped, group => {
            const today = new Date();
            const first = group[0];
            const last = group[group.length - 1];
            const start = first.day((this.#get(first)?.day ?? 0) + 1);

            return [start, min([today, last.end])];
        }), ([start]) => start <= end);

        await Promise.all(map(dates, ([start, end]) =>
            this.#fetch(start, end)
                .catch(() => [])
                .then(this.#save)));

        const results = flatten(map(Week.with(start, end), week =>
            this.#get(week)?.data ?? []));

        return Array.from(takeWhile(dropWhile(Observation.sort(results),
            result => result.reportDate < start), result => result.reportDate <= end));
    }
}

export default Repository;
