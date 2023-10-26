import "vitest-dom/extend-expect";
import server from "./server";
import { afterAll } from "vitest";

server.listen({ onUnhandledRequest: "error" });

afterAll(() => {
    server.close();
});
