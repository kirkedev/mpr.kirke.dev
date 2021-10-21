import fastify from "fastify";
import getHealth from "./health";
import getCutout, { CutoutSchema } from "./cutout";
import getSlaughter, { SlaughterSchema } from "./slaughter";

const api = fastify({ logger: process.env.NODE_ENV !== "test" })
    .get("/health", getHealth)
    .get("/cutout", { schema: CutoutSchema }, getCutout)
    .get("/slaughter", { schema: SlaughterSchema }, getSlaughter);

export default api;
