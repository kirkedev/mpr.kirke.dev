import parseDate from "date-fns/parse";
import format from "date-fns/format";

const dateFormat = "yyyy-MM-dd";

const today = (): Date =>
    import.meta.env.VITE_DATE.length
        ? parseDate(import.meta.env.VITE_DATE, dateFormat, new Date())
        : new Date();

const getDate = (date: string): Date =>
    parseDate(date, dateFormat, new Date());

const formatDate = (date: Date): string =>
    format(date, dateFormat);

export { formatDate, getDate, today };
