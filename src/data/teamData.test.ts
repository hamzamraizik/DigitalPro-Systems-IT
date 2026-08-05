import { describe, expect, it } from "vitest";
import { teamMembers } from "@/data/teamData";

describe("About page team", () => {
  it("contains only the three current DPS-IT members", () => {
    expect(teamMembers.map((member) => member.name)).toEqual([
      "Hamza Mraizik",
      "Omar Assahsah",
      "Abdelatif Aghozaf",
    ]);
  });

  it("uses a real local portrait for every member", () => {
    expect(teamMembers).toHaveLength(3);
    expect(teamMembers.every((member) => member.image.startsWith("/team/"))).toBe(true);
    expect(new Set(teamMembers.map((member) => member.image)).size).toBe(3);
  });
});
