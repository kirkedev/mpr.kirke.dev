import Interactor from "../Interactor";
import type CashIndex from "./CashIndex";
import CashIndexViewModel from "./CashIndexViewModel";

class CashIndexInteractor extends Interactor<CashIndexViewModel> {
    public constructor(records: Iterable<CashIndex>) {
        super(CashIndexViewModel.from(records));
    }

    public selectDate = (date: Date): void => {
        this.execute(CashIndexViewModel.selectDate(date));
    };

    public resetDate = (): void => {
        this.execute(CashIndexViewModel.selectDate());
    };
}

export default CashIndexInteractor;
