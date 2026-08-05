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

  it("offers a visible case-study link for the active carousel project", () => {
    renderAbout();

    const link = screen.getByRole("link", { name: "View project" });
    expect(link).toHaveAttribute("href", "/projets/medoc");
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
