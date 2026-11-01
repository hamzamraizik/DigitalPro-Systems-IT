import Footer from "@/components/Footer";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Camera, Video, ShieldCheck, Network, Terminal, Headset, ArrowRight,
  ClipboardCheck, Compass, Rocket, Headphones,
} from "lucide-react";
import ServiceModal from "@/components/ServiceModal";
import { getServiceCategory } from "@/data/servicesData";
import { OrangeDot } from "@/components/ui/OrangeDot";
import { IconTile } from "@/components/ui/IconTile";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TechHudOverlay } from "@/components/ui/TechHudOverlay";

const methodologyKeys = [
  { key: "audit", icon: ClipboardCheck },
  { key: "architecture", icon: Compass },
  { key: "deploiement", icon: Rocket },
  { key: "support", icon: Headphones },
];

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
        <header className="relative overflow-hidden pt-20 pb-20">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan/10 rounded-full blur-[120px]" />
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
              className="font-display text-4xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground"
            >
              {t("servicesPage.hero.titlePrefix")}{" "}
              <span className="text-cyan">{t("servicesPage.hero.titleHighlight")}</span>
            </motion.h1>
            <div className="mx-auto mb-6 h-[3px] w-20 rounded-full bg-cyan" aria-hidden="true" />
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

{/* Services — alternating editorial layout */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              const HudIcon = hudConfig[service.id].icon;
              const flip = i % 2 === 1;
              return (
                <div
                  id={service.id}
                  key={service.id}
                  className="group scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-14 lg:py-20 border-b border-black/10 dark:border-white/10 last:border-none"
                >
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
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/15 dark:shadow-black/40">
                        <img
                          src={service.img}
                          alt={cardText(service.id, "title")}
                          className="w-full h-[300px] lg:h-[440px] object-cover grayscale brightness-[0.92] contrast-[1.1] saturate-[1.1] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-tr from-[#0B6C92]/25 via-transparent to-[#22D3EE]/10"
                          aria-hidden="true"
                        />
                        <TechHudOverlay
                          icon={<HudIcon className="h-11 w-11 text-cyan/85" strokeWidth={1.25} />}
                          labels={hudConfig[service.id].labels}
                        />
                        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#07111F]/85 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan shadow-lg ring-1 ring-inset ring-white/15 backdrop-blur-md">
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
                    <span className="block text-sm font-semibold uppercase tracking-[0.25em] text-cyan mb-4">
                      0{i + 1} <span className="mx-1 opacity-50">—</span> {cardText(service.id, "title")}
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
                      className="inline-flex items-center gap-2 text-cyan text-lg font-semibold hover:gap-4 transition-all w-fit"
                    >
                      {t("servicesPage.cardCta")}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Méthodologie */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-cyan/[0.06] blur-[140px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center lg:mb-20"
            >
              <Eyebrow className="mb-6">{t("servicesPage.hero.badge")}</Eyebrow>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground lg:text-5xl">
                {t("servicesPage.methodology.title")}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                {t("servicesPage.methodology.subtitle")}
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {methodologyKeys.map((step, i) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#00AEEF]/40 hover:shadow-[0_24px_48px_-24px_rgba(11,108,146,0.18)] dark:border-white/[0.08] dark:hover:border-[#00AEEF]/25 lg:p-8"
                >
                  <IconTile size="md" className="mb-6">
                    <step.icon className="h-5 w-5" />
                  </IconTile>
                  <h4 className="font-display text-lg font-bold tracking-tight text-foreground">
                    {t(`servicesPage.methodology.steps.${step.key}.title`)}
                  </h4>
                  <div className="mt-4 h-px w-10 bg-cyan/40 transition-all duration-500 group-hover:w-20 group-hover:bg-[#00AEEF]/70" aria-hidden="true" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {t(`servicesPage.methodology.steps.${step.key}.desc`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md border border-black/10 dark:border-white/10 rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan/10 rounded-full blur-[80px]" />
              <span className="relative z-10 inline-flex items-center gap-2 text-cyan text-sm font-semibold uppercase tracking-[0.2em] mb-8">
                <OrangeDot />
                {t("servicesPage.cta.eyebrow")}
              </span>
              <h2 className="relative z-10 font-display text-3xl lg:text-5xl font-bold text-foreground mb-10 leading-tight">
                {t("servicesPage.cta.title")}
              </h2>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6">
                <Link
                  to="/contact"
                  className="bg-cyan hover:bg-cyan/90 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,174,239,0.4)]"
                >
                  {t("servicesPage.cta.btnQuote")}
                </Link>
                <Link
                  to="/contact"
                  className="border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-foreground px-10 py-4 rounded-xl transition-all duration-300"
                >
                  {t("servicesPage.cta.btnContact")}
                </Link>
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
