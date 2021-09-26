import Week from "./Week";

interface Observation {
    date: Date;
}

class Repository<T extends Observation> {
    #data = new Map<string, T[]>();

    public constructor(
        private readonly fetch: (start: Date, end: Date) => Promise<T[]>) {
    }

    private get = async (week: Week): Promise<T[]> => {
        const key = week.toString();

        if (this.#data.has(key)) {
            return this.#data.get(key) as T[];
        }

        const result = await this.fetch(week.start, week.end);
        this.#data.set(key, result);

        return result;
    }

    public query = async (start: Date, end: Date): Promise<T[]> => {
        const requests = Array.from(Week.with(start, end)).map(this.get);

        return Promise.all(requests).then(results => results.flat()
            .filter(record => record.date >= start && record.date <= end));
    }
}

export default Repository;
