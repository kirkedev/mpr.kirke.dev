import { extentBy } from "../itertools/accumulate";
import { today } from "../time";
import Series, { type Data } from "../time/Series";
import MutableState from "../async/MutableState";
import Stat from "../Stat";
import Purchase from ".";

class PurchasesViewModel {
    public static from = (purchases: Iterable<Purchase>): PurchasesViewModel =>
        new PurchasesViewModel(Purchase.marketFormula(purchases));

    readonly #series: Series;
    public readonly selected: MutableState<Data>;
    public readonly stats: MutableState<Stat>;

    private constructor(series: Series) {
        const formula = Series.find(series, today());

        this.#series = series;
        this.selected = MutableState.from(formula);
        this.stats = MutableState.from(Stat.from("Formula", formula.value));
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
        this.selected.value = formula;
        this.stats.value = Stat.from("Formula", formula.value);
    };

    public resetDate = (): void => this.selectDate();
}

export default PurchasesViewModel;
