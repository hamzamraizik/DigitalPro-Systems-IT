import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconTileProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** Rounded-square dark tile with a subtle blue border/glow, blue icon inside. */
export const IconTile = ({ children, size = "lg", className }: IconTileProps) => (
  <span
    className={cn(
      "grid shrink-0 place-items-center border border-cyan/20 bg-cyan/10 text-[#0B6C92] shadow-[0_0_14px_rgba(0,174,239,0.18)] transition-all duration-300 dark:text-cyan dark:border-cyan/25",
      size === "sm" && "h-10 w-10 rounded-xl",
      size === "md" && "h-12 w-12 rounded-xl",
      size === "lg" && "h-14 w-14 rounded-2xl",
      className,
    )}
    aria-hidden="true"
  >
    {children}
  </span>
);