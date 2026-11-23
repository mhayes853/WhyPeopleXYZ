import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },
      // The whole site is prerendered to static HTML in `dist`, which is the
      // same output directory the previous Vite MPA build used.
      adapter: adapter({ pages: "dist" }),
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    environment: "node",
  },
});
