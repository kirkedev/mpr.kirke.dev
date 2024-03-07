import MutableState, { type Action } from "lib/async/MutableState";
import Result from "lib/async/Result";
import { dropWhile } from "lib/itertools/drop";
import type Period from "lib/time/Period";
import Week from "lib/time/Week";
import type Cutout from "lib/cutout";
import CutoutIndex from "lib/cutout/CutoutIndex";
import CashIndex from "lib/slaughter/CashIndex";
import type Purchase from "lib/purchases";
import cutout from "./cutout";
import slaughter from "./slaughter";
import purchases from "./purchases";

export interface Resources {
    cashIndex: Iterable<CashIndex>;
    cutoutIndex: Iterable<CutoutIndex>;
    purchases: Iterable<Purchase>;
    cutout: Iterable<Cutout>;
}

const loading: Action<Result<Resources, Error>> = state =>
    Result.Loading(Result.isFailure(state) ? undefined : state.data);

function fetch(period: Period): Promise<Resources> {
    const periodStart = period.start;
    const { start } = Week.with(periodStart).previous;
    const { end } = period;

    return Promise.all([
        cutout.query(start, end),
        slaughter.query(start, end),
        purchases.query(start, end)
    ]).then(([cutout, slaughter, purchases]) => ({
        cashIndex: dropWhile(CashIndex.from(slaughter), record => record.date < periodStart),
        cutoutIndex: dropWhile(CutoutIndex.from(cutout), record => record.date < periodStart),
        purchases: dropWhile(purchases, record => record.date < periodStart),
        cutout: dropWhile(cutout, record => record.date < periodStart)
    }));
}

class Api extends MutableState<Result<Resources, Error>> {
    public constructor() {
        super(Result.Loading());
    }

    public async fetch(period: Period): Promise<Result<Resources, Error>> {
        this.dispatch(loading);

        try {
            const data = await fetch(period);
            this.value = Result.Success(data);
        } catch (error) {
            this.value = Result.Failure(error as Error);
        }

        return this.value;
    }
}

export default Api;
