export abstract class MprRequest<T> {
    protected constructor(
        protected readonly filters = new Map<string, string>(),
        protected sortColumn?: string) {
    }

    readonly abstract url: string;

    abstract get(): Promise<T>;

    filter(key: string, ...values: string[]): this {
        this.filters.set(key, values.join(":"));
        return this;
    }

    between(key: string, start: string, end: string): this {
        this.filters.set(key, `${start}:${end}`);
        return this;
    }

    sort(column: string): this {
        this.sortColumn = column;
        return this;
    }

    get query(): Map<string, string> {
        const params = new Map<string, string>();

        if (this.filters.size > 0) {
            const filters = Array.from(this.filters.entries())
                .map(filter => filter.join("="))
                .join(";");

            params.set("q", filters);
        }

        if (this.sortColumn != null) {
            params.set("sort", this.sortColumn);
        }

        return params;
    }
}

export default MprRequest;
