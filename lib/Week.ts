import getISOWeek from "date-fns/getISOWeek";
import getISOWeekYear from "date-fns/getISOWeekYear";
import getISOWeeksInYear from "date-fns/getISOWeeksInYear";
import isSameISOWeek from "date-fns/isSameISOWeek";
import setISODay from "date-fns/setISODay";
import setISOWeek from "date-fns/setISOWeek";
import setISOWeekYear from "date-fns/setISOWeekYear";
import dates from "./dates";

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

export enum Weekday {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7
}

class Week {
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
        return this.day(Weekday.Monday);
    }

    public get tuesday(): Date {
        return this.day(Weekday.Tuesday);
    }

    public get wednesday(): Date {
        return this.day(Weekday.Wednesday);
    }

    public get thursday(): Date {
        return this.day(Weekday.Thursday);
    }

    public get friday(): Date {
        return this.day(Weekday.Friday);
    }

    public get saturday(): Date {
        return this.day(Weekday.Saturday);
    }

    public get sunday(): Date {
        return this.day(Weekday.Sunday);
    }

    public start = this.monday;
    public end = this.sunday;

    public get days(): Iterable<Date> {
        return dates(this.start, this.end);
    }

    public day(weekday: Weekday): Date {
        return setISODay(setISOWeek(setISOWeekYear(new Date(), this.year), this.week), weekday);
    }

    public contains = (date: Date): boolean =>
        isSameISOWeek(date, this.start);

    public toString = (): string =>
        `${this.year}W${this.week.toString(10).padStart(2, "0")}`;
}

export default Week;
