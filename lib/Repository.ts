import LRU from "lru-cache";
import min from "date-fns/min";
import isThisISOWeek from "date-fns/isThisISOWeek";
import getISODay from "date-fns/getISODay";
import type { BinaryOperator, Optional } from ".";
import Observation from "./Observation";
import Week, { Weekday } from "./Week";
import groupBy from "./itertools/groupBy";
import map from "./itertools/map";
import filter from "./itertools/filter";
import { dropWhile } from "./itertools/drop";
import { takeWhile } from "./itertools/take";

class Archive<T extends Observation> {
    public static from<T extends Observation>(data: T[]): Archive<T>[] {
        if (data.length === 0) return [];

        const weeks = groupBy(Observation.sort(data), (previous, current) =>
            Week.with(current.date).equals(Week.with(previous.date)));

        return Array.from(map(weeks, data => {
            const { date: first } = data[0];
            const { date: end } = data[data.length - 1];
            const day = isThisISOWeek(end) ? getISODay(end) : Weekday.Sunday;

            return new Archive<T>(Week.with(first), day, data);
        }));
    }

    public constructor(
        public readonly week: Week,
        public readonly day: Weekday,
        public readonly data: T[]) {
    }

    public isComplete(): boolean {
        return this.day === Weekday.Sunday;
    }
}

class Repository<T extends Observation> {
    private readonly data = new LRU<string, Archive<T>>({
        max: 54,
        maxAge: 24 * 60 * 60 * 1000
    });

    public constructor(
        private readonly fetch: BinaryOperator<Date, Date, Promise<T[]>>) {
    }

    public save = (data: T[]): Archive<T>[] =>
        Array.from(map(Archive.from(data), archive => {
            this.data.set(archive.week.toString(), archive);
            return archive;
        }));

    public get = (week: Week): Optional<Archive<T>> =>
        this.data.get(week.toString());

    public async query(start: Date, end: Date): Promise<T[]> {
        end = min([end, new Date()]);

        if (start > end) {
            return [];
        }

        const missing = filter(Week.with(start, end), week =>
            !(this.get(week)?.isComplete() ?? false));

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

        const results = map(Week.with(start, end), week => this.get(week)?.data ?? []);

        const data = Observation.sort(Array.from(results).flat());

        return Array.from(takeWhile(dropWhile(data, result =>
            result.date < start), result => result.date <= end));
    }
}

export default Repository;
