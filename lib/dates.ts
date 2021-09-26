import startOfDay from "date-fns/startOfDay";
import addDays from "date-fns/addDays";

function* iterateDates(start: Date, end: Date) {
    let date = startOfDay(start);

    while (date <= end) {
        yield date;
        date = addDays(date, 1);
    }
}

class DateRange implements Iterable<Date> {
    public constructor(
        private start: Date,
        private end: Date) {
    }

    [Symbol.iterator] = (): Iterator<Date> =>
        iterateDates(this.start, this.end);
}

const dates = (start: Date, end: Date): Iterable<Date> =>
    new DateRange(start, end);

export default dates;
