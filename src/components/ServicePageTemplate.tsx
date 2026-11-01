import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { FinalCTA } from "@/components/home/FinalCTA";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ServicePageTemplateProps {
  imageUrl: string;
  icon: LucideIcon;
  category: string;
  title: string;
  accent?: string;
  intro: string;
  sectionTitle: string;
  paragraphs: string[];
  features: string[];
}

export function ServicePageTemplate({
  imageUrl,
  icon: Icon,
  category,
  title,
  accent,
  intro,
  sectionTitle,
  paragraphs,
  features,
}: ServicePageTemplateProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white transition-colors duration-500 dark:bg-[#09090b]">
      <main className="px-4 pb-4 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0B6C92] transition-colors hover:text-[#00AEEF] dark:text-[#00AEEF] dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {t("servicePage.back")}
          </Link>

          <div className="relative mt-6">
            <div
              className="pointer-events-none absolute -top-16 right-[-10%] h-72 w-72 rounded-full bg-[#00AEEF]/15 blur-3xl"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="group relative overflow-hidden rounded-[2rem] border border-black/[0.06] shadow-[0_32px_80px_-32px_rgba(11,31,63,0.4)] dark:border-white/[0.08] dark:shadow-[0_32px_80px_-32px_rgba(0,174,239,0.15)] sm:rounded-[2.5rem]"
            >
              <img
                src={imageUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-100"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/95 via-[#0B1020]/65 to-[#0B1020]/25"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#00AEEF]/25 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/50 to-transparent"
                aria-hidden="true"
              />

              <div className="relative flex min-h-[520px] flex-col justify-end gap-6 p-8 sm:p-12 lg:min-h-[600px] lg:p-16">
                <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00AEEF] backdrop-blur-md">
                  <Icon className="h-3.5 w-3.5" />
                  {category}
                </span>

                <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {title}
                  {accent && <span className="text-[#00AEEF]"> {accent}</span>}
                </h1>

                <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg sm:leading-9">
                  {intro}
                </p>

                <div className="mt-2 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <Button asChild variant="hero" size="lg" className="rounded-full">
                    <Link to="/contact">
                      {t("servicePage.cta")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B6C92] dark:text-[#00AEEF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00AEEF]" aria-hidden="true" />
                {t("servicePage.detailLabel")}
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#0B1F3F] dark:text-white sm:text-4xl">
                {sectionTitle}
              </h2>
              <div className="mt-6 space-y-5">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-8 text-zinc-600 dark:text-zinc-400">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: EASE }}
                  className="group rounded-2xl border border-black/[0.06] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00AEEF]/40 hover:shadow-[0_20px_44px_-20px_rgba(11,31,63,0.18)] dark:border-white/[0.08] dark:bg-[#11141D] dark:hover:border-[#00AEEF]/40"
                >
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full bg-[#00AEEF]/10 text-[#00AEEF] ring-1 ring-inset ring-[#00AEEF]/25 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#0B1F3F] dark:text-white">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}