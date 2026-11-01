import { motion } from "framer-motion";

import { Container } from "@/components/home/Container";
import { SectionHeader } from "@/components/home/SectionHeader";
import { expertisePoints, whyUsPoints } from "@/data/home";
import { useTranslation } from "react-i18next";

export const ExpertiseSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-zinc-50 dark:bg-[#0A0A0A] py-24 sm:py-32 transition-colors duration-500">
      {/* Decorative ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-20rem]">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#00AEEF] to-[#00AEEF]/20 opacity-10 dark:opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#00AEEF] backdrop-blur-sm"
          >
            {t("expertise.eyebrow")}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold tracking-tight text-[#111111] dark:text-white sm:text-5xl"
          >
            {t("expertise.title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-[#555555] dark:text-zinc-400"
          >
            {t("expertise.description")}
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {expertisePoints.map((point, index) => {
              const colors = [
                { text: "text-rose-500", bg: "bg-rose-500/10 dark:bg-rose-500/20", border: "group-hover:border-rose-500/30", glow: "text-rose-500/[0.04] dark:text-rose-500/[0.06]", iconHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400" },
                { text: "text-[#00AEEF]", bg: "bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20", border: "group-hover:border-[#00AEEF]/30", glow: "text-[#00AEEF]/[0.04] dark:text-[#00AEEF]/[0.06]", iconHover: "group-hover:text-[#00AEEF] dark:group-hover:text-[#00AEEF]" },
                { text: "text-violet-500", bg: "bg-violet-500/10 dark:bg-violet-500/20", border: "group-hover:border-violet-500/30", glow: "text-violet-500/[0.04] dark:text-violet-500/[0.06]", iconHover: "group-hover:text-violet-600 dark:group-hover:text-violet-400" },
                { text: "text-emerald-500", bg: "bg-emerald-500/10 dark:bg-emerald-500/20", border: "group-hover:border-emerald-500/30", glow: "text-emerald-500/[0.04] dark:text-emerald-500/[0.06]", iconHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400" },
              ][index % 4];

              return (
                <motion.article
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white dark:bg-[#111111] p-8 sm:p-10 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.03)]"
                >
                  {/* Subtle border overlay */}
                  <div className={`pointer-events-none absolute inset-0 rounded-[24px] border border-black/[0.04] dark:border-white/[0.04] transition-colors duration-500 ${colors.border}`} />
                  
                  {/* Large Background Number */}
                  <div className={`absolute -right-6 -top-10 select-none font-display text-[120px] font-bold transition-transform duration-500 group-hover:-translate-y-4 group-hover:scale-110 ${colors.glow}`}>
                    0{index + 1}
                  </div>

                  <div className="relative z-10">
                    <div className={`mb-8 inline-flex h-14 w-14 items-center justify-center rounded-[16px] transition-colors duration-500 ${colors.bg}`}>
                      <point.icon className={`h-6 w-6 transition-colors duration-500 ${colors.text} ${colors.iconHover}`} aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#111111] dark:text-white">
                      {point.tKey ? t(`expertise.points.${point.tKey}.title`) : point.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[#555555] dark:text-zinc-400">
                      {point.tKey ? t(`expertise.points.${point.tKey}.description`) : point.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mx-auto mt-24 max-w-5xl rounded-[24px] border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-8 backdrop-blur-xl sm:p-10">
          <div className="text-center">
            <h3 className="font-display text-xl font-bold text-[#111111] dark:text-white">
              {t("expertise.whyUs")}
            </h3>
            <div className="mt-10 grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-3">
              {whyUsPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="group flex flex-col items-center gap-3 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#00AEEF]/20 dark:group-hover:bg-[#00AEEF]/30">
                      <Icon className="h-5 w-5 text-[#00AEEF] transition-colors duration-300" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-semibold text-[#111111] dark:text-zinc-300">
                      {t(`whyUsPoints.p${index + 1}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
