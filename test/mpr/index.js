const server = require("./server");

const MPR_PORT = process.env.MPR_PORT ?? 3333;

server().listen(MPR_PORT, () =>
    console.log(`Server listening on port ${MPR_PORT}`));
