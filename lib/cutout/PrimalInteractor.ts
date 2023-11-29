import ObservableState from "../async/ObservableState";
import type Series from "../time/Series";
import type { Data } from "../time/Series";
import type Cutout from ".";
import type Primal from "./Primal";
import PrimalViewModel, { type PrimalStat } from "./PrimalViewModel";

class PrimalInteractor {
    #model: PrimalViewModel;
    public readonly stats: ObservableState<PrimalStat[]>;
    public readonly selected: ObservableState<Data>;

    public constructor(cutout: Iterable<Cutout>) {
        this.#model = PrimalViewModel.from(cutout);
        this.stats = new ObservableState(this.#model.stats);
        this.selected = new ObservableState(this.#model.selected);
    }

    public selectDate = (date: Date): this => {
        this.#model = this.#model.selectDate(date);
        this.stats.state = this.#model.stats;
        this.selected.state = this.#model.selected;
        return this;
    };

    public resetDate = (): this => {
        this.#model = this.#model.selectDate();
        this.stats.state = this.#model.stats;
        this.selected.state = this.#model.selected;
        return this;
    };

    public selectPrimal = (primal: Primal): this => {
        this.#model = this.#model.selectPrimal(primal);
        this.stats.state = this.#model.stats;
        this.selected.state = this.#model.selected;
        return this;
    };

    public get dates(): readonly [Date, Date] {
        return this.#model.dates;
    }

    public get values(): readonly [number, number] {
        return this.#model.values;
    }

    public get series(): Series {
        return this.#model.series;
    }
}

export default PrimalInteractor;
