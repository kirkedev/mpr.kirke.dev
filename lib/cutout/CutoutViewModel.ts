import { extent } from "..";
import { flatMap } from "../itertools/map";
import flatten from "../itertools/flatten";
import type { Action } from "../Interactor";
import Series, { type Data, type Observation } from "../time/Series";
import Stat from "../Stat";
import CutoutIndex from "./CutoutIndex";
import { today } from "../time";

class CutoutViewModel {
    public static from = (cutout: Iterable<CutoutIndex>): CutoutViewModel =>
        new CutoutViewModel(today(), [
            CutoutIndex.daily(cutout),
            CutoutIndex.index(cutout)
        ]);

    public static selectDate = (date = today()): Action<CutoutViewModel> =>
        model => new CutoutViewModel(date, model.#series);

    readonly #date: Date;
    readonly #series: Series[];

    private constructor(date: Date, series: Series[]) {
        this.#series = series;
        this.#date = date;
    }

    public get stats(): Stat[] {
        return [
            Stat.from("Cutout", this.cutout, this.#date),
            Stat.from("Index", this.index, this.#date)
        ];
    }

    public get cutout(): Series {
        return this.#series[0];
    }

    public get index(): Series {
        return this.#series[1];
    }

    public get dates(): readonly [Date, Date] {
        return Series.extent(flatten<Observation>(this.#series));
    }

    public get values(): readonly [number, number] {
        return extent(flatMap<Data, number>(this.#series, record => record.value));
    }

    public get selected(): Data {
        return Series.find(this.cutout, this.#date);
    }
}

export default CutoutViewModel;
