import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Fingerprint,
  Headphones,
  Network,
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
  | "securityPhysical"
  | "network"
  | "cyber"
  | "gestion";

const serviceIcon: Record<ServiceVariant, LucideIcon> = {
  erp: Workflow,
  web: Code2,
  mobile: Smartphone,
  hardware: Server,
  securityPhysical: Fingerprint,
  network: Network,
  cyber: ShieldCheck,
  gestion: Headphones,
};

const href: Record<ServiceVariant, string> = {
  erp: "/services#developpement",
  cyber: "/services#cybersecurite",
  web: "/services#developpement",
  mobile: "/services#developpement",
  hardware: "/services#distribution",
  securityPhysical: "/services#securite-electronique",
  network: "/services#infrastructures-reseaux",
  gestion: "/services#gestion-parc",
};

const group: Record<ServiceVariant, ServiceGroup> = {
  erp: "software",
  web: "software",
  mobile: "software",
  hardware: "hardware",
  securityPhysical: "hardware",
  network: "hardware",
  cyber: "hardware",
  gestion: "hardware",
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
  securityPhysical: "text-[#0B6C92] bg-[#00AEEF]/15 ring-[#00AEEF]/30",
  network: "text-[#0B6C92] bg-[#00AEEF]/10 ring-[#00AEEF]/25",
  cyber: "text-[#0B6C92] bg-[#00AEEF]/15 ring-[#00AEEF]/30",
  gestion: "text-[#0B6C92] bg-[#00AEEF]/10 ring-[#00AEEF]/25",
};

const span: Record<ServiceVariant, string> = {
  erp: "md:col-span-4",
  cyber: "md:col-span-2",
  web: "md:col-span-2",
  mobile: "md:col-span-2",
  hardware: "md:col-span-2",
  securityPhysical: "md:col-span-2",
  network: "md:col-span-2",
  gestion: "md:col-span-2",
};

const services: ServiceVariant[] = [
  "erp",
  "cyber",
  "web",
  "mobile",
  "hardware",
  "securityPhysical",
  "network",
  "gestion",
];

const tPath = (variant: ServiceVariant) => `servicesGrid.${group[variant]}.cards.${variant}`;

export const ServicesPriorityGrid = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-page py-20 transition-colors duration-500 sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#00AEEF]/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B6C92] dark:text-[#00AEEF]">
                {t("servicesGrid.sectionEyebrow")}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[#111111] dark:text-white sm:text-4xl">
                {t("servicesGrid.sectionTitle")}
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-[#555555] dark:text-zinc-400">
                {t("servicesGrid.sectionDescription")}
              </p>
            </div>

            <Link
              to="/services"
              className="group/link inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#0B6C92] transition-colors hover:text-[#0B1F3F] dark:text-[#00AEEF] dark:hover:text-white"
            >
              {t("servicesGrid.seeAll")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-6 lg:gap-5">
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
    <article className="group relative flex h-full min-h-[400px] w-full flex-col justify-end overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#00AEEF]/50 hover:shadow-[0_32px_64px_-32px_rgba(11,108,146,0.3)] dark:border-white/[0.08]">
      <img
        src={bigImage[variant]}
        alt={t(`${tPath(variant)}.title`)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B1020]/90 via-[#0B1020]/45 to-[#0B1020]/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-tr from-[#00AEEF]/20 via-transparent to-transparent mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-1 flex-col p-8 sm:p-10">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#00AEEF] backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </span>

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
          {t(`${tPath(variant)}.eyebrow`)}
        </p>
        <h3 className="mt-2 max-w-md font-display text-2xl font-bold leading-tight tracking-tight text-white">
          {t(`${tPath(variant)}.title`)}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
          {t(`${tPath(variant)}.description`)}
        </p>

        <div className="mt-7">
          <Button asChild variant="hero" className="rounded-full">
            <Link to={href[variant]}>
              {t("servicesGrid.btnExplore")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
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
      className="group relative flex h-full min-h-[270px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#00AEEF]/50 hover:shadow-[0_24px_48px_-24px_rgba(11,108,146,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] dark:border-white/[0.08]"
    >
      <img
        src={image[variant]}
        alt={t(`${tPath(variant)}.title`)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B1020]/90 via-[#0B1020]/40 to-[#0B1020]/10"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col p-7">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#00AEEF] backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
          {t(`${tPath(variant)}.eyebrow`)}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-white">
          {t(`${tPath(variant)}.title`)}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/70">
          {t(`${tPath(variant)}.description`)}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#00AEEF]">
          {t("servicesGrid.btnExplore")}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
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
      className="group relative flex h-full min-h-[270px] w-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-card p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-[#00AEEF]/40 hover:shadow-[0_24px_48px_-24px_rgba(11,108,146,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] dark:border-white/[0.08] dark:hover:border-[#00AEEF]/25"
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