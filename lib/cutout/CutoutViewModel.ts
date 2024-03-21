import { extentBy } from "../itertools/accumulate";
import state, { type State, type MutableState } from "../async/state";
import flatten from "../itertools/flatten";
import { findByDate, today } from "../time";
import Series, { type Data } from "../time/Series";
import Stat from "../Stat";
import CutoutIndex from "./CutoutIndex";

class CutoutViewModel {
    public static from = (cutout: Iterable<CutoutIndex>): CutoutViewModel =>
        new CutoutViewModel([
            CutoutIndex.daily(cutout),
            CutoutIndex.index(cutout)
        ]);

    readonly #series: Series[];
    readonly #date: MutableState<Date>;

    public readonly selected: State<Data>;
    public readonly stats: State<Stat[]>;

    private constructor(series: Series[]) {
        this.#series = series;
        this.#date = state(today());

        this.stats = this.#date.map(date => {
            const [cutout, index] = this.#series.map(findByDate(date));

            return [
                Stat.from("Cutout", cutout.value),
                Stat.from("Index", index.value)
            ];
        });

        this.selected = this.#date.map(date => Series.find(this.cutout, date));
    }

    public get cutout(): Series {
        return this.#series[0];
    }

    public get index(): Series {
        return this.#series[1];
    }

    public get dates(): readonly [Date, Date] {
        return Series.extent(flatten(this.#series));
    }

    public get values(): readonly [number, number] {
        return extentBy(flatten(this.#series), record => record.value);
    }

    public selectDate = (date: Date): void => {
        this.#date.value = date;
    };

    public resetDate = (): void => {
        this.selectDate(today());
    };
}

export default CutoutViewModel;
