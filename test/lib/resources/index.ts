import path from "path";
import { readFileSync } from "fs";

const load = <T>(resource: string): T =>
     JSON.parse(readFileSync(path.resolve(__dirname, resource)).toString()) as T;

export default load;
