import path from "path";
import { readFileSync } from "fs";

function load<T>(resource: string): T {
    return JSON.parse(readFileSync(path.resolve(__dirname, resource)).toString()) as T;
}

export default load;
