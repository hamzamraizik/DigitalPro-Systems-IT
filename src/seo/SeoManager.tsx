import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  BUSINESS,
  DEFAULT_IMAGE,
  SITE_NAME,
  SITE_URL,
  canonicalUrl,
  findSeoRoute,
} from "./routes.mjs";

type SeoRoute = {
  path: string;
  title: string;
  description: string;
  name: string;
  type: "website" | "service" | "project";
};

const setMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element!.setAttribute(name, value));
};

const setCanonical = (href: string) => {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = href;
};

const organizationReference = {
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
  areaServed: {
    "@type": "Country",
    name: "Maroc",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "17:30",
  }],
};

const breadcrumbItems = (route: SeoRoute) => {
  if (route.path === "/") return [];
  const items = [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` }];
  if (route.type === "service") {
    items.push({ "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services/` });
  } else if (route.type === "project") {
    items.push({ "@type": "ListItem", position: 2, name: "Projets", item: `${SITE_URL}/projets/` });
  }
  items.push({ "@type": "ListItem", position: items.length + 1, name: route.name, item: canonicalUrl(route.path) });
  return items;
};

const structuredDataForRoute = (route: SeoRoute) => {
  const url = canonicalUrl(route.path);
  const graph: Record<string, unknown>[] = [organizationReference];

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
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: url,
        servicePhone: BUSINESS.telephone,
      },
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

  const breadcrumbs = breadcrumbItems(route);
  if (breadcrumbs.length) {
    graph.push({ "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: breadcrumbs });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

export default function SeoManager() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const route = findSeoRoute(pathname) as SeoRoute | undefined;
    const isKnownRoute = Boolean(route);
    const metadata = route ?? {
      path: pathname,
      title: "Page introuvable | DigitalPro Systems IT",
      description: "Cette page n'existe pas. Découvrez les services IT, cybersécurité, réseaux et logiciels de DigitalPro Systems IT.",
      name: "Page introuvable",
      type: "website" as const,
    };
    const url = isKnownRoute ? canonicalUrl(metadata.path) : `${SITE_URL}${pathname}`;

    document.title = metadata.title;
    document.documentElement.lang = i18n.language.toLowerCase().startsWith("en") ? "en" : "fr";
    setCanonical(url);
    setMeta('meta[name="description"]', { name: "description", content: metadata.description });
    setMeta('meta[name="robots"]', { name: "robots", content: isKnownRoute ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, follow" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: metadata.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: metadata.description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setMeta('meta[property="og:type"]', { property: "og:type", content: metadata.type === "project" ? "article" : "website" });
    setMeta('meta[property="og:image"]', { property: "og:image", content: DEFAULT_IMAGE });
    setMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: `${metadata.name} — ${SITE_NAME}` });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: "fr_MA" });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: metadata.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: metadata.description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: DEFAULT_IMAGE });

    let script = document.head.querySelector<HTMLScriptElement>("#route-structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "route-structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredDataForRoute(metadata));
  }, [pathname, i18n.language]);

  return null;
}
