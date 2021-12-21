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

const weight = (slaughter: Slaughter): number =>
    slaughter.headCount * slaughter.carcassWeight;

const value = (slaughter: Slaughter): number =>
    slaughter.netPrice * weight(slaughter);

const avgPrice = (value: number, weight: number): number =>
    round(value / weight);

const arrangements = [Arrangement.Negotiated, Arrangement.MarketFormula, Arrangement.NegotiatedFormula];

const filterSlaughter = (slaughter: Iterable<Slaughter>): Iterable<Slaughter> =>
    filter(slaughter, ({ netPrice, carcassWeight, arrangement }) =>
        !Number.isNaN(netPrice) && !Number.isNaN(carcassWeight) && arrangements.includes(arrangement));

interface CashIndex extends Observation {
    dailyPrice: number;
    indexPrice: number;
}

function cashIndex(records: Iterable<Slaughter>): Iterable<CashIndex> {
    const slaughter = Observation.sort(Array.from(filterSlaughter(records)));
    const dates = groupBy(slaughter, (last, current) => isSameDay(current.date, last.date));

    const totals = map(dates, slaughter => ({
        date: slaughter[0].date,
        weight: sumBy(slaughter, weight),
        value: sumBy(slaughter, value)
    }));

    return map(rolling(totals, 2), ([last, { date, weight, value }]) => ({
        date,
        dailyPrice: avgPrice(value, weight),
        indexPrice: avgPrice(last.value + value, last.weight + weight)
    }));
}

export default cashIndex;

export type { CashIndex };
