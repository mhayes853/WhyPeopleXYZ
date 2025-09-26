// vite.config.ts
import { defineConfig } from "vite";
import fg from "fast-glob"; // npm i -D fast-glob
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve, dirname } from "path";

export default defineConfig(() => {
  // find src/**/index.html, e.g. 'src/index/index.html'
  const htmlFiles = fg.sync("src/*.html");
  console.log(htmlFiles);

  // convert to { index: <abs-path>, page2: <abs-path>, … }
  const input = Object.fromEntries(
    htmlFiles.map((file) => {
      return [file, resolve(__dirname, file)];
    }),
  );

  console.log(input);

  return {
    root: "src",
    build: {
      outDir: "../dist",
      rollupOptions: { input },
    },
    plugins: [
      viteStaticCopy({
        targets: [{ src: "./caniclimb-mountains.json", dest: "json-files" }],
      }),
    ],
  };
});
