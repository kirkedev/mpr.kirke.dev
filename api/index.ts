import api from "./api";

(async function() {
    try {
        await api.listen(3000, "0.0.0.0");
        console.log("API started");
    } catch (error) {
        api.log.error(error);
        process.exit(1);
    }
})();
