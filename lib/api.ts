import type { Nullable } from ".";

const stripCommas = (value: string) =>
    value.replace(",", "");

const getOptional = (record: Record<string, Nullable<string>>, key: string): Nullable<string> =>
    key in record ? record[key] : null;

function optInt(record: Record<string, string>, key: string): number {
    const value = getOptional(record, key);
    return value === null ? 0 : parseInt(stripCommas(value));
}

function optFloat(record: Record<string, string>, key: string): number {
    const value = getOptional(record, key);
    return value === null ? NaN : parseFloat(stripCommas(value));
}

export { optInt, optFloat };
