import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/home/Container";
import { MetricItem } from "@/components/home/MetricItem";
import { SectionHeader } from "@/components/home/SectionHeader";
import { useTranslation } from "react-i18next";
import { caseStudyHighlights, caseStudyMetrics } from "@/data/home";

const CaseStudyVisual = () => {
  const { t } = useTranslation();
  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900 shadow-2xl ring-1 ring-white/5 transition-all duration-700 hover:border-[#00AEEF]/50 aspect-square sm:aspect-[4/3] lg:aspect-square">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
         <img 
           src="/case-study-realistic.png" 
           alt="Security Operations Center (SOC) Architecture" 
           className="relative z-10 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
         />
         <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />
         <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/10 rounded-[24px] pointer-events-none" />
      </div>

      {/* Floating badges */}
      <div className="absolute bottom-6 left-6 z-20 flex gap-2 pointer-events-none">
        <span className="flex items-center gap-2 rounded-lg border border-[#00AEEF]/30 bg-zinc-950/80 px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#00AEEF] shadow-lg backdrop-blur-md">
           <span className="h-2 w-2 animate-pulse rounded-full bg-[#00AEEF]" />
           {t("caseStudy.badgeText", "Architecture 100% Déployée")}
        </span>
      </div>
    </div>
  );
};

export const FeaturedCaseStudy = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-zinc-100 dark:bg-[#0A0A0A] py-20 text-[#111111] dark:text-white sm:py-24 lg:py-28 transition-colors duration-500">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <CaseStudyVisual />
          </motion.div>

          <div>
            <SectionHeader
              eyebrow={t("caseStudy.badge")}
              title={t("caseStudy.title")}
              description={t("caseStudy.description")}
            />

            <div className="mt-8 grid gap-3">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00AEEF]" aria-hidden="true" />
                  <p className="text-sm leading-7 text-[#555555] dark:text-zinc-400 sm:text-base">
                    {t(`caseStudy.highlights.h${num}`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-black/10 dark:border-white/10 pt-8 sm:grid-cols-3 transition-colors duration-500">
              {caseStudyMetrics.map((metric, index) => (
                <MetricItem 
                  key={metric.label} 
                  value={metric.value} 
                  label={t(`caseStudy.metrics.m${index + 1}`)} 
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
