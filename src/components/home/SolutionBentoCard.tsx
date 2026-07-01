import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/data/home";

interface SolutionBentoCardProps {
  service: Service;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const layoutClass: Record<Service["layout"], string> = {
  feature: "md:col-span-2 md:row-span-2",
  darkWide: "md:col-span-2",
  darkSmall: "md:col-span-1",
};

const hasVisual = (service: Service) => Boolean(service.image);

export const SolutionBentoCard = ({ service, className }: SolutionBentoCardProps) => {
  const Icon = service.icon;
  const isFeature = service.layout === "feature";
  const isWide = service.layout === "darkWide";

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isFeature) return;

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.article variants={cardVariants} className={cn(layoutClass[service.layout], className)}>
      <Link
        to={service.href}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative flex h-full min-h-[280px] overflow-hidden rounded-[28px] border p-6",
          "transition-colors duration-300 hover:-translate-y-1",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]",
          isFeature
            ? "min-h-[620px] flex-col border-black/10 bg-[#E5E5E5] text-[#111111] md:p-7"
            : "flex-col border-white/10 bg-zinc-900 text-white hover:border-white/20",
          isWide && "min-h-[300px] md:flex-row md:items-stretch md:gap-7",
        )}
      >
        {!isFeature && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)",
            }}
          />
        )}

        {hasVisual(service) && (
          <div
            className={cn(
              "relative z-10 overflow-hidden border",
              isFeature
                ? "mb-8 rounded-[24px] border-black/10 bg-[#111111]"
                : "mb-6 rounded-[22px] border-white/10 bg-black md:mb-0",
              isWide ? "md:w-[44%] md:shrink-0" : "",
            )}
          >
            <img
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
              className={cn(
                "w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]",
                isFeature ? "aspect-[16/10]" : isWide ? "aspect-[16/10] h-full md:aspect-auto" : "aspect-[16/11]",
                !isFeature && "opacity-[0.82]",
              )}
            />
          </div>
        )}

        <div className="relative z-10 flex flex-1 flex-col">
          <div className="mb-5 flex items-center gap-3">
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border",
                isFeature ? "border-black/10 bg-white" : "border-white/10 bg-white/[0.04]",
              )}
            >
              <Icon className="h-4 w-4 text-[#00AEEF]" aria-hidden="true" />
            </span>
            {service.kicker && (
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.18em]",
                  isFeature ? "text-zinc-600" : "text-zinc-500",
                )}
              >
                {service.kicker}
              </span>
            )}
          </div>

          <h3
            className={cn(
              "font-display font-bold leading-[1.04] tracking-tight",
              isFeature ? "text-4xl md:text-5xl" : isWide ? "text-3xl md:text-4xl" : "text-2xl",
            )}
          >
            {service.title}
          </h3>
          <p
            className={cn(
              "mt-4 max-w-xl text-sm leading-7 md:text-base",
              isFeature ? "text-zinc-700" : "text-zinc-400",
            )}
          >
            {service.description}
          </p>

          <span
            className={cn(
              "mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold transition-colors",
              isFeature ? "text-zinc-950 group-hover:text-[#00AEEF]" : "text-zinc-300 group-hover:text-[#00AEEF]",
            )}
          >
            Découvrir
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};
