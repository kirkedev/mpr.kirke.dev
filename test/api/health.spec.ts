import { test, expect } from "vitest";
import request from "./request";
import type { HealthStatus } from "api/health";

test("get api health status", async () => {
    const now = Date.now();
    const [status, body] = await request<HealthStatus>("/health");
    expect(status).toBe(200);
    expect(body.uptime).toBeGreaterThan(0);
    expect(body.timestamp).toBeGreaterThan(now);
});
