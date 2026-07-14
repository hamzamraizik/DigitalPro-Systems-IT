import { motion } from "framer-motion";

import { Container } from "@/components/home/Container";
import { MetricItem } from "@/components/home/MetricItem";
import { heroMetrics } from "@/data/home";
import { useTranslation } from "react-i18next";

export const MetricsRow = () => {
  const { t } = useTranslation();
  return (
    <section aria-label="Indicateurs DigitalPro Systems IT" className="bg-zinc-100 dark:bg-[#111111] text-[#111111] dark:text-white transition-colors duration-500">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-black/10 dark:border-white/10 py-10 sm:grid-cols-4 lg:py-12 transition-colors duration-500"
        >
          {heroMetrics.map((metric) => (
            <MetricItem 
              key={metric.label} 
              value={metric.value}
              label={metric.tKey ? t(`metrics.${metric.tKey}`) : metric.label} 
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
