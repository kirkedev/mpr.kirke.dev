import getISOWeeksInYear from "date-fns/getISOWeeksInYear";
import isSameISOWeek from "date-fns/isSameISOWeek";
import setISODay from "date-fns/setISODay";
import setISOWeek from "date-fns/setISOWeek";
import setISOWeekYear from "date-fns/setISOWeekYear";
import dates from "./dates";
import getISOWeekYear from "date-fns/getISOWeekYear";
import getISOWeek from "date-fns/getISOWeek";

function* iterateWeeks(start: Week, end: Week): Iterator<Week> {
    for (let year = start.year; year <= end.year; year++) {
        const firstWeek = year === start.year ? start.week : 1;
        const lastWeek = year === end.year ? end.week : getISOWeeksInYear(year);

        for (let week = firstWeek; week <= lastWeek; week++) {
            yield new Week(year, week);
        }
    }
}

class Weeks implements Iterable<Week> {
    public constructor(
        private readonly start: Week, private readonly end: Week) {
    }

    [Symbol.iterator] = (): Iterator<Week> =>
        iterateWeeks(this.start, this.end);
}

class Week {
    public start = this.monday;
    public end = this.sunday;

    public constructor(
        public readonly year: number,
        public readonly week: number) {
    }

    static parse(iso: string): Week {
        const [year, week] = iso.split(/-?W/)
            .map(value => parseInt(value, 10));

        return new Week(year, week);
    }

    static range = (start: Week, end: Week): Weeks =>
        new Weeks(start, end);

    static with(date: Date): Week;
    static with(start: Date, end: Date): Weeks;
    static with(start: Date, end?: Date): Week | Weeks {
        return end === undefined
            ? new Week(getISOWeekYear(start), getISOWeek(start))
            : Week.range(Week.with(start), Week.with(end));
    }

    public get next(): Week {
        const weeks = getISOWeeksInYear(this.year);

        return this.week === weeks
            ? new Week(this.year + 1, 1)
            : new Week(this.year, this.week + 1);
    }

    public get previous(): Week {
        return this.week === 1
            ? new Week(this.year - 1, getISOWeeksInYear(this.year - 1))
            : new Week(this.year, this.week - 1);
    }

    public get monday(): Date {
        return this.day(1);
    }

    public get tuesday(): Date {
        return this.day(2);
    }

    public get wednesday(): Date {
        return this.day(3);
    }

    public get thursday(): Date {
        return this.day(4);
    }

    public get friday(): Date {
        return this.day(5);
    }

    public get saturday(): Date {
        return this.day(6);
    }

    public get sunday(): Date {
        return this.day(7);
    }

    public get days(): Iterable<Date> {
        return dates(this.start, this.end);
    }

    public day(day: 1 | 2 | 3 | 4 | 5 | 6 | 7): Date {
        let date = setISOWeekYear(new Date(), this.year);
        date = setISOWeek(date, this.week);
        return setISODay(date, day);
    }

    public contains = (date: Date): boolean =>
        isSameISOWeek(date, this.start);

    public toString = (): string =>
        `${this.year}W${this.week.toString(10).padStart(2, "0")}`;
}

export default Week;
