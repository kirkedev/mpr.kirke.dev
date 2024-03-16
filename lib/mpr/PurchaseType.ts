enum Seller {
    Producer,
    Packer,
    All
}

enum Arrangement {
    Negotiated,
    MarketFormula,
    NegotiatedFormula,
    OtherMarketFormula,
    OtherPurchase,
    AllNegotiated,
    PackerOwned,
    All
}

enum Basis {
    Carcass,
    Live,
    All
}

export { Seller, Arrangement, Basis };

export type PurchaseType = [Seller, Arrangement, Basis];
