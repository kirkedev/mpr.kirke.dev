import { extentBy } from "../itertools/accumulate";
import { today } from "../time";
import Series, { type Data } from "../time/Series";
import ObservableState from "../async/ObservableState";
import Stat from "../Stat";
import Purchase from ".";

class PurchasesViewModel {
    public static from = (purchases: Iterable<Purchase>): PurchasesViewModel =>
        new PurchasesViewModel(Purchase.marketFormula(purchases));

    readonly #series: Series;
    public readonly selected: ObservableState<Data>;
    public readonly stats: ObservableState<Stat>;

    private constructor(series: Series) {
        const formula = Series.find(series, today());

        this.#series = series;
        this.selected = new ObservableState(formula);
        this.stats = new ObservableState(Stat.from("Formula", formula.value));
    }

    public get series(): Series {
        return this.#series;
    }

    public get dates(): readonly [Date, Date] {
        return Series.extent(this.#series);
    }

    public get values(): readonly [number, number] {
        return extentBy(this.#series, record => record.value);
    }

    public selectDate = (date = today()): void => {
        const formula = Series.find(this.#series, date);
        this.selected.state = formula;
        this.stats.state = Stat.from("Formula", formula.value);
    };

    public resetDate = (): void => this.selectDate();
}

export default PurchasesViewModel;
