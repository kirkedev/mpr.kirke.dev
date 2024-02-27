import { isSameDay } from "date-fns";
import { round } from "..";
import Series, { type Observation } from "../time/Series";
import { Arrangement } from "../mpr/PurchaseType";
import { sumBy } from "../itertools/accumulate";
import filter from "../itertools/filter";
import groupBy from "../itertools/groupBy";
import map from "../itertools/map";
import rolling from "../itertools/rolling";
import type Slaughter from ".";

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

const arrangements = [Arrangement.Negotiated, Arrangement.MarketFormula, Arrangement.NegotiatedFormula];

const weight = (slaughter: Values): number =>
    slaughter.headCount * slaughter.carcassWeight;

const value = (slaughter: Values): number =>
    slaughter.netPrice * weight(slaughter);

const avgPrice = (value: number, weight: number): number =>
    round(value / weight);

const filterSlaughter = (slaughter: Iterable<Slaughter>): Iterable<Values> =>
    filter(slaughter, ({ netPrice, carcassWeight, arrangement }) =>
        carcassWeight != null && netPrice != null && arrangements.includes(arrangement)) as Iterable<Values>;

function cashIndex(records: Iterable<Slaughter>): Iterable<CashIndex> {
    const slaughter = Series.sort(filterSlaughter(records));
    const dates = groupBy(slaughter, (last, current) => isSameDay(current.date, last.date));

    const totals = map(dates, slaughter => {
        const { date } = slaughter[0];

        return {
            date,
            weight: sumBy(slaughter, weight),
            value: sumBy(slaughter, value)
        };
    });

    return map(rolling(totals, 2), ([last, { date, weight, value }]) => ({
        date,
        dailyPrice: avgPrice(value, weight),
        indexPrice: avgPrice(last.value + value, last.weight + weight)
    }));
}

namespace CashIndex {
    export const from = cashIndex;

    export const index = (cash: Iterable<CashIndex>): Series =>
        Array.from(map(cash, ({ date, indexPrice: value }) => ({
            date, value
        })));

    export const daily = (cash: Iterable<CashIndex>): Series =>
        Array.from(map(cash, ({ date, dailyPrice: value }) => ({
            date, value
        })));
}

export default CashIndex;
