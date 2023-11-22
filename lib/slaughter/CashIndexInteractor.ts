import ObservableState from "../async/ObservableState";
import type CashIndex from "./CashIndex";
import CashIndexViewModel from "./CashIndexViewModel";

class CashIndexInteractor extends ObservableState<CashIndexViewModel> {
    public constructor(records: Iterable<CashIndex>) {
        super(CashIndexViewModel.from(records));
    }

    public selectDate = (date: Date): void => {
        this.dispatch(CashIndexViewModel.selectDate(date));
    };

    public resetDate = (): void => {
        this.dispatch(CashIndexViewModel.selectDate());
    };
}

export default CashIndexInteractor;
