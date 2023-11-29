import { defineConfig, type UserConfig } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import type { Plugin } from "postcss";
import svgColors from "./svg-colors";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
    cacheDir: "../node_modules/.vite",
    build: {
        outDir: "build",
        minify:  isProduction ? "esbuild" : false
    },
    define: {
        "process.env.DATE": isProduction
            ? JSON.stringify("")
            : JSON.stringify("2021-12-23")
    },
    plugins: [
        svelte({ preprocess: vitePreprocess() })
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
                tailwindcss({
                    content: ["index.html", "**/*.ts", "**/*.svelte", "**/*.css"],
                    plugins: [svgColors]
                }) as Plugin
            ]
        }
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
}) satisfies UserConfig;
