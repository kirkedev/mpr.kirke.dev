import parseDate from "date-fns/parse";
import format from "date-fns/format";

const dateFormat = "yyyy-MM-dd";

const today = (): Date =>
    process.env.DATE?.length
        ? parseDate(process.env.DATE, dateFormat, new Date())
        : new Date();

const getDate = (date: string): Date =>
    parseDate(date, dateFormat, new Date());

const formatDate = (date: Date): string =>
    format(date, dateFormat);

export { formatDate, getDate, today };
