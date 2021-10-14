import fastify from "fastify";
import getHealth from "./health";
import getCutout, { CutoutSchema } from "./cutout";
import getPurchases, { PurchasesSchema } from "./purchases";
import getSlaughter, { SlaughterSchema } from "./slaughter";

const api = fastify({ logger: true })
    .get("/health", getHealth)
    .get("/cutout", { schema: CutoutSchema }, getCutout)
    .get("/purchases", { schema: PurchasesSchema }, getPurchases)
    .get("/slaughter", { schema: SlaughterSchema }, getSlaughter);

export default api;
