import { extent } from "..";
import map from "../itertools/map";
import type { Action } from "../Interactor";
import Series, { type Data } from "../time/Series";
import Stat from "../Stat";
import CashIndex from "./CashIndex";
import { today } from "../time";

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
        return Stat.from("Cash Index", this.#series, this.#date);
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
