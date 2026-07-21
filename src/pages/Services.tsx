import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Video, ShieldCheck, Network, Terminal, BarChart3, Package, ArrowRight,
  ClipboardCheck, Compass, Rocket, Headphones,
} from "lucide-react";
import ServiceModal from "@/components/ServiceModal";
import { getServiceCategory } from "@/data/servicesData";

const methodologyKeys = [
  { key: "audit", icon: ClipboardCheck },
  { key: "architecture", icon: Compass },
  { key: "deploiement", icon: Rocket },
  { key: "support", icon: Headphones },
];

// Shared styling so every bento card has identical border, radius, hover and
// backdrop treatment — only spacing/layout differs per card.
const BENTO_CARD =
  "scroll-mt-28 bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl group hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,174,239,0.15)] dark:hover:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-500";

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
    <div className="min-h-screen bg-page transition-colors duration-500">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        {/* Hero */}
        <header className="relative pt-20 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 text-cyan text-sm font-medium mb-6"
            >
              {t("servicesPage.hero.badge")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground"
            >
              {t("servicesPage.hero.titlePrefix")}{" "}
              <span className="bg-gradient-to-r from-cyan to-cyan-light bg-clip-text text-transparent">
                {t("servicesPage.hero.titleHighlight")}
              </span>
            </motion.h1>
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

        {/* Bento Grid des services */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-stretch">
            {/* 1. Sécurité électronique */}
 {/* 1. Sécurité électronique */}
<motion.div
  id="securite-electronique"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className={`${BENTO_CARD} lg:col-span-3 p-8 flex flex-col h-full`}
>
  {/* Image */}
  <div className="relative h-52 rounded-xl overflow-hidden mb-6">
    <img
      src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80"
      alt={cardText("securite-electronique", "title")}
      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
    />

    {/* Shadow */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
  </div>

  {/* Icône */}
  <Video className="w-9 h-9 text-cyan mb-6" />

  {/* Titre */}
  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
    {cardText("securite-electronique", "title")}
  </h3>

  {/* Description */}
  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
    {cardText("securite-electronique", "cardDesc")}
  </p>

  {/* Bouton */}
  <button
    type="button"
    onClick={() => setActiveId("securite-electronique")}
    className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all mt-auto w-fit"
  >
    {t("servicesPage.cardCta")}
    <ArrowRight className="w-4 h-4" />
  </button>
</motion.div>

            {/* 2. Cybersécurité */}
<motion.div
  id="cybersecurite"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.05 }}
  className={`${BENTO_CARD} group lg:col-span-3 p-8 flex flex-col h-full`}
>
  {/* Image */}
  <div className="relative h-52 rounded-xl overflow-hidden mb-6">
    <img
      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80"
      alt={cardText("cybersecurite", "title")}
      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
    />

    {/* Shadow */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
  </div>

  <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center mb-6 border border-cyan/20">
    <ShieldCheck className="w-7 h-7 text-cyan" />
  </div>

  <h3 className="font-display text-xl font-bold text-foreground mb-4">
    {cardText("cybersecurite", "title")}
  </h3>

  <p className="text-muted-foreground text-sm mb-6">
    {cardText("cybersecurite", "cardDesc")}
  </p>

  <button
    type="button"
    onClick={() => setActiveId("cybersecurite")}
    className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all mt-auto w-fit"
  >
    {t("servicesPage.cardCta")}
    <ArrowRight className="w-4 h-4" />
  </button>
</motion.div>

              {/* 3. Réseaux & Systèmes */}
              <motion.div
                id="infrastructures-reseaux"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`${BENTO_CARD} lg:col-span-3 relative overflow-hidden p-8 flex flex-col h-full`}
              >
                <div className="relative z-10 flex flex-col flex-1">
                 <div className="relative h-52 rounded-xl overflow-hidden mb-6">
  <img
    src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
    alt={cardText("infrastructures-reseaux", "title")}
    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
</div>
                  <Network className="w-9 h-9 text-cyan mb-6" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    {cardText("infrastructures-reseaux", "title")}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {cardText("infrastructures-reseaux", "cardDesc")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveId("infrastructures-reseaux")}
                    className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all mt-auto w-fit"
                  >
                    {t("servicesPage.cardCta")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan/5 rounded-full blur-3xl group-hover:bg-cyan/10 transition-all" />
              </motion.div>

              {/* 4. Gestion de parc IT */}
              <motion.div
                id="gestion-parc"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className={`${BENTO_CARD} lg:col-span-3 p-8 flex flex-col h-full`}
              >
                <div className="relative h-52 rounded-xl overflow-hidden mb-6">
  <img
    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80"
    alt={cardText("gestion-parc", "title")}
    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
</div>
                <Terminal className="w-9 h-9 text-cyan mb-6" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {cardText("gestion-parc", "title")}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {cardText("gestion-parc", "cardDesc")}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs text-muted-foreground border border-black/10 dark:border-white/10">Audit</span>
                  <span className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs text-muted-foreground border border-black/10 dark:border-white/10">Support</span>
                  <span className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs text-muted-foreground border border-black/10 dark:border-white/10">Monitoring</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId("gestion-parc")}
                  className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all mt-auto w-fit"
                >
                  {t("servicesPage.cardCta")} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* 5. ERP, CRM & Logiciels */}
              <motion.div
                id="developpement"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${BENTO_CARD} lg:col-span-3 p-8 flex flex-col h-full`}
              >
<div className="relative h-52 rounded-xl overflow-hidden mb-6">
  <img
    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
    alt={cardText("developpement", "title")}
    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
</div>

<div className="flex items-start justify-between mb-8">                  <BarChart3 className="w-9 h-9 text-cyan" />
                  <span className="text-[10px] uppercase tracking-widest text-cyan font-bold bg-cyan/10 px-2 py-1 rounded">
                    {t("servicesPage.customDevBadge")}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  {cardText("developpement", "title")}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  {cardText("developpement", "cardDesc")}
                </p>
                <div className="h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-cyan w-3/4 group-hover:w-full transition-all duration-1000" />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId("developpement")}
                  className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all mt-auto w-fit"
                >
                  {t("servicesPage.cardCta")} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* 6. Matériel professionnel */}
            {/* 6. Matériel professionnel */}
<motion.div
  id="distribution"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.25 }}
  className={`${BENTO_CARD} lg:col-span-3 border-l-4 border-l-cyan p-8 flex flex-col h-full`}
>
  {/* Image */}
  <div className="relative h-52 rounded-xl overflow-hidden mb-6">
    <img
      src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200"
      alt={cardText("distribution", "title")}
      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
    />

    {/* Shadow */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
  </div>

  <Package className="w-9 h-9 text-cyan mb-6" />

  <h3 className="font-display text-xl font-bold text-foreground mb-4">
    {cardText("distribution", "title")}
  </h3>

  <p className="text-muted-foreground mb-6 text-sm">
    {cardText("distribution", "cardDesc")}
  </p>

  <div className="flex -space-x-3 mb-6">
    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-background bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-white">
      DELL
    </div>
    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-background bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-white">
      HP
    </div>
    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-background bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-white">
      CISCO
    </div>
  </div>

  <button
    type="button"
    onClick={() => setActiveId("distribution")}
    className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all mt-auto w-fit"
  >
    {t("servicesPage.cardCta")}
    <ArrowRight className="w-4 h-4" />
  </button>
</motion.div>
            </div>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 lg:mb-20"
            >
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-6">
                {t("servicesPage.methodology.title")}
              </h2>
              <div className="w-24 h-1 bg-cyan mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {methodologyKeys.map((step, i) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="mb-8 relative">
                    <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-cyan group-hover:bg-cyan/10 group-hover:border-cyan/50 transition-all duration-300">
                      <step.icon className="w-7 h-7" />
                    </div>
                    {i < methodologyKeys.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-full h-[1px] bg-gradient-to-r from-black/20 dark:from-white/20 to-transparent -translate-y-1/2" />
                    )}
                  </div>
                  <h4 className="font-display text-lg font-bold text-foreground mb-4">
                    {t(`servicesPage.methodology.steps.${step.key}.title`)}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
              <span className="relative z-10 text-cyan text-sm font-semibold uppercase tracking-[0.2em] mb-8 block">
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