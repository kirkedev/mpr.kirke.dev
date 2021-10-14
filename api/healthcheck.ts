import http from "http";

const API_PORT = process.env.API_PORT ?? 3000;

http.get(`http://0.0.0.0:${API_PORT}/health`, response => {
    console.log(`HEALTH CHECK STATUS: ${response.statusCode} ${response.statusMessage}`);
    process.exit(response.statusCode === 200 ? 0 : 1);
}).on("error", error => {
    console.error(`HEALTH CHECK ERROR: ${error.message}`);
    process.exit(1);
}).end();
