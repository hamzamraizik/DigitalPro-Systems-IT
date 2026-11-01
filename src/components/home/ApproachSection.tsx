import { motion } from "framer-motion";

import { Container } from "@/components/home/Container";
import { SectionHeader } from "@/components/home/SectionHeader";
import { processSteps } from "@/data/home";
import { useTranslation } from "react-i18next";

export const ApproachSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-zinc-50 dark:bg-[#111111] py-20 sm:py-24 lg:py-28 transition-colors duration-500">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <SectionHeader
            eyebrow={t("approach.eyebrow")}
            title={t("approach.title")}
            description={t("approach.description")}
          />

          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.42, delay: index * 0.05 }}
                className="grid gap-5 rounded-[8px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:grid-cols-[4rem_1fr] sm:p-7 transition-colors duration-500"
              >
                <span className="font-display text-3xl font-semibold leading-none text-[#00AEEF]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#111111] dark:text-white">
                    {step.tKey ? t(`approach.steps.${step.tKey}.title`) : step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#555555] dark:text-zinc-400 sm:text-base">
                    {step.tKey ? t(`approach.steps.${step.tKey}.description`) : step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
