import path from "path";
import dotenv from "dotenv";
import type { Callback } from "lib";
import server from "../mpr/server";

dotenv.config({ path: path.resolve("api", ".env") });

export default async function(): Promise<Callback<void>> {
    const mpr = await server(3001);

    return async function() {
        mpr.closeAllConnections();
        await new Promise(resolve => mpr.close(resolve));
    };
}
