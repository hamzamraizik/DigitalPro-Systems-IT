import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { OrangeDot } from "@/components/ui/OrangeDot";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  dots?: boolean;
}

export const Eyebrow = ({ children, className, dots = true }: EyebrowProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B6C92] dark:border-white/10 dark:bg-white/[0.06] dark:text-cyan",
      className,
    )}
  >
    {dots && <OrangeDot />}
    {children}
    {dots && <OrangeDot />}
  </span>
);