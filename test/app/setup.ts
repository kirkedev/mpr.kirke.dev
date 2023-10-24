import "vitest-dom/extend-expect";
import "cross-fetch/polyfill";
import { afterAll, beforeAll } from "vitest";
import server from "./server";

beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => {
    server.close();
});
