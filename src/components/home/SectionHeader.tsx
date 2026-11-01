import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
}

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className,
}: SectionHeaderProps) => (
  <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
    {eyebrow && (
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#00AEEF]">
        {eyebrow}
      </p>
    )}
    <h2
      className={cn(
        "font-display text-3xl font-semibold leading-tight tracking-normal sm:text-4xl lg:text-5xl",
        inverse ? "text-white" : "text-[#111111] dark:text-white",
      )}
    >
      {title}
    </h2>
    {description && (
      <p
        className={cn(
          "mt-5 text-base leading-8 sm:text-lg",
          inverse ? "text-white/[0.68]" : "text-[#555555] dark:text-white/[0.68]",
        )}
      >
        {description}
      </p>
    )}
  </div>
);
