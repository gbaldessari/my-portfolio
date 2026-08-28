import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/$/, '');
const base = siteUrl || 'https://example.com';

if (!siteUrl) {
  console.warn('[seo] VITE_SITE_URL is not set. Sitemap and robots.txt will use https://example.com');
  console.warn('[seo] Set VITE_SITE_URL in Vercel to your production domain.');
}

const metaSource = readFileSync(join(root, 'src/content/projects/meta.ts'), 'utf8');
const slugs = [...metaSource.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);

const pairs = [
  ['/', '/en'],
  ['/proyectos', '/en/projects'],
  ['/sobre-mi', '/en/about'],
  ['/contacto', '/en/contact'],
  ...slugs.map((slug) => [`/proyectos/${slug}`, `/en/projects/${slug}`]),
];

const lastmod = new Date().toISOString().slice(0, 10);

function priorityFor(path) {
  if (path === '/' || path === '/en') return '1.0';
  if (path.split('/').filter(Boolean).length >= 2) return '0.8';
  return '0.9';
}

function createUrlEntry(path) {
  const esPath = path.startsWith('/en') ? pairs.find(([, en]) => en === path)?.[0] : path;
  const enPath = path.startsWith('/en') ? path : pairs.find(([es]) => es === path)?.[1];
  const resolvedEsPath = esPath ?? path;
  const resolvedEnPath = enPath ?? path;

  return `
  <url>
    <loc>${base}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priorityFor(path)}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${base}${resolvedEsPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${base}${resolvedEnPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${resolvedEsPath}" />
  </url>`;
}

const uniquePaths = [...new Set(pairs.flat())];
const urlEntries = uniquePaths.map(createUrlEntry).join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

writeFileSync(join(root, 'public/sitemap.xml'), `${sitemap.trim()}\n`);
writeFileSync(join(root, 'public/robots.txt'), robots);

console.log(`[seo] Generated sitemap with ${uniquePaths.length} URLs for ${base}`);
