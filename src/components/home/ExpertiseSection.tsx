import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/home/Container";
import { expertisePoints, whyUsPoints } from "@/data/home";
import { useTranslation } from "react-i18next";

const smallAccent = [
  {
    chip: "bg-[#00AEEF]/10 text-[#0B6C92] ring-[#00AEEF]/25",
    glow: "bg-[#00AEEF]",
  },
  {
    chip: "bg-[#00AEEF]/15 text-[#0B6C92] ring-[#00AEEF]/30",
    glow: "bg-[#00AEEF]",
  },
  {
    chip: "bg-[#FF8A3D]/10 text-[#B45309] ring-[#FF8A3D]/25",
    glow: "bg-[#FF8A3D]",
  },
];

export const ExpertiseSection = () => {
  const { t } = useTranslation();

  const [feature, ...rest] = expertisePoints;

  return (
    <section className="relative overflow-hidden bg-page pt-16 pb-20 transition-colors duration-500 sm:pt-20 sm:pb-24 lg:pb-28">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#00AEEF]/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B6C92] dark:text-[#00AEEF]">
              {t("expertise.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[#111111] dark:text-white sm:text-4xl">
              {t("expertise.title")}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[#555555] dark:text-zinc-400">
              {t("expertise.description")}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 lg:grid-cols-2">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-card p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:border-[#00AEEF]/40 hover:shadow-[0_24px_48px_-24px_rgba(11,108,146,0.18)] sm:p-10 dark:border-white/[0.08] dark:hover:border-[#00AEEF]/25"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-[#00AEEF]/20 via-[#00AEEF]/10 to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/70 to-transparent"
                aria-hidden="true"
              />

              <div className="relative flex h-full flex-col">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00AEEF]/25 to-[#00AEEF]/10 text-[#0B6C92] ring-1 ring-inset ring-[#00AEEF]/30 transition-transform duration-500 group-hover:scale-110 dark:text-[#00AEEF]">
                  <feature.icon className="h-7 w-7" aria-hidden="true" />
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold leading-snug text-[#111111] dark:text-white">
                  {feature.tKey ? t(`expertise.points.${feature.tKey}.title`) : feature.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-7 text-[#555555] dark:text-zinc-400">
                  {feature.tKey
                    ? t(`expertise.points.${feature.tKey}.description`)
                    : feature.description}
                </p>

                <a
                  href="/services"
                  className="group/link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0B6C92] transition-colors dark:text-[#00AEEF]"
                >
                  {t("servicesPage.cardCta")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </motion.article>

            <div className="flex flex-col gap-5">
              {rest.map((point, index) => {
                const accent = smallAccent[index % smallAccent.length];
                return (
                  <motion.article
                    key={point.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: 0.08 * index }}
                    className="group relative flex flex-1 items-center gap-5 overflow-hidden rounded-2xl border border-black/[0.06] bg-black/[0.02] p-6 transition-all duration-500 hover:translate-x-1 hover:border-[#00AEEF]/40 hover:bg-black/[0.04] hover:shadow-[0_20px_40px_-24px_rgba(11,108,146,0.16)] dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-[#00AEEF]/25 dark:hover:bg-white/[0.05]"
                  >
                    <span
                      className={`pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-20 ${accent.glow}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 ring-inset ${accent.chip}`}
                      aria-hidden="true"
                    >
                      <point.icon className="h-5 w-5" />
                    </span>
                    <span className="relative z-10">
                      <span className="block font-display text-base font-bold leading-snug text-[#111111] dark:text-white">
                        {point.tKey ? t(`expertise.points.${point.tKey}.title`) : point.title}
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-[#555555] dark:text-zinc-400">
                        {point.tKey
                          ? t(`expertise.points.${point.tKey}.description`)
                          : point.description}
                      </span>
                    </span>
                    <ArrowRight
                      className="relative z-10 ml-auto h-4 w-4 shrink-0 -translate-x-1 text-[#0B6C92] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-[#00AEEF]"
                      aria-hidden="true"
                    />
                  </motion.article>
                );
              })}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:mt-24 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="flex items-end gap-4">
                <span className="mb-2 h-3 w-3 shrink-0 rounded-full bg-[#FF8A3D] shadow-[0_0_10px_rgba(255,138,61,0.7)]" aria-hidden="true" />
                <span className="font-display text-6xl font-bold leading-none text-[#111111] dark:text-white">
                  {t("expertise.statValue")}
                </span>
                <span className="pb-1.5 text-sm font-medium leading-5 text-[#555555] dark:text-zinc-400">
                  {t("expertise.statLabel")}
                </span>
              </div>

              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B6C92] dark:text-[#00AEEF]">
                {t("expertise.whyEyebrow")}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-[#111111] dark:text-white sm:text-3xl">
                {t("expertise.whyTitle")}
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-7 text-[#555555] dark:text-zinc-400">
                {t("expertise.whyText")}
              </p>
            </div>

            <ul className="grid grid-cols-1 content-start gap-x-10 gap-y-4 sm:grid-cols-2">
              {whyUsPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.li
                    key={point.title}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group flex items-center gap-4"
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#00AEEF]/40 bg-[#00AEEF]/10 text-[#0B6C92] shadow-[0_0_8px_rgba(0,174,239,0.3)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-[#00AEEF]/20 group-hover:text-[#0B1F3F] dark:text-[#00AEEF] dark:group-hover:text-[#00AEEF]"
                      aria-hidden="true"
                    >
                      <Icon className="h-[17px] w-[17px]" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm font-semibold leading-snug text-[#111111] transition-colors group-hover:text-[#0B6C92] dark:text-zinc-300 dark:group-hover:text-[#00AEEF]">
                      {t(`whyUsPoints.p${index + 1}`)}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};