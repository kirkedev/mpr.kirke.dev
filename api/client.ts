import dotenv from "dotenv";
import MprClient from "lib/mpr/MprClient";

dotenv.config();

const { MPR_URL } = process.env;

if (!MPR_URL?.length) {
    console.error("Error: MPR_URL environment variable is unset");
    process.exit(1);
}

const client = new MprClient(MPR_URL, "v1.1");

export default client;
