import parseDate from "date-fns/parse";
import type { Nullable } from "..";

interface MprResponse<Section, T> {
    section: Section;
    stats: {
        returnedRows: number;
    },
    results: T[]
}

const dateFormat = "M/d/yyyy";

const today = new Date();

const getDate = (date: string): Date =>
    parseDate(date, dateFormat, today);

const stripCommas = (value: string) =>
    value.replace(",", "");

const getInt = (value: string): number =>
    parseInt(stripCommas(value), 10);

const getFloat = (value: string): number =>
    parseFloat(stripCommas(value));

const getOptional = (record: Record<string, Nullable<string>>, key: string): Nullable<string> =>
    key in record ? record[key] : null;

function optInt(record: Record<string, Nullable<string>>, key: string): number {
    const value = getOptional(record, key);
    return value === null ? 0 : getInt(value);
}

function optFloat(record: Record<string, Nullable<string>>, key: string): number {
    const value = getOptional(record, key);
    return value === null ? NaN : getFloat(value);
}

export { getDate, getInt, getFloat, optInt, optFloat };

export type { MprResponse };
