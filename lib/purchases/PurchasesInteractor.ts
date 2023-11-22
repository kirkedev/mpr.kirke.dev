import ObservableState from "../async/ObservableState";
import PurchasesViewModel from "./PurchasesViewModel";
import type Purchase from ".";

class PurchasesInteractor extends ObservableState<PurchasesViewModel> {
    public constructor(records: Iterable<Purchase>) {
        super(PurchasesViewModel.from(records));
    }

    public selectDate = (date: Date): void => {
        this.dispatch(PurchasesViewModel.selectDate(date));
    };

    public resetDate = (): void => {
        this.dispatch(PurchasesViewModel.selectDate());
    };
}

export default PurchasesInteractor;
