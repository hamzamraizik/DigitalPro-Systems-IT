import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("static hosting deep-link support", () => {
  it("ships an Apache/LiteSpeed rewrite that serves the SPA entry point", () => {
    const rules = readFileSync(resolve(process.cwd(), "public/.htaccess"), "utf8");

    expect(rules).toContain("RewriteEngine On");
    expect(rules).toMatch(/RewriteRule\s+\.\s+\/index\.html\s+\[L\]/);
  });

  it("keeps real files and directories accessible without rewriting them", () => {
    const rules = readFileSync(resolve(process.cwd(), "public/.htaccess"), "utf8");

    expect(rules).toContain("RewriteCond %{REQUEST_FILENAME} !-f");
    expect(rules).toContain("RewriteCond %{REQUEST_FILENAME} !-d");
  });
});
