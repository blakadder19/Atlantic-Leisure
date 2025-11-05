// Generate sitemap.xml for SEO
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = 'https://luxhydroliving.com';

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/hot-tubs', priority: '0.9', changefreq: 'weekly' },
  { url: '/swim-spas', priority: '0.9', changefreq: 'weekly' },
  { url: '/saunas', priority: '0.9', changefreq: 'weekly' },
  { url: '/chemicals', priority: '0.8', changefreq: 'daily' },
  { url: '/installation', priority: '0.7', changefreq: 'monthly' },
  { url: '/showroom', priority: '0.8', changefreq: 'monthly' },
  { url: '/projects', priority: '0.7', changefreq: 'monthly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/testimonials', priority: '0.6', changefreq: 'weekly' },
  { url: '/faq', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms', priority: '0.3', changefreq: 'yearly' },
];

// Load chemical products dynamically
const chemicalsDataPath = path.join(__dirname, '../src/data/chemicals.json');
let chemicals = [];
try {
  const chemicalsData = fs.readFileSync(chemicalsDataPath, 'utf8');
  chemicals = JSON.parse(chemicalsData);
} catch (error) {
  console.error('Error loading chemicals data:', error);
}

// Generate chemical product pages
const chemicalPages = chemicals.map(chemical => ({
  url: `/chemicals/${chemical.slug}`,
  priority: '0.8',
  changefreq: 'weekly',
  lastmod: new Date().toISOString().split('T')[0]
}));

// Combine all pages
const allPages = [...staticPages, ...chemicalPages];

// Generate XML
const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
};

// Write sitemap to public folder
const sitemap = generateSitemap();
const outputPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log(`✅ Sitemap generated successfully at ${outputPath}`);
console.log(`📊 Total URLs: ${allPages.length}`);

