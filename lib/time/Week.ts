import getISOWeek from "date-fns/getISOWeek";
import getISOWeekYear from "date-fns/getISOWeekYear";
import getISOWeeksInYear from "date-fns/getISOWeeksInYear";
import isSameISOWeek from "date-fns/isSameISOWeek";
import setISODay from "date-fns/setISODay";
import setISOWeek from "date-fns/setISOWeek";
import setISOWeekYear from "date-fns/setISOWeekYear";
import dates from "./dates";
import type { Comparator } from "..";

function* iterateWeeks(start: Week, end: Week): Iterator<Week> {
    const { week: startWeek, year: startYear } = start;
    const { week: endWeek, year: endYear } = end;

    for (let year = startYear; year <= endYear; year++) {
        const firstWeek = year === startYear ? startWeek : 1;
        const lastWeek = year === endYear ? endWeek : getISOWeeksInYear(year);

        for (let week = firstWeek; week <= lastWeek; week++) {
            yield new Week(year, week);
        }
    }
}

class Weeks implements Iterable<Week> {
    public constructor(
        private readonly start: Week,
        private readonly end: Week) {
    }

    public [Symbol.iterator] = (): Iterator<Week> =>
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

    public static parse(iso: string): Week {
        const [year, week] = iso.split(/-?W/)
            .map(value => parseInt(value, 10));

        return new Week(year, week);
    }

    public static range = (start: Week, end: Week): Weeks =>
        new Weeks(start, end);

    public static with(date: Date): Week;
    public static with(start: Date, end: Date): Weeks;
    public static with(start: Date, end?: Date): Week | Weeks {
        const week = new Week(getISOWeekYear(start), getISOWeek(start));

        return end === undefined
            ? week
            : Week.range(week, new Week(getISOWeekYear(end), getISOWeek(end)));
    }

    public static ascending: Comparator<Week> = (week: Week, other: Week) =>
        week.equals(other) ? 0 : week.before(other) ? -1 : 1;

    public static descending: Comparator<Week> = (week: Week, other: Week) =>
        week.equals(other) ? 0 : week.after(other) ? -1 : 1;

    public get next(): Week {
        const { year, week } = this;
        const weeks = getISOWeeksInYear(year);

        return this.week === weeks
            ? new Week(year + 1, 1)
            : new Week(year, week + 1);
    }

    public get previous(): Week {
        const { year, week } = this;

        return this.week === 1
            ? new Week(year - 1, getISOWeeksInYear(year - 1))
            : new Week(year, week - 1);
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

    public get start(): Date {
        return this.monday;
    }

    public get end(): Date {
        return this.sunday;
    }

    public get days(): Iterable<Date> {
        return dates(this.start, this.end);
    }

    public day = (weekday: Weekday): Date =>
        setISODay(setISOWeek(setISOWeekYear(new Date(), this.year), this.week), weekday);

    public contains = (date: Date): boolean =>
        isSameISOWeek(date, this.start);

    public equals = (week: Week): boolean =>
        week.week === this.week && week.year === this.year;

    public before = (week: Week): boolean =>
        this.year === week.year ? this.week < week.week : this.year < week.year;

    public after = (week: Week): boolean =>
        this.year === week.year ? this.week > week.week : this.year > week.year;

    public toString = (): string =>
        `${this.year}W${this.week.toString(10).padStart(2, "0")}`;
}

export default Week;
