import { createReadStream } from "fs";
import { resolve } from "path";
import type { IncomingMessage, Server, ServerResponse } from "http";
import { createServer } from "http";
import { getDate } from "lib";
import Week from "lib/Week";

function listener(request: IncomingMessage, response: ServerResponse): void {
    const { pathname, searchParams } = new URL(request.url as string, `http://${request.headers.host}`);

    const [, date] = searchParams.get("q")?.split(";")
        .map(param => param.split("="))
        .find(([key]) => key.includes("date")) ?? [];

    if (date.length === 0) {
        response.writeHead(400);
        return response.end();
    }

    const [start] = date.split(":").map(getDate);
    const route = pathname.slice(pathname.indexOf("reports"));
    const file = resolve(decodeURIComponent(route), `${Week.with(start)}.json`);
    const result = createReadStream(file);

    result
        .once("open", () => {
            response.writeHead(200, { "Content-Type": "application/json" });
            result.pipe(response);
        })
        .once("error", error => {
            const code = error.name === "ENOENT" ? 404 : 500;
            response.writeHead(code, error.message);
            response.end();
        });
}

const server = (port: number): Promise<Server> =>
    new Promise(function(resolve, reject) {
        const server = createServer(listener);

        server
            .listen(port, "0.0.0.0", () => resolve(server))
            .once("error", error => reject(error));
    });

export default server;
