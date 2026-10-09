import { motion } from "framer-motion";
import {
  ClipboardList,
  Compass,
  LifeBuoy,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/home/Container";
import { processSteps } from "@/data/home";
import { useTranslation } from "react-i18next";

const stepIcon: LucideIcon[] = [ClipboardList, Compass, Rocket, LifeBuoy];

export const ApproachSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-page py-20 transition-colors duration-500 sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#00AEEF]/10 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B6C92] dark:text-[#00AEEF]">
              {t("approach.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[#111111] dark:text-white sm:text-4xl">
              {t("approach.title")}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[#555555] dark:text-zinc-400">
              {t("approach.description")}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = stepIcon[index % stepIcon.length];
              return (
                <motion.article
                  key={step.tKey}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-black/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#00AEEF]/40 hover:bg-black/[0.04] hover:shadow-[0_24px_48px_-24px_rgba(11,108,146,0.18)] dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-[#00AEEF]/25 dark:hover:bg-white/[0.05]"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/70 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-semibold leading-none text-black/10 transition-colors duration-500 group-hover:text-[#0B6C92] dark:text-white/15 dark:group-hover:text-cyan">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl bg-[#00AEEF]/15 text-[#0B6C92] ring-1 ring-inset ring-[#00AEEF]/30 transition-transform duration-500 group-hover:scale-110 dark:text-[#00AEEF]"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-5 h-px bg-gradient-to-r from-[#00AEEF]/50 via-[#00AEEF]/15 to-transparent" aria-hidden="true" />

                  <h3 className="mt-5 font-display text-lg font-bold leading-snug text-[#111111] dark:text-white">
                    {step.tKey ? t(`approach.steps.${step.tKey}.title`) : step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#555555] dark:text-zinc-400">
                    {step.tKey ? t(`approach.steps.${step.tKey}.description`) : step.description}
                  </p>

                  <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-[#00AEEF]/35 bg-[#00AEEF]/10 px-3 py-1 pt-1.5 text-xs font-semibold text-[#0B6C92] dark:text-[#00AEEF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D]" aria-hidden="true" />
                    {step.tKey ? t(`approach.steps.${step.tKey}.tag`) : ""}
                  </span>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};