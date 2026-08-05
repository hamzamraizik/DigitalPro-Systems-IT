import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import LegacyRouteRedirect from "@/components/LegacyRouteRedirect";

const CurrentPath = () => <output>{useLocation().pathname}</output>;

describe("English route aliases", () => {
  it.each([
    ["/about", "/a-propos"],
    ["/projects", "/projets"],
    ["/projects/medoc", "/projets/medoc"],
  ])("redirects %s to %s", (from, expected) => {
    render(
      <MemoryRouter initialEntries={[from]}>
        <Routes>
          <Route path="/about" element={<LegacyRouteRedirect to="/a-propos" />} />
          <Route path="/projects" element={<LegacyRouteRedirect to="/projets" />} />
          <Route
            path="/projects/:slug"
            element={<LegacyRouteRedirect to="/projets/:slug" />}
          />
          <Route path="*" element={<CurrentPath />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});
