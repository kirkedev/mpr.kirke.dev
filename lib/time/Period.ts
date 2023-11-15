import { subMonths, subYears } from "date-fns";
import type { UnaryOperator } from "..";
import { today } from ".";

type Description = "3M" | "6M" | "1Y";

class Period {
    public constructor(
        public readonly description: Description,
        public readonly from: UnaryOperator<Date, Date>) {
    }

    public get start(): Date {
        return this.from(today());
    }

    public get end(): Date {
        return today();
    }

    public equals = (other: Period): boolean =>
        this.description === other.description;

    public toString = (): string =>
        this.description;
}

namespace Period {
    export const ThreeMonths = new Period("3M", (date: Date) =>
        subMonths(date, 3));

    export const SixMonths = new Period("6M", (date: Date) =>
        subMonths(date, 6));

    export const OneYear = new Period("1Y", (date: Date) =>
        subYears(date, 1));

    export function from(description: Description): Period {
        switch (description) {
            case "3M":
                return ThreeMonths;
            case "6M":
                return SixMonths;
            case "1Y":
                return OneYear;
        }
    }
}

const Periods = [Period.ThreeMonths, Period.SixMonths, Period.OneYear] as const;

export default Period;

export { Periods };
