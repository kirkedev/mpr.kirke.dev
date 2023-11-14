import Interactor from "../Interactor";
import PurchasesViewModel from "./PurchasesViewModel";
import type Purchase from ".";

class PurchasesInteractor extends Interactor<PurchasesViewModel> {
    public constructor(records: Iterable<Purchase>) {
        super(PurchasesViewModel.from(records));
    }

    public selectDate = (date: Date): void => {
        this.execute(PurchasesViewModel.selectDate(date));
    };

    public resetDate = (): void => {
        this.execute(PurchasesViewModel.selectDate());
    };
}

export default PurchasesInteractor;
