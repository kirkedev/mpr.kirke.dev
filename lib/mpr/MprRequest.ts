export abstract class MprRequest<T> {
    protected constructor(
        protected readonly filters = new Map<string, string>(),
        protected sortColumn?: string) {
    }

    public readonly abstract url: string;

    public abstract get(): Promise<T>;

    public filter(key: string, ...values: string[]): this {
        this.filters.set(key, values.join(":"));
        return this;
    }

    public between(key: string, start: string, end: string): this {
        this.filters.set(key, `${start}:${end}`);
        return this;
    }

    public sort(column: string): this {
        this.sortColumn = column;
        return this;
    }

    public get query(): Map<string, string> {
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
