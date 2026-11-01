import Footer from "@/components/Footer";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Camera, Video, ShieldCheck, Network, Terminal, Headset, ArrowRight,
} from "lucide-react";
import ServiceModal from "@/components/ServiceModal";
import { getServiceCategory, whyUs } from "@/data/servicesData";
import { OrangeDot } from "@/components/ui/OrangeDot";
import { IconTile } from "@/components/ui/IconTile";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TechHudOverlay } from "@/components/ui/TechHudOverlay";

const services = [
  {
    id: "securite-electronique",
    icon: Video,
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80",
  },
  {
    id: "cybersecurite",
    icon: ShieldCheck,
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
  },
  {
    id: "infrastructures-reseaux",
    icon: Network,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  },
  {
    id: "gestion-parc",
    icon: Terminal,
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
  },
];

const hudConfig: Record<string, { icon: typeof Camera; labels: string[] }> = {
  "securite-electronique": { icon: Camera, labels: ["ANALYSE", "DONNÉES", "ID CONFIRMÉ"] },
  cybersecurite: { icon: ShieldCheck, labels: ["SCAN OK", "ID CONFIRMÉ", "MENACE"] },
  "infrastructures-reseaux": { icon: Network, labels: ["DÉBIT", "DONNÉES", "SCAN"] },
  "gestion-parc": { icon: Headset, labels: ["SUIVI", "DONNÉES", "ID CONFIRMÉ"] },
};

const ServicesPage = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeService = activeId ? getServiceCategory(activeId) : null;
  const closeServiceModal = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  const cardText = (id: string, field: "title" | "cardDesc") =>
    t(`servicesPage.categories.${id}.${field}`);



  return (
    <div className="min-h-screen border-none bg-page transition-colors duration-500">
      <div className="pt-16 lg:pt-20">
        {/* Hero */}
        <header className="relative overflow-hidden pt-20 pb-16 lg:pb-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(0,174,239,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,174,239,0.06)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_20%,black,transparent)]"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan/10 rounded-full blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan/[0.06] rounded-full blur-[100px]" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Eyebrow>{t("servicesPage.hero.badge")}</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground text-balance"
            >
              {t("servicesPage.hero.titlePrefix")}{" "}
              <span className="bg-gradient-to-r from-cyan via-cyan to-[#0B6C92] bg-clip-text text-transparent">{t("servicesPage.hero.titleHighlight")}</span>
            </motion.h1>
            <div className="mx-auto mb-6 h-[3px] w-20 rounded-full bg-gradient-to-r from-transparent via-cyan to-transparent" aria-hidden="true" />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed"
            >
              {t("servicesPage.hero.subtitle")}
            </motion.p>
          </div>
        </header>

{/* Services — sticky stacking cards */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col gap-10 lg:gap-16">
            {services.map((service, i) => {
              const Icon = service.icon;
              const HudIcon = hudConfig[service.id].icon;
              const flip = i % 2 === 1;
              return (
                <div
                  id={service.id}
                  key={service.id}
                  style={{ top: `calc(6.5rem + ${i * 1.25}rem)` }}
                  className="group scroll-mt-28 lg:sticky"
                >
                  <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-card shadow-none transition-colors duration-500 hover:border-cyan/30 dark:border-white/10 dark:hover:border-cyan/30">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-4 right-6 z-10 select-none font-display text-[6rem] lg:text-[8rem] font-bold leading-none tabular-nums text-foreground/[0.05] dark:text-white/[0.07]"
                    >
                      0{i + 1}
                    </span>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center p-6 sm:p-10 lg:p-14">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={flip ? "lg:order-2" : ""}
                  >
                    <div className="relative">
                      <div
                        className="pointer-events-none absolute -left-10 -top-10 h-60 w-60 rounded-full bg-[#00AEEF]/20 blur-3xl"
                        aria-hidden="true"
                      />
                      <div
                        className="pointer-events-none absolute -right-6 -bottom-6 hidden h-full w-full rounded-3xl border border-[#0B6C92]/10 bg-[#00AEEF]/10 lg:block"
                        aria-hidden="true"
                      />
                      <div className="relative overflow-hidden rounded-2xl shadow-none ring-1 ring-black/10 transition-all duration-500 group-hover:ring-cyan/30 dark:ring-white/10">
                        <img
                          src={service.img}
                          alt={cardText(service.id, "title")}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-[300px] lg:h-[440px] object-cover grayscale brightness-[0.92] contrast-[1.1] saturate-[1.1] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                        />
                        <span aria-hidden="true" className="absolute left-3 top-3 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-cyan/60 transition-colors duration-500 group-hover:border-cyan" />
                        <span aria-hidden="true" className="absolute right-3 top-3 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-cyan/60 transition-colors duration-500 group-hover:border-cyan" />
                        <span aria-hidden="true" className="absolute bottom-3 right-3 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-cyan/60 transition-colors duration-500 group-hover:border-cyan" />
                        <div
                          className="absolute inset-0 bg-gradient-to-tr from-[#0B6C92]/25 via-transparent to-[#22D3EE]/10"
                          aria-hidden="true"
                        />
                        <TechHudOverlay
                          icon={<HudIcon className="h-11 w-11 text-cyan/85" strokeWidth={1.25} />}
                          labels={hudConfig[service.id].labels}
                        />
                        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#07111F]/85 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan shadow ring-1 ring-inset ring-white/15 backdrop-blur-md">
                          <OrangeDot />
                          {t(`servicesPage.categories.${service.id}.imageBadge`)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={flip ? "lg:order-1" : ""}
                  >
                    <IconTile size="lg" className="mb-6">
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </IconTile>
                    <span className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan">
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-cyan/30 bg-cyan/[0.06] px-2 tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="h-px w-10 bg-cyan/40" aria-hidden="true" />
                      {cardText(service.id, "title")}
                    </span>
                    <h3 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-6">
                      {cardText(service.id, "title")}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                      {cardText(service.id, "cardDesc")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveId(service.id)}
                      className="group/btn inline-flex items-center gap-2.5 rounded-full border border-black/20 bg-transparent px-6 py-3 text-foreground text-base font-semibold transition-all duration-300 hover:gap-3.5 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A] w-fit dark:border-white/25 dark:hover:border-white dark:hover:bg-white dark:hover:text-[#1A1A1A]"
                    >
                      {t("servicesPage.cardCta")}
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </button>
                  </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Why us */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan/[0.05] rounded-full blur-[120px]" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                {t("servicesPage.whyUs.title")}
              </h2>
              <div className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-cyan to-transparent" aria-hidden="true" />
            </motion.div>
            <div className="mx-auto mb-10 flex max-w-5xl items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-cyan/60" />
              <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyUs.map((item, i) => {
                const WhyIcon = item.icon;
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                    className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-black/10 bg-white/[0.6] p-6 shadow-none backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan/40"
                  >
                    <span aria-hidden="true" className="absolute left-2.5 top-2.5 h-3.5 w-3.5 rounded-tl-md border-l border-t border-cyan/40 transition-colors duration-300 group-hover:border-cyan" />
                    <span aria-hidden="true" className="absolute right-2.5 top-2.5 h-3.5 w-3.5 rounded-tr-md border-r border-t border-cyan/40 transition-colors duration-300 group-hover:border-cyan" />
                    <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 rounded-br-md border-b border-r border-cyan/40 transition-colors duration-300 group-hover:border-cyan" />
                    <IconTile size="md" className="relative transition-all duration-300 group-hover:border-cyan/50 group-hover:shadow-[0_0_14px_rgba(0,174,239,0.28)]">
                      <WhyIcon className="h-5 w-5" strokeWidth={1.75} />
                    </IconTile>
                    <p className="pt-2.5 font-medium text-foreground/90 leading-relaxed">
                      {t(`servicesPage.whyUs.points.${item.key}`)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        {/* CTA */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          {/* ambient glow */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-cyan/[0.05] blur-[130px]" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/[0.7] shadow-none backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" aria-hidden="true" />

              <div className="relative z-10 grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:p-16">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan">
                    <OrangeDot />
                    {t("servicesPage.cta.eyebrow")}
                  </span>
                  <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-[2.75rem]">
                    {t("servicesPage.cta.title")}
                  </h2>
                  <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
                    <Link
                      to="/devis"
                      className="group relative inline-flex w-full overflow-hidden sm:w-auto items-center justify-center gap-3 rounded-full bg-[#1A1A1A] px-9 py-4 font-bold text-white shadow-[0_8px_20px_-12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-black hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1A1A] dark:bg-white dark:text-[#1A1A1A] dark:hover:bg-zinc-200 dark:focus-visible:outline-white"
                    >
                      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                      {t("servicesPage.cta.btnQuote")}
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-9 py-4 font-bold text-cyan transition-all duration-300 hover:gap-3.5 hover:text-[#0B9BCE] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan dark:hover:text-white"
                    >
                      {t("servicesPage.cta.btnContact")}
                      <ArrowRight className="h-5 w-5 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>

                <div className="relative mx-auto hidden h-72 w-full max-w-sm items-center justify-center sm:flex" aria-hidden="true">
                  <div className="absolute h-64 w-64 rounded-full border border-cyan/15" />
                  <div className="absolute h-44 w-44 rounded-full border border-cyan/25" />
                  <div className="absolute h-56 w-56 rounded-full bg-cyan/[0.05] blur-2xl" />
                  <IconTile size="lg" className="relative h-20 w-20 rounded-3xl shadow-[0_0_24px_rgba(0,174,239,0.22)]">
                    <ShieldCheck className="h-10 w-10" strokeWidth={1.5} />
                  </IconTile>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />

      <ServiceModal service={activeService ?? null} onClose={closeServiceModal} />
    </div>
  );
};

export default ServicesPage;
