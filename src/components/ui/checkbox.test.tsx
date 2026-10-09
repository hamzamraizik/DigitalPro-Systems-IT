import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox", () => {
  it("pops its indicator with the animation class when checked", () => {
    render(<Checkbox aria-label="Activer le suivi" />);

    const box = screen.getByRole("checkbox", { name: "Activer le suivi" });
    expect(box).toHaveAttribute("data-state", "unchecked");

    fireEvent.click(box);

    expect(box).toHaveAttribute("data-state", "checked");
    const indicator = box.querySelector("svg")?.parentElement;
    expect(indicator).toHaveClass("checkbox-pop");
  });

  it("hides the indicator again when unchecked", () => {
    render(<Checkbox aria-label="Activer le suivi" defaultChecked />);

    const box = screen.getByRole("checkbox", { name: "Activer le suivi" });
    expect(box).toHaveAttribute("data-state", "checked");

    fireEvent.click(box);

    expect(box).toHaveAttribute("data-state", "unchecked");
    expect(box.querySelector("svg")).not.toBeInTheDocument();
  });
});