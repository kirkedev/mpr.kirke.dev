import dotenv from "dotenv";
import MprClient from "lib/mpr/MprClient";

dotenv.config();

const MPR_URL = process.env.MPR_URL ?? "https://mpr.datamart.ams.usda.gov";
const client = new MprClient(MPR_URL, "v1.1");

export default client;
