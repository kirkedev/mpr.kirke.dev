import { parse, format } from "date-fns";

const dateFormat = "yyyy-MM-dd";

const today = (): Date =>
    process.env.DATE?.length
        ? parse(process.env.DATE, dateFormat, new Date())
        : new Date();

const getDate = (date: string): Date =>
    parse(date, dateFormat, new Date());

const formatDate = (date: Date): string =>
    format(date, dateFormat);

export { formatDate, getDate, today };
