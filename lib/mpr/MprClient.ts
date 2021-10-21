import MprReport from "./MprReport";
import type { SlaughterReport } from "../slaughter/mpr";
import type { CutoutReport } from "../cutout/mpr";
import type { SalesReport } from "../sales/mpr";
import type { PurchaseReport } from "../purchases/mpr";

class MprClient {
    public constructor(
        private readonly host: string,
        private readonly version: string) {
    }

    public report(id: 2496): CutoutReport & SalesReport;
    public report(id: 2498): CutoutReport & SalesReport;
    public report(id: 2500): SalesReport;
    public report(id: 2504): SalesReport;
    public report(id: 2510): PurchaseReport;
    public report(id: 2511): SlaughterReport;
    public report<Section extends string>(id: number): MprReport<Section> {
        return new MprReport<Section>(this.url, id);
    }

    public get url(): string {
        return `${this.host}/services/${this.version}`;
    }
}

export default MprClient;
