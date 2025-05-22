import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["olm.web.mjs", "olm.node.mjs"],
    format: ["esm", "cjs"],
    minify: true,
    outExtension: (ctx) => {
        if (ctx.format === "esm") {
            return {
                js: ".mjs",
            };
        }
        return {
            js: ".cjs",
        };
    },
});
