// vite.config.ts
import { defineConfig } from "vite";
import fg from "fast-glob"; // npm i -D fast-glob
import { resolve, dirname } from "path";

export default defineConfig(() => {
  // find src/**/index.html, e.g. 'src/index/index.html'
  const htmlFiles = fg.sync("src/**/index.html");

  // convert to { index: <abs-path>, page2: <abs-path>, … }
  const input = Object.fromEntries(
    htmlFiles.map((file) => {
      const folder = dirname(file).split("/").pop(); // 'index', 'page2', …
      return [folder, resolve(__dirname, file)];
    }),
  );

  return {
    root: "src",
    build: {
      outDir: "../dist",
      rollupOptions: { input },
    },
  };
});
