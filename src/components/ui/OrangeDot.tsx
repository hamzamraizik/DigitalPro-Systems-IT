import { cn } from "@/lib/utils";

export const OrangeDot = ({ className }: { className?: string }) => (
  <span
    className={cn("inline-block h-1.5 w-1.5 rounded-full", className)}
    style={{ background: "#FF8A3D", boxShadow: "0 0 8px rgba(255,138,61,0.65)" }}
    aria-hidden="true"
  />
);