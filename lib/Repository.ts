import getISODay from "date-fns/getISODay";
import startOfDay from "date-fns/startOfDay";
import isThisISOWeek from "date-fns/isThisISOWeek";
import LRU from "lru-cache";
import Week, { Weekday } from "./Week";
import { Observation, sortObservations } from "./index";

interface Archive<T extends Observation> {
    day: number;
    data: T[];
}

const maxAge = 3 * 24 * 60 * 60 * 1000;

class Repository<T extends Observation> {
    #data = new LRU<string, Archive<T>>({ maxAge });

    public constructor(
        private readonly fetch: (start: Date, end: Date) => Promise<T[]>) {
    }

    private async get(week: Week): Promise<T[]> {
        const { start } = week;
        const end = new Date(Math.min(startOfDay(new Date()).getTime(), week.end.getTime()));

        if (end < start) {
            return [];
        }

        const key = week.toString();

        if (this.#data.has(key)) {
            const { day, data } = this.#data.get(key) as Archive<T>;

            if (day < Weekday.Sunday) {
                data.concat(await this.fetch(week.day(day + 1), end));
                this.#data.set(key, { day, data });
            }

            return data;
        }

        const data = await this.fetch(start, end).then(sortObservations);

        if (data.length > 0) {
            const { date: last } = data[data.length - 1];
            const day = isThisISOWeek(last) ? getISODay(last) : Weekday.Sunday;
            this.#data.set(key, { day, data });
        }

        return data;
    }

    public query(start: Date, end: Date): Promise<T[]> {
        const requests = Array.from(Week.with(start, end)).map(week => this.get(week));

        return Promise.all(requests).then(results => results.flat()
            .filter(record => record.date >= start && record.date <= end));
    }
}

export default Repository;
