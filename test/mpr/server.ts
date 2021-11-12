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
    const route = decodeURIComponent(pathname.slice(pathname.indexOf("reports")));
    const file = resolve(route, `${Week.with(start)}.json`);
    const result = createReadStream(file);

    response.writeHead(200, { "Content-Type": "application/json" });

    result
        .once("open", () => result.pipe(response))
        .once("error", function() {
            const [, reportSection] = route.match(/\d+\/([A-z\s]+)/) as [string, string];
            response.end(JSON.stringify({ reportSection, results: [] }), "utf-8");
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
