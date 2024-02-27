import { format, parse } from "date-fns";
import type { UnaryOperator } from "..";
import Series, { type Data } from "./Series";

const dateFormat = "yyyy-MM-dd";

const today = (): Date =>
    process.env.DATE?.length
        ? parse(process.env.DATE, dateFormat, new Date())
        : new Date();

const getDate = (date: string): Date =>
    parse(date, dateFormat, new Date());

const formatDate = (date: Date): string =>
    format(date, dateFormat);

const findByDate = (date: Date): UnaryOperator<Series, Data> =>
    (series: Series) => Series.find(series, date);

export { formatDate, getDate, today, findByDate };
