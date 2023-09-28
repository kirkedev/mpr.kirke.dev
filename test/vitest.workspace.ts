import { defineWorkspace } from "vitest/config";

export default defineWorkspace([{
    extends: "api/vitest.config.ts",
    test: {
        name: "api"
    }
}, {
    extends: "lib/vitest.config.ts",
    test: {
        name: "lib"
    }
}]);
