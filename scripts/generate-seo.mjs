import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import {
  BUSINESS,
  DEFAULT_IMAGE,
  SEO_ROUTES,
  SITE_NAME,
  SITE_URL,
  canonicalUrl,
} from "../src/seo/routes.mjs";

const distDirectory = resolve("dist");
const entryPath = resolve(distDirectory, "index.html");
const baseHtml = await readFile(entryPath, "utf8");

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const organization = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: `${SITE_URL}/`,
  image: DEFAULT_IMAGE,
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.streetAddress,
    postalCode: BUSINESS.postalCode,
    addressLocality: BUSINESS.addressLocality,
    addressCountry: BUSINESS.addressCountry,
  },
  areaServed: { "@type": "Country", name: "Maroc" },
};

const structuredData = (route) => {
  const url = canonicalUrl(route.path);
  const graph = [organization];

  if (route.path === "/") {
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "fr-MA",
      publisher: { "@id": `${SITE_URL}/#organization` },
    });
  }

  if (route.type === "service") {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: route.name,
      description: route.description,
      url,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Maroc" },
    });
  }

  if (route.type === "project") {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: route.name,
      description: route.description,
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      author: { "@id": `${SITE_URL}/#organization` },
    });
  }

  if (route.path !== "/") {
    const parent = route.type === "service"
      ? { name: "Services", url: `${SITE_URL}/services/` }
      : route.type === "project"
        ? { name: "Projets", url: `${SITE_URL}/projets/` }
        : null;
    const items = [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` }];
    if (parent) items.push({ "@type": "ListItem", position: 2, name: parent.name, item: parent.url });
    items.push({ "@type": "ListItem", position: items.length + 1, name: route.name, item: url });
    graph.push({ "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: items });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

const replaceMeta = (html, attribute, key, value) => {
  const expression = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`, "i");
  return html.replace(expression, `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
};

const renderRoute = (route, { noindex = false } = {}) => {
  const url = canonicalUrl(route.path);
  let html = baseHtml
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}" />`)
    .replace(/<script id="route-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(structuredData(route)).replaceAll("<", "\\u003c")}</script>`);

  html = replaceMeta(html, "name", "description", route.description);
  html = replaceMeta(html, "name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = replaceMeta(html, "property", "og:title", route.title);
  html = replaceMeta(html, "property", "og:description", route.description);
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "property", "og:type", route.type === "project" ? "article" : "website");
  html = replaceMeta(html, "property", "og:image", DEFAULT_IMAGE);
  html = replaceMeta(html, "property", "og:image:alt", `${route.name} — ${SITE_NAME}`);
  html = replaceMeta(html, "name", "twitter:title", route.title);
  html = replaceMeta(html, "name", "twitter:description", route.description);
  html = replaceMeta(html, "name", "twitter:image", DEFAULT_IMAGE);
  return html;
};

for (const route of SEO_ROUTES) {
  const outputPath = route.path === "/"
    ? entryPath
    : resolve(distDirectory, route.path.slice(1), "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderRoute(route), "utf8");
}

const notFound = {
  path: "/404.html",
  title: "Page introuvable | DigitalPro Systems IT",
  description: "Cette page n'existe pas. Découvrez les services IT, réseaux, cybersécurité et logiciels de DigitalPro Systems IT.",
  name: "Page introuvable",
  type: "website",
};
await writeFile(resolve(distDirectory, "404.html"), renderRoute(notFound, { noindex: true }), "utf8");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${SEO_ROUTES.map((route) => `  <url><loc>${canonicalUrl(route.path)}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(resolve(distDirectory, "sitemap.xml"), sitemap, "utf8");

console.log(`Generated SEO HTML and sitemap for ${SEO_ROUTES.length} canonical routes.`);
