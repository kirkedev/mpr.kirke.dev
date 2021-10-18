import http from "http";

http.get("http://0.0.0.0/health", response => {
    console.log(`HEALTH CHECK STATUS: ${response.statusCode} ${response.statusMessage}`);
    process.exit(response.statusCode === 200 ? 0 : 1);
}).on("error", error => {
    console.error(`HEALTH CHECK ERROR: ${error.message}`);
    process.exit(1);
}).end();
