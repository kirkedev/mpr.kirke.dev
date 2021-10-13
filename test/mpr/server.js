const fs = require("fs");
const http = require("http");
const path = require("path");

function listener(request, response) {
    const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host}`);

    const [, date] = searchParams.get("q")?.split(";")
        .map(param => param.split("="))
        .find(([key]) => key.includes("date")) ?? [];

    if (date === undefined) {
        response.writeHead(400);
        return response.end();
    }

    const route = pathname.slice(pathname.indexOf("reports"));
    const file = path.resolve(__dirname, decodeURIComponent(route), `${date}.json`);
    const result = fs.createReadStream(file);

    result
        .on("open", () => {
            response.writeHead(200, { "Content-Type": "application/json" });
            result.pipe(response);
        })
        .on("error", error => {
            const code = error.code === "ENOENT" ? 404 : 500;
            response.writeHead(code, error.message);
            response.end();
        });
}

const server = () => http.createServer(listener);

module.exports = server;
