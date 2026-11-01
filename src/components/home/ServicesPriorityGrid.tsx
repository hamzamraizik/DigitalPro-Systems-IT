import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Server,
  ShieldCheck,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/home/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type ServiceGroup = "software" | "hardware";
type ServiceVariant =
  | "erp"
  | "web"
  | "mobile"
  | "hardware"
  | "cyber";

const serviceIcon: Record<ServiceVariant, LucideIcon> = {
  erp: Workflow,
  web: Code2,
  mobile: Smartphone,
  hardware: Server,
  cyber: ShieldCheck,
};

const href: Record<ServiceVariant, string> = {
  erp: "/services#developpement",
  cyber: "/services#cybersecurite",
  web: "/services#developpement",
  mobile: "/services#developpement",
  hardware: "/services#distribution",
};

const group: Record<ServiceVariant, ServiceGroup> = {
  erp: "software",
  web: "software",
  mobile: "software",
  hardware: "hardware",
  cyber: "hardware",
};

const bigImage: Partial<Record<ServiceVariant, string>> = {
  erp: "/erp-illustration.webp",
  cyber: "/cyber-bg.webp",
};

const image: Partial<Record<ServiceVariant, string>> = {
  web: "/web-realistic.webp",
  mobile: "/mobile-realistic.webp",
  hardware: "/hardware-realistic.webp",
};

const chipAccent: Record<ServiceVariant, string> = {
  erp: "text-[#0B6C92] bg-[#00AEEF]/15 ring-[#00AEEF]/30",
  web: "text-[#7C3AED] bg-violet-500/10 ring-violet-500/25",
  mobile: "text-[#7C3AED] bg-violet-500/10 ring-violet-500/25",
  hardware: "text-[#0B6C92] bg-[#00AEEF]/10 ring-[#00AEEF]/25",
  cyber: "text-[#0B6C92] bg-[#00AEEF]/15 ring-[#00AEEF]/30",
};

const span: Record<ServiceVariant, string> = {
  erp: "md:col-span-4",
  cyber: "md:col-span-2",
  web: "md:col-span-2",
  mobile: "md:col-span-2",
  hardware: "md:col-span-2",
};

const services: ServiceVariant[] = ["erp", "cyber", "web", "mobile", "hardware"];

const tPath = (variant: ServiceVariant) => `servicesGrid.${group[variant]}.cards.${variant}`;

export const ServicesPriorityGrid = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-page py-14 transition-colors duration-500 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#00AEEF]/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0B6C92]/80 dark:text-[#00AEEF]/80">
              <span className="h-px w-8 bg-[#00AEEF]/50" aria-hidden="true" />
              {t("servicesGrid.sectionEyebrow")}
            </p>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-[#111111] text-balance dark:text-white sm:text-4xl">
              {t("servicesGrid.sectionTitle")}
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.8] text-[#555555] dark:text-zinc-400">
              {t("servicesGrid.sectionDescription")}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-6 lg:gap-5">
            {services.map((variant, index) => (
              <motion.div
                key={variant}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={cn("h-full", span[variant])}
              >
                {isBigCard(variant) ? (
                  <BigCard variant={variant} />
                ) : isImageCard(variant) ? (
                  <ImageCard variant={variant} />
                ) : (
                  <ContentCard variant={variant} />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:mt-14">
            <Button asChild variant="hero" className="rounded-full">
              <Link to="/services">
                {t("servicesGrid.seeAll")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

const isBigCard = (variant: ServiceVariant) => bigImage[variant] !== undefined;
const isImageCard = (variant: ServiceVariant) => image[variant] !== undefined;

const BigCard = ({ variant }: { variant: ServiceVariant }) => {
  const { t } = useTranslation();
  const Icon = serviceIcon[variant];

  return (
    <article className="group relative flex h-full min-h-[400px] w-full flex-col justify-end overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#00AEEF]/50 hover:shadow-[0_20px_45px_-25px_rgba(11,108,146,0.25)] dark:border-white/[0.08]">
      <img
        src={bigImage[variant]}
        alt={t(`${tPath(variant)}.title`)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[2px]"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B1020]/90 via-[#0B1020]/45 to-[#0B1020]/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-tr from-[#00AEEF]/20 via-transparent to-transparent mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] bg-[#0B1020]/0 transition-colors duration-500 group-hover:bg-[#0B1020]/45"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-1 flex-col">
        <div className="flex h-full flex-col justify-end p-8 transition-opacity duration-500 delay-200 group-hover:delay-0 group-hover:opacity-0 sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            {t(`${tPath(variant)}.eyebrow`)}
          </p>
          <h3 className="mt-2 max-w-md font-display text-2xl font-bold leading-tight tracking-tight text-white">
            {t(`${tPath(variant)}.title`)}
          </h3>
        </div>

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center p-8 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 sm:p-10">
          <span
            className="inline-flex h-12 w-12 translate-y-3 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-[#00AEEF] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:scale-110 group-hover:opacity-100 group-hover:delay-75"
            aria-hidden="true"
          >
            <Icon className="h-6 w-6" />
          </span>
          <p className="mt-6 translate-y-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150">
            {t(`${tPath(variant)}.eyebrow`)}
          </p>
          <h3 className="mt-2 max-w-md translate-y-3 font-display text-2xl font-bold leading-tight tracking-tight text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-225">
            {t(`${tPath(variant)}.title`)}
          </h3>
          <p className="mt-3 max-w-md translate-y-3 text-sm leading-6 text-white/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-300">
            {t(`${tPath(variant)}.description`)}
          </p>

          <div className="mt-7 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-375">
            <Button asChild variant="hero" className="rounded-full">
              <Link to={href[variant]}>
                {t("servicesGrid.btnExplore")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

const ImageCard = ({ variant }: { variant: ServiceVariant }) => {
  const { t } = useTranslation();
  const Icon = serviceIcon[variant];

  return (
    <Link
      to={href[variant]}
      className="group relative flex h-full min-h-[270px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#00AEEF]/50 hover:shadow-[0_16px_36px_-20px_rgba(11,108,146,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] dark:border-white/[0.08]"
    >
      <img
        src={image[variant]}
        alt={t(`${tPath(variant)}.title`)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[2px]"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B1020]/90 via-[#0B1020]/40 to-[#0B1020]/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] bg-[#0B1020]/0 transition-colors duration-500 group-hover:bg-[#0B1020]/45"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex h-full flex-col justify-end p-7 transition-opacity duration-500 delay-200 group-hover:delay-0 group-hover:opacity-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            {t(`${tPath(variant)}.eyebrow`)}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-white">
            {t(`${tPath(variant)}.title`)}
          </h3>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center p-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span
            className="inline-flex h-11 w-11 translate-y-3 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-[#00AEEF] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:scale-110 group-hover:opacity-100 group-hover:delay-75"
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" />
          </span>
          <p className="mt-5 translate-y-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150">
            {t(`${tPath(variant)}.eyebrow`)}
          </p>
          <h3 className="mt-1.5 translate-y-3 font-display text-lg font-bold leading-snug text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-225">
            {t(`${tPath(variant)}.title`)}
          </h3>
          <p className="mt-3 line-clamp-2 translate-y-3 text-sm leading-6 text-white/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-300">
            {t(`${tPath(variant)}.description`)}
          </p>

          <span className="mt-5 inline-flex translate-y-3 items-center gap-2 text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-375 group-hover:text-[#00AEEF]">
            {t("servicesGrid.btnExplore")}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const ContentCard = ({ variant }: { variant: ServiceVariant }) => {
  const { t } = useTranslation();
  const Icon = serviceIcon[variant];

  return (
    <Link
      to={href[variant]}
      className="group relative flex h-full min-h-[270px] w-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-card p-7 shadow-none transition-all duration-500 hover:-translate-y-0.5 hover:border-[#00AEEF]/40 hover:shadow-[0_14px_32px_-20px_rgba(11,108,146,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] dark:border-white/[0.08] dark:hover:border-[#00AEEF]/25"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/70 to-transparent" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 flex-col">
        <span
          className={cn(
            "grid h-11 w-11 place-items-center rounded-xl ring-1 ring-inset transition-transform duration-500 group-hover:scale-110",
            chipAccent[variant],
          )}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B6C92] dark:text-[#00AEEF]">
          {t(`${tPath(variant)}.eyebrow`)}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-[#111111] dark:text-white">
          {t(`${tPath(variant)}.title`)}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#555555] dark:text-zinc-400">
          {t(`${tPath(variant)}.description`)}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#0B6C92] transition-colors group-hover:text-[#0B1F3F] dark:text-[#00AEEF] dark:group-hover:text-white">
          {t("servicesGrid.btnExplore")}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};