import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/home/Container";
import { SectionHeader } from "@/components/home/SectionHeader";
import { useTranslation } from "react-i18next";
import { caseStudyMetrics } from "@/data/home";

const CaseStudyVisual = () => {
  const { t } = useTranslation();

  return (
    <div className="group relative">
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-60 w-60 rounded-full bg-[#00AEEF]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-6 -bottom-6 hidden h-full w-full rounded-3xl border border-[#0B6C92]/10 bg-[#00AEEF]/10 lg:block"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_32px_64px_-32px_rgba(11,108,146,0.3)] transition-all duration-500 group-hover:border-[#00AEEF]/50 dark:border-white/[0.08]">
        <img
          src="/case-study-realistic.png"
          alt={t("caseStudy.title")}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 sm:aspect-[4/3] lg:aspect-square"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/75 via-[#0B1020]/10 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute bottom-5 left-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00AEEF]/30 bg-[#0B1020]/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#00AEEF] backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF8A3D] shadow-[0_0_8px_rgba(255,138,61,0.8)]" aria-hidden="true" />
            {t("caseStudy.badgeText")}
          </span>
        </div>
      </div>
    </div>
  );
};

const MetricStat = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.45, delay }}
    className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-black/[0.02] p-6 transition-colors duration-500 sm:p-7 dark:border-white/[0.08] dark:bg-white/[0.03]"
  >
    <div
      className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-[#00AEEF]/15 blur-2xl"
      aria-hidden="true"
    />
    <p className="font-display text-4xl font-semibold leading-none tracking-tight text-[#0B6C92] dark:text-[#00AEEF] sm:text-5xl">
      {value}
    </p>
    <p className="mt-3 text-sm leading-6 text-[#555555] dark:text-white/[0.55]">{label}</p>
  </motion.div>
);

export const FeaturedCaseStudy = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-page py-20 transition-colors duration-500 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={t("caseStudy.badge")}
            title={t("caseStudy.title")}
            description={t("caseStudy.description")}
          />

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {caseStudyMetrics.map((metric, index) => (
              <MetricStat
                key={metric.value}
                value={metric.value}
                label={t(`caseStudy.metrics.m${index + 1}`)}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
            >
              <CaseStudyVisual />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#0B6C92] dark:text-[#00AEEF]">
                {t("caseStudy.deliveredLabel")}
              </p>

              <div className="grid gap-4">
                {[1, 2, 3].map((num) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: 0.15 + num * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#00AEEF]/15 text-[#0B6C92] ring-1 ring-inset ring-[#00AEEF]/30 dark:text-[#00AEEF]"
                      aria-hidden="true"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-7 text-[#555555] dark:text-zinc-400 sm:text-base">
                      {t(`caseStudy.highlights.h${num}`)}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/projets"
                className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#0B6C92] transition-colors hover:text-[#0A86C8] dark:text-[#00AEEF] dark:hover:text-white sm:text-base"
              >
                {t("caseStudy.cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};