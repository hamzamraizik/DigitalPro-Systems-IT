import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import ContactPage from "@/pages/Contact";
import "@/i18n";

const renderContact = () =>
  render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>,
  );

describe("Contact page respects the light/dark theme toggle", () => {
  afterEach(() => {
    document.documentElement.classList.remove("dark");
  });

  it("uses the site's theme tokens (no hardcoded dark-navy backgrounds)", () => {
    renderContact();

    // The page root must use the token-driven classes, not a fixed #07111f block.
    expect(document.querySelector(".bg-page")).not.toBeNull();
    expect(document.body.innerHTML).not.toContain("#07111f");
  });

  it("renders a split-color heading", () => {
    renderContact();

    const cyanMark = document.querySelector("h1 .text-cyan");
    expect(cyanMark).not.toBeNull();
    expect(cyanMark?.textContent?.length).toBeGreaterThan(0);
  });

  it("keeps the map light by default and applies the dark filter when the toggle flips", async () => {
    renderContact();

    const iframe = document.querySelector("iframe") as HTMLIFrameElement | null;
    expect(iframe).not.toBeNull();
    expect(iframe?.style.filter ?? "").toBe("");

    // Simulate the navbar toggle: dark class on <html>.
    document.documentElement.classList.add("dark");

    await waitFor(() => {
      expect((document.querySelector("iframe") as HTMLIFrameElement).style.filter).toContain("invert");
    });

    // Flip back to light.
    document.documentElement.classList.remove("dark");

    await waitFor(() => {
      expect((document.querySelector("iframe") as HTMLIFrameElement).style.filter).toBe("");
    });
  });
});