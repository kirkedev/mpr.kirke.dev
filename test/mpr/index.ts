import server from "./server";

(async function() {
    await server(3000);
    console.log("Fake MPR server started");
}());
