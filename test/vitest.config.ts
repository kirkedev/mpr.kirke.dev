import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        root: "..",
        include: ["{api,lib}/**/*.spec.ts"],
        coverage: {
            all: true,
            provider: "istanbul",
            include: ["{api,lib}/**/*.ts"],
            exclude: ["api/client.ts", "api/index.ts"],
            reportsDirectory: "test/coverage"
        }
    }
});
