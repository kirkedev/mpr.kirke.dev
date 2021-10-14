const server = require("./server");

const MPR_PORT = process.env.MPR_PORT ?? 80;

(async function() {
    await server(MPR_PORT);
    console.log(`Server listening on port ${MPR_PORT}`);
}());
