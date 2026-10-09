import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import i18n from "@/i18n";

beforeAll(async () => {
  await i18n.changeLanguage("fr");
});

describe("HeroIllustration", () => {
  it("is only rendered on large screens", () => {
    const { container } = render(<HeroIllustration />);
    expect(container.firstChild).toHaveClass("hidden");
    expect(container.firstChild).toHaveClass("lg:block");
  });

  it("always shows the first dashboard screen statically", () => {
    render(<HeroIllustration />);
    expect(screen.getByText("DigitalPro Admin")).toBeInTheDocument();
    expect(screen.getAllByText("Sécurité").length).toBeGreaterThan(0);
    expect(screen.getByText("98")).toBeInTheDocument();
    expect(screen.getByText("Pare-feu actif")).toBeInTheDocument();
  });

  it("renders every cycling dashboard screen", () => {
    render(<HeroIllustration />);
    expect(screen.getByText("Réseau & Cloud")).toBeInTheDocument();
    expect(screen.getByText("Latence 12ms")).toBeInTheDocument();
    expect(screen.getByText("Alertes sécurité")).toBeInTheDocument();
    expect(screen.getByText("Isolée automatiquement")).toBeInTheDocument();
    expect(screen.getByText("Disponibilité")).toBeInTheDocument();
    expect(screen.getByText("98.5%")).toBeInTheDocument();
  });

  it("renders the glass overview cards", () => {
    render(<HeroIllustration />);
    expect(screen.getByText("Vidéosurveillance")).toBeInTheDocument();
    expect(screen.getByText("4 caméras actives")).toBeInTheDocument();
    expect(screen.getByText("État système")).toBeInTheDocument();
    expect(screen.getByText("Support IT")).toBeInTheDocument();
    expect(screen.getByText("Ticket #204 résolu")).toBeInTheDocument();
    expect(screen.getByText("Uptime")).toBeInTheDocument();
    expect(screen.getByText("99.9%")).toBeInTheDocument();
  });

  it("renders the video surveillance card instead of a floating camera", () => {
    render(<HeroIllustration />);
    expect(screen.queryByRole("img", { name: "Caméra de surveillance" })).not.toBeInTheDocument();
    expect(screen.getByText("4 caméras actives")).toBeInTheDocument();
    expect(screen.getByText("Enregistrement continu")).toBeInTheDocument();
  });

  it("represents every service line of the site", () => {
    render(<HeroIllustration />);
    expect(screen.getByRole("img", { name: "Système d'alarme" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Serveur rack" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Sécurité" })).toBeInTheDocument();
    expect(screen.getByText("Biométrie")).toBeInTheDocument();
    expect(screen.getByText("ERP")).toBeInTheDocument();
    expect(screen.getByText("Alarme")).toBeInTheDocument();
    expect(screen.getByText("Serveurs surveillés")).toBeInTheDocument();
    expect(screen.getByText("Pare-feu actif")).toBeInTheDocument();
    expect(screen.getByText("Migration cloud OK")).toBeInTheDocument();
    expect(screen.getByText("Assistance à distance")).toBeInTheDocument();
    expect(screen.getByText("12 serveurs surveillés")).toBeInTheDocument();
  });

  it("gates every animation behind prefers-reduced-motion", () => {
    const { container } = render(<HeroIllustration />);
    const css = (container.querySelector("style")?.textContent ?? "").replace(/\s+/g, " ");

    expect(css).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(css).not.toContain("blur(");
    expect(css).toContain("@keyframes hi-scrCycle");
    expect(css).not.toContain("hi-scan");
    expect(css).not.toContain("hi-eq");
  });

  it("switches to English content when English is selected", async () => {
    await i18n.changeLanguage("en");
    render(<HeroIllustration />);
    expect(screen.getAllByText("Security").length).toBeGreaterThan(0);
    expect(screen.getByText("Video surveillance")).toBeInTheDocument();
    expect(screen.getByText("4 cameras active")).toBeInTheDocument();
    expect(screen.getByText("IT Support")).toBeInTheDocument();
    await i18n.changeLanguage("fr");
  });
});