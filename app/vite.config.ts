import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
    plugins: [svelte()],
    cacheDir: "../node_modules/.vite",
    build: {
        outDir: "build",
        minify: true
    },
    server: {
        port: 3000,
        proxy: {
            "^/api/[^.]*$": {
                target: process.env.API_URL,
                rewrite: path => path.replace(/^\/api/, "")
            }
        }
    }
});
