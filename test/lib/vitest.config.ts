import { mergeConfig } from "vitest/config";
import baseConfig from "../vitest.config";

export default mergeConfig(baseConfig, {
    test: {
        include: ["test/lib/**/*.spec.ts"],
        cache: {
            dir: "../node_modules/.vitest/lib"
        },
        coverage: {
            include: ["lib/**/*.ts"],
            reportsDirectory: "test/lib/coverage"
        }
    }
});
