import baseConfig from "../vitest.config";
import { mergeConfig } from "vitest/config";

export default mergeConfig(baseConfig, {
    test: {
        include: ["test/api/**/*.spec.ts"],
        cache: {
            dir: "../node_modules/.vitest/api"
        },
        globalSetup: "api/setup.ts",
        coverage: {
            include: ["api/**/*.ts"],
            reportsDirectory: "test/api/coverage"
        }
    }
});
