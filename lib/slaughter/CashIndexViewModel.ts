import { extent, today } from "..";
import map from "../itertools/map";
import type { Action } from "../Interactor";
import type { Data } from "../Observation";
import Observation, { type Series } from "../Observation";
import Stat from "../Stat";
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

    public get date(): Date {
        return this.#date;
    }

    public get stats(): Stat {
        return Stat.from("Cash", this.#series, this.#date);
    }

    public get series(): Series {
        return this.#series;
    }

    public get dates(): readonly [Date, Date] {
        return Observation.extent(this.#series);
    }

    public get values(): readonly [number, number] {
        return extent(map(this.#series, (record: Data) => record.value));
    }
}

export default CashIndexViewModel;
