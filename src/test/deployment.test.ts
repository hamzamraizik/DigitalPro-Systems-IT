import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("static hosting deep-link support", () => {
  it("ships canonical-host and legacy-route redirects", () => {
    const rules = readFileSync(resolve(process.cwd(), "public/.htaccess"), "utf8");

    expect(rules).toContain("RewriteEngine On");
    expect(rules).toContain("RewriteCond %{HTTPS} !=on [OR]");
    expect(rules).toContain("https://www.dps-it.ma%{REQUEST_URI}");
    expect(rules).toMatch(/RewriteRule\s+\^about/);
    expect(rules).toMatch(/RewriteRule\s+\^projects/);
  });

  it("serves generated routes and returns a real 404 for unknown URLs", () => {
    const rules = readFileSync(resolve(process.cwd(), "public/.htaccess"), "utf8");

    expect(rules).toContain("RewriteCond %{REQUEST_FILENAME} -f");
    expect(rules).toContain("RewriteCond %{REQUEST_FILENAME} -d");
    expect(rules).toContain("ErrorDocument 404 /404.html");
    expect(rules).toContain("RewriteRule ^ - [R=404,L]");
  });

  it("publishes the crawler discovery and verification files", () => {
    const robots = readFileSync(resolve(process.cwd(), "public/robots.txt"), "utf8");
    const verification = readFileSync(resolve(process.cwd(), "public/google66476fea7c4aa7d9.html"), "utf8");

    expect(robots).toContain("Sitemap: https://www.dps-it.ma/sitemap.xml");
    expect(verification.trim()).toBe("google-site-verification: google66476fea7c4aa7d9.html");
  });
});
