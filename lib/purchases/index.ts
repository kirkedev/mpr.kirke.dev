import type { Observation } from "..";
import { Arrangement, Basis, Seller } from "../PurchaseType";

interface Purchase extends Observation {
    reportDate: Date;
    seller: Seller;
    arrangement: Arrangement;
    basis: Basis;
    headCount: number;
    avgPrice: number;
    lowPrice: number;
    highPrice: number;
}

export type { Purchase };
