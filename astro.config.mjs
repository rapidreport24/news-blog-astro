import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://rapidreport247.netlify.app",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});
