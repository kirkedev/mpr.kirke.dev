import Week, { Weekday } from "./Week";
import compareAsc from "date-fns/compareAsc";
import getISODay from "date-fns/getISODay";

interface Observation {
    date: Date;
}

const compareObservations = (a: Observation, b: Observation) => compareAsc(a.date, b.date);

class Repository<T extends Observation> {
    #data = new Map<string, T[]>();

    public constructor(
        private readonly fetch: (start: Date, end: Date) => Promise<T[]>) {
    }

    private async get (week: Week): Promise<T[]> {
        const key = week.toString();

        if (this.#data.has(key)) {
            const result = this.#data.get(key) as T[];
            const { date: last } = result[result.length - 1];

            if (getISODay(last) < Weekday.Friday) {
                result.concat(await this.fetch(last, week.end));
                this.#data.set(key, result);
            }

            return result;
        }

        const result = await this.fetch(week.start, week.end).then(data => data.sort(compareObservations));
        this.#data.set(key, result);

        return result;
    }

    public  async query(start: Date, end: Date): Promise<T[]> {
        const requests = Array.from(Week.with(start, end)).map(week => this.get(week));

        return Promise.all(requests).then(results => results.flat()
            .filter(record => record.date >= start && record.date <= end));
    }
}

export default Repository;
