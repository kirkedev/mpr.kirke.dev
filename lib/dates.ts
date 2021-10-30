import startOfDay from "date-fns/startOfDay";
import addDays from "date-fns/addDays";

function* iterateDates(start: Date, end: Date): Iterator<Date> {
    let date = startOfDay(start);

    while (date <= end) {
        yield new Date(date);
        date = addDays(date, 1);
    }
}

class DateRange implements Iterable<Date> {
    public constructor(
        private start: Date,
        private end: Date) {
    }

    public [Symbol.iterator] = (): Iterator<Date> =>
        iterateDates(this.start, this.end);
}

class DateIterator implements Iterator<Date> {
    private readonly date: Date;

    public constructor(start: Date) {
        this.date = startOfDay(start);
    }

    public next(): IteratorResult<Date> {
        const { date } = this;
        const result = { value: new Date(date), done: false };
        date.setDate(date.getDate() + 1);
        return result;
    }
}

class DateSequence implements Iterable<Date> {
    public constructor(
        private readonly start: Date) {
    }

    public [Symbol.iterator] = (): Iterator<Date> =>
        new DateIterator(this.start);
}

function dates(start: Date): Iterable<Date>;
function dates(start: Date, end: Date): Iterable<Date>;
function dates(start: Date, end?: Date): Iterable<Date> {
    return end === undefined ? new DateSequence(start) : new DateRange(start, end);
}

export default dates;
