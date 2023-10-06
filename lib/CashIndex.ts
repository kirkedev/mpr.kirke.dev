import isSameDay from "date-fns/isSameDay";
import { round } from ".";
import Observation from "./Observation";
import { Arrangement } from "./PurchaseType";
import { sumBy } from "./itertools/accumulate";
import filter from "./itertools/filter";
import groupBy from "./itertools/groupBy";
import map from "./itertools/map";
import rolling from "./itertools/rolling";
import type Slaughter from "./slaughter";

interface CashIndex extends Observation {
    dailyPrice: number;
    indexPrice: number;
}

interface Values extends Observation {
    arrangement: Arrangement.Negotiated | Arrangement.MarketFormula | Arrangement.NegotiatedFormula;
    headCount: number;
    carcassWeight: number;
    netPrice: number;
}

const weight = (slaughter: Values): number =>
    slaughter.headCount * slaughter.carcassWeight;

const value = (slaughter: Values): number =>
    slaughter.netPrice * weight(slaughter);

const avgPrice = (value: number, weight: number): number =>
    round(value / weight);

const arrangements = [Arrangement.Negotiated, Arrangement.MarketFormula, Arrangement.NegotiatedFormula];

const filterSlaughter = (slaughter: Iterable<Slaughter>): Iterable<Values> =>
    filter(slaughter, ({ netPrice, carcassWeight, arrangement }) =>
        carcassWeight != null && netPrice != null && arrangements.includes(arrangement)) as Iterable<Values>;

function cashIndex(records: Iterable<Slaughter>): Iterable<CashIndex> {
    const slaughter = Observation.sort(Array.from(filterSlaughter(records)));
    const dates = groupBy(slaughter, (last, current) => isSameDay(current.date, last.date));

    const totals = map(dates, slaughter => {
        const { date, reportDate } = slaughter[0];

        return {
            date,
            reportDate,
            weight: sumBy(slaughter, weight),
            value: sumBy(slaughter, value)
        };
    });

    return map(rolling(totals, 2), ([last, { date, reportDate, weight, value }]) => ({
        date,
        reportDate,
        dailyPrice: avgPrice(value, weight),
        indexPrice: avgPrice(last.value + value, last.weight + weight)
    }));
}

export default cashIndex;

export type { CashIndex };
