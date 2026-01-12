import fs from "node:fs";
import path from "node:path";

function escapeXml(s = "") {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET({ site }) {
  const base = (site?.href || "https://example.com").replace(/\/$/, "");
  const contentRoot = path.join(process.cwd(), "src", "content");

  const urls = [];

  if (fs.existsSync(contentRoot)) {
    const types = fs.readdirSync(contentRoot);

    for (const type of types) {
      const typeDir = path.join(contentRoot, type);
      if (!fs.statSync(typeDir).isDirectory()) continue;

      const langs = fs.readdirSync(typeDir);
      for (const lang of langs) {
        const langDir = path.join(typeDir, lang);
        if (!fs.statSync(langDir).isDirectory()) continue;

        const files = fs.readdirSync(langDir).filter((f) => f.endsWith(".md"));
        for (const file of files) {
          const slug = file.replace(/\.md$/, "");
          // Matches your route: /[lang]/[type]/[...slug]
          urls.push(`${base}/${lang}/${type}/${slug}/`);
        }
      }
    }
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${escapeXml(u)}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
