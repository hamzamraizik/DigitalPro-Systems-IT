import { motion, useReducedMotion } from "framer-motion";

import { whyUsPoints } from "@/data/home";
import { useTranslation } from "react-i18next";

export const ExpertiseSection = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-page py-20 transition-colors duration-500 md:py-24">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#00AEEF]/[0.05] blur-3xl dark:bg-[#00AEEF]/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-400">
              {t("expertise.whyEyebrow")}
            </p>
            <h3 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {t("expertise.whyTitle")}
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-slate-600 dark:text-gray-400">
              {t("expertise.whyText")}
            </p>

            <div className="mt-10 flex items-center gap-5 border-t border-slate-900/10 pt-8 dark:border-white/10">
              <span className="font-display text-6xl font-bold leading-none tabular-nums text-slate-900 dark:text-white md:text-7xl">
                {t("expertise.statValue").replace("+", "")}
                <span className="text-sky-500 dark:text-sky-400">+</span>
              </span>
              <div className="h-12 w-px bg-slate-900/15 dark:bg-white/15" aria-hidden="true" />
              <p className="max-w-[9rem] text-sm leading-snug text-slate-500 dark:text-gray-400">
                {t("expertise.statLabel")}
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {whyUsPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.li
                  key={point.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="flex items-center gap-4 rounded-xl border border-slate-900/10 bg-slate-900/[0.03] p-4 transition-colors duration-200 hover:border-sky-500/40 hover:bg-slate-900/[0.06] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-sky-400/40 dark:hover:bg-white/[0.06]"
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-600 shadow-none dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-400 dark:shadow-[0_0_8px_rgba(0,174,239,0.3)]"
                    aria-hidden="true"
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] font-medium leading-snug text-slate-800 dark:text-gray-100">
                    {t(`whyUsPoints.p${index + 1}`)}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};