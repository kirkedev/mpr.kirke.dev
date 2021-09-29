import type { Nullable } from ".";

function getOptional(record: Record<string, string>, key: string): Nullable<string> {
    if (key in record) {
        const value = record[key];
        return value === "null" ? null : value;
    }

    return null;
}

function optInt(record: Record<string, string>, key: string): number {
    const value = getOptional(record, key);
    return value === null ? 0 : parseInt(value);
}

function optFloat(record: Record<string, string>, key: string): number {
    const value = getOptional(record, key);
    return value === null ? NaN : parseInt(value);
}

export { optInt, optFloat };
