import parseDate from "date-fns/parse";
import type { Nullable } from "..";

interface MprResponse<Section extends string, T extends Record<string, Nullable<string>>> {
    reportSection: Section;
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

function getOptional(record: Record<string, Nullable<string>>, key: keyof typeof record): Nullable<string> {
    const value = record[key];
    return value === "" ? null : value;
}

const getInt = (value: string): number =>
    parseInt(stripCommas(value), 10);

const getFloat = (value: string): number =>
    parseFloat(stripCommas(value));

function optInt(record: Record<string, Nullable<string>>, key: keyof typeof record): number {
    const value = getOptional(record, key);
    return value == null ? 0 : getInt(value);
}

function optFloat(record: Record<string, Nullable<string>>, key: keyof typeof record): number {
    const value = getOptional(record, key);
    return value == null ? NaN : getFloat(value);
}

export { getDate, getInt, getFloat, optInt, optFloat };

export type { MprResponse };
