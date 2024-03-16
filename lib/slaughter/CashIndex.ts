import { isSameDay } from "date-fns";
import { round } from "..";
import { sumBy } from "../itertools/accumulate";
import filter from "../itertools/filter";
import groupBy from "../itertools/groupBy";
import map from "../itertools/map";
import window from "../itertools/window";
import { Arrangement } from "../mpr/PurchaseType";
import Series, { type Observation } from "../time/Series";
import type Slaughter from ".";

interface CashIndex extends Observation {
    dailyPrice: number;
    indexPrice: number;
    volume: number;
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

const volume = (slaughter: Slaughter): number =>
    slaughter.headCount;

function cashIndex(slaughter: Iterable<Slaughter>): Iterable<CashIndex> {
    const dates = groupBy(Series.sort(slaughter), (last, current) => isSameDay(current.date, last.date));

    const totals = map(dates, function(slaughter) {
        const { date } = slaughter[0];

        const values = filter(slaughter, slaughter =>
            slaughter.arrangement === Arrangement.Negotiated ||
            slaughter.arrangement === Arrangement.MarketFormula ||
            slaughter.arrangement === Arrangement.NegotiatedFormula) as Iterable<Values>;

        const summaries = filter(slaughter, slaughter =>
            slaughter.arrangement === Arrangement.All ||
            slaughter.arrangement === Arrangement.PackerOwned);

        return {
            date,
            volume: sumBy(summaries, volume),
            weight: sumBy(values, weight),
            value: sumBy(values, value)
        };
    });

    return map(window(totals, 2), ([last, { date, weight, value, volume }]) => ({
        date,
        volume,
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

    export const volume = (cash: Iterable<CashIndex>): Series =>
        Array.from(map(cash, ({ date, volume: value }) => ({
            date, value
        })));
}

export default CashIndex;
