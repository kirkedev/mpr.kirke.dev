import fastify from "fastify";
import getHealth from "./health";
import getCutout, { CutoutSchema } from "./cutout";
import getSlaughter, { SlaughterSchema } from "./slaughter";
import getPurchases, { PurchaseSchema } from "./purchases";

const api = fastify({ logger: true })
    .get("/health", getHealth)
    .get("/cutout", { schema: CutoutSchema }, getCutout)
    .get("/slaughter", { schema: SlaughterSchema }, getSlaughter)
    .get("/purchases", { schema: PurchaseSchema }, getPurchases);

export default api;
