import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.com", // keep valid URL; replace after Netlify gives final URL
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});
