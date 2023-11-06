import parseDate from "date-fns/parse";
import format from "date-fns/format";

const dateFormat = "yyyy-MM-dd";

const today = (): Date =>
    import.meta.env.PROD ? new Date() : new Date(2021, 11, 23);

const getDate = (date: string): Date =>
    parseDate(date, dateFormat, today());

const formatDate = (date: Date): string =>
    format(date, dateFormat);

export { formatDate, getDate, today };
