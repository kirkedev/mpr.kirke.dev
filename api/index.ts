import api from "./api";
import dotenv from "dotenv";

dotenv.config();

const API_PORT = process.env.API_PORT ?? 3000;

(async function() {
    try {
        await api.listen(API_PORT, "0.0.0.0");
        console.log("API started");
    } catch (error) {
        api.log.error(error);
        process.exit(1);
    }
})();
