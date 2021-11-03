import type { Server } from "http";

interface Globals extends Record<string, unknown> {
    server?: Server;
}

const globals = global as Globals;

export default async function(): Promise<void> {
    await new Promise(resolve => globals.server?.close(resolve));
}
