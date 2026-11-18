// Renders every route to static HTML (real content + meta for SEO), then writes sitemap.xml and robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, routes } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const SITE = (process.env.VITE_SITE_URL || 'https://paidlancer.in').replace(/\/$/, '');
const { list, lastmod, emptyCats } = routes();
const indexable = [];

for (const url of list) {
  const { html, head, noindex } = await render(url);
  const out = template.replace('<!--app-head-->', head + `\n    <script>window.__ROUTE__=${JSON.stringify(url)}</script>`).replace('<!--app-html-->', html);
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  if (!noindex && !emptyCats.includes(url)) indexable.push(url);
  console.log((noindex ? 'noindex ' : 'page    ') + url);
}

// 404 page
{
  const { html, head } = await render('/__not-found__');
  fs.writeFileSync(path.join(dist, '404.html'), template.replace('<!--app-head-->', head + '\n    <script>window.__ROUTE__="/__not-found__"</script>').replace('<!--app-html-->', html));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${lastmod[u] || today}</lastmod><changefreq>${u.startsWith('/blog/') ? 'monthly' : 'weekly'}</changefreq><priority>${u === '/' ? '1.0' : u.split('/').length <= 3 ? '0.8' : '0.6'}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`\n✓ ${list.length} pages prerendered, ${indexable.length} in sitemap`);
