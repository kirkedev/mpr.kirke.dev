import isSameDay from "date-fns/isSameDay";
import type { Comparator, Observation } from ".";
import { round } from ".";
import { sumBy } from "./itertools/accumulate";
import { filter } from "./itertools/filter";
import groupBy from "./itertools/groupBy";
import { map } from "./itertools/map";
import rolling from "./itertools/rolling";
import { Arrangement } from "./mpr/PurchaseType";
import type { Slaughter } from "./mpr/Slaughter";

const value = (slaughter: Slaughter): number =>
    slaughter.netPrice * weight(slaughter);

const weight = (slaughter: Slaughter): number =>
    slaughter.headCount * slaughter.carcassWeight;

const avgPrice = (value: number, weight: number): number =>
    round(value / weight);

const filterSlaughter = (slaughter: Iterable<Slaughter>): Iterable<Slaughter> =>
    filter(slaughter, record =>
        !Number.isNaN(record.netPrice) && !Number.isNaN(record.carcassWeight)
        && (record.arrangement === Arrangement.Negotiated ||
            record.arrangement === Arrangement.MarketFormula ||
            record.arrangement == Arrangement.NegotiatedFormula));

const sortSlaughter: Comparator<Slaughter> = (a: Slaughter, b: Slaughter) =>
    a.date === b.date
        ? a.arrangement === b.arrangement ? 0 : a.arrangement < b.arrangement ? -1 : 1
        : a.date < b.date ? -1 : 1;

interface CashIndex extends Observation {
    dailyPrice: number;
    indexPrice: number;
}

function cashIndex(slaughter: Iterable<Slaughter>): Iterable<CashIndex> {
    const sorted = Array.from(filterSlaughter(slaughter)).sort(sortSlaughter);
    const dates = groupBy(sorted, (last, current) => isSameDay(current.date, last.date));

    const totals = map(dates, slaughter => ({
        date: slaughter[0].date,
        weight: sumBy(slaughter, weight),
        value: sumBy(slaughter, value)
    }));

    return map(rolling(totals, 2), ([last, { date, weight, value }]) => ({
        date,
        dailyPrice: avgPrice(value, weight),
        indexPrice: avgPrice(last.value + value, last.weight + weight),
    }));
}

export default cashIndex;

export type { CashIndex };
