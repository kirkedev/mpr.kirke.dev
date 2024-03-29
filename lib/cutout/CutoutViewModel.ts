import { extentBy } from "../itertools/accumulate";
import MutableState from "../async/MutableState";
import flatten from "../itertools/flatten";
import { findByDate, today } from "../time";
import Series, { type Data, type Observation } from "../time/Series";
import Stat from "../Stat";
import CutoutIndex from "./CutoutIndex";

class CutoutViewModel {
    public static from = (cutout: Iterable<CutoutIndex>): CutoutViewModel =>
        new CutoutViewModel([
            CutoutIndex.daily(cutout),
            CutoutIndex.index(cutout)
        ]);

    readonly #series: Series[];
    public readonly selected: MutableState<Data>;
    public readonly stats: MutableState<Stat[]>;

    private constructor(series: Series[]) {
        const [cutout, index] = series.map(findByDate(today()));
        this.#series = series;
        this.selected = MutableState.from(cutout);

        this.stats = MutableState.from([
            Stat.from("Cutout", cutout.value),
            Stat.from("Index", index.value)
        ]);
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
        return extentBy(flatten<Data>(this.#series), record => record.value);
    }

    public selectDate = (date = today()): void => {
        const [cutout, index] = this.#series.map(findByDate(date));

        this.stats.value = [
            Stat.from("Cutout", cutout.value),
            Stat.from("Index", index.value)
        ];

        this.selected.value = cutout;
    };

    public resetDate = (): void => this.selectDate();
}

export default CutoutViewModel;
