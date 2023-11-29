import ObservableState from "../async/ObservableState";
import type Series from "../time/Series";
import { type Data } from "../time/Series";
import type Stat from "../Stat";
import type CutoutIndex from "./CutoutIndex";
import CutoutViewModel from "./CutoutViewModel";

class CutoutInteractor {
    #model: CutoutViewModel;
    public readonly stats: ObservableState<Stat[]>;
    public readonly selected: ObservableState<Data>;

    public constructor(cutout: Iterable<CutoutIndex>) {
        this.#model = CutoutViewModel.from(cutout);
        this.stats = new ObservableState(this.#model.stats);
        this.selected = new ObservableState(this.#model.selected);
    }

    public selectDate = (date: Date): void => {
        this.#model = this.#model.selectDate(date);
        this.stats.state = this.#model.stats;
        this.selected.state = this.#model.selected;
    };

    public resetDate = (): void => {
        this.#model = this.#model.selectDate();
        this.stats.state = this.#model.stats;
        this.selected.state = this.#model.selected;
    };

    public get dates(): readonly [Date, Date] {
        return this.#model.dates;
    }

    public get values(): readonly [number, number] {
        return this.#model.values;
    }

    public get cutout(): Series {
        return this.#model.cutout;
    }

    public get index(): Series {
        return this.#model.index;
    }
}

export default CutoutInteractor;
