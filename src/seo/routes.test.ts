import { describe, expect, it } from "vitest";
import { SEO_ROUTES, SITE_URL, canonicalUrl, findSeoRoute } from "./routes.mjs";

describe("SEO route registry", () => {
  it("covers every canonical public page with unique paths", () => {
    expect(SEO_ROUTES).toHaveLength(44);
    expect(new Set(SEO_ROUTES.map((route) => route.path)).size).toBe(SEO_ROUTES.length);
  });

  it("keeps titles and descriptions useful for search snippets", () => {
    for (const route of SEO_ROUTES) {
      expect(route.title.length, route.path).toBeGreaterThanOrEqual(30);
      expect(route.title.length, route.path).toBeLessThanOrEqual(65);
      expect(route.description.length, route.path).toBeGreaterThanOrEqual(110);
      expect(route.description.length, route.path).toBeLessThanOrEqual(180);
    }
  });

  it("normalizes browser paths to one HTTPS canonical URL", () => {
    expect(findSeoRoute("/services")).toEqual(findSeoRoute("/services/"));
    expect(canonicalUrl("/")).toBe(`${SITE_URL}/`);
    expect(canonicalUrl("/contact/")).toBe(`${SITE_URL}/contact/`);
  });
});
