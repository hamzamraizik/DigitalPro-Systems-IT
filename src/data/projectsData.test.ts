import { describe, expect, it } from "vitest";
import { projects, projectSlugs } from "@/data/projectsData";

describe("project case studies", () => {
  it("contains the three real DPS-IT products", () => {
    expect(projectSlugs).toEqual(["medoc", "dps-pos", "dps-invoice"]);
    expect(projects.map((project) => project.name)).toEqual([
      "Med'Oc",
      "DPS POS",
      "DPS Gestion",
    ]);
  });

  it.each(["fr", "en"] as const)(
    "tells a complete problem-to-solution story in %s",
    (locale) => {
      for (const project of projects) {
        const story = project.content[locale];
        expect(story.problem.body.length).toBeGreaterThan(120);
        expect(story.problem.points).toHaveLength(3);
        expect(story.solution.body.length).toBeGreaterThan(120);
        expect(story.capabilities.length).toBeGreaterThanOrEqual(4);
        expect(story.journey.length).toBeGreaterThanOrEqual(4);
        expect(story.outcomes.length).toBeGreaterThanOrEqual(3);
      }
    },
  );

  it("uses qualitative, verifiable outcomes instead of invented percentage metrics", () => {
    for (const project of projects) {
      for (const locale of ["fr", "en"] as const) {
        expect(project.content[locale].outcomes.join(" ")).not.toMatch(/\d+\s*%/);
      }
    }
  });
});
