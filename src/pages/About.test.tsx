import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import i18n from "@/i18n";
import About from "@/pages/About";

const renderAbout = () =>
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

describe("About project and team sections", () => {
  beforeEach(async () => {
    await i18n.changeLanguage("en");
  });

  it("offers a visible case-study link for every project in the grid", () => {
    renderAbout();

    expect(screen.getAllByText("View project")).toHaveLength(3);
    const cards = screen.getAllByRole("link", { name: /.+/ });
    const hrefs = cards
      .map((link) => link.getAttribute("href"))
      .filter((href) => href?.startsWith("/projets/"));
    expect(hrefs).toHaveLength(3);
    expect(hrefs).toContain("/projets/medoc");
  });

  it("introduces the wider engineering team without adding fake profiles", () => {
    renderAbout();

    expect(
      screen.getByText(
        "Alongside them, more than 6 engineers and developers contribute to our projects.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /^Portrait of/ })).toHaveLength(3);
  });
});
