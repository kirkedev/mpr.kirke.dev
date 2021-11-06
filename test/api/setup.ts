import path from "path";
import dotenv from "dotenv";
import server from "../mpr/server";
import type { Server } from "http";

interface Globals extends Record<string, unknown> {
    server?: Server;
}

const globals = global as Globals;

dotenv.config({ path: path.resolve("./api", ".env") });

export default async function(): Promise<void> {
    process.chdir("./mpr");
    globals.server = await server(3001);
}
