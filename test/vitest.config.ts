import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        root: "..",
        include: ["{api,lib}/**/*.spec.ts"],
        coverage: {
            all: true,
            provider: "istanbul",
            include: ["{api,lib}/**/*.ts"],
            reportsDirectory: "test/coverage"
        }
    }
});
