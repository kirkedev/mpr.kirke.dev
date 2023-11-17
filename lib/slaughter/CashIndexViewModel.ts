import { extent } from "../itertools/accumulate";
import map from "../itertools/map";
import { today } from "../time";
import Series, { type Data } from "../time/Series";
import type { Action } from "../Interactor";
import type Stat from "../Stat";
import CashIndex from "./CashIndex";

class CashIndexViewModel {
    public static from = (cash: Iterable<CashIndex>): CashIndexViewModel =>
        new CashIndexViewModel(today(), CashIndex.index(cash));

    public static selectDate = (date = today()): Action<CashIndexViewModel> =>
        model => new CashIndexViewModel(date, model.#series);

    readonly #date: Date;
    readonly #series: Series;

    private constructor(date: Date, series: Series) {
        this.#series = series;
        this.#date = date;
    }

    public get stats(): Stat {
        return Series.stat("Cash Index", this.#series, this.#date);
    }

    public get series(): Series {
        return this.#series;
    }

    public get dates(): readonly [Date, Date] {
        return Series.extent(this.#series);
    }

    public get values(): readonly [number, number] {
        return extent(map<Data, number>(this.#series, record => record.value));
    }

    public get selected(): Data {
        return Series.find(this.series, this.#date);
    }
}

export default CashIndexViewModel;
