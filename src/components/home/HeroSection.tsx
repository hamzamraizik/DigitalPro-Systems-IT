import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Award, Handshake, Headphones, Rocket } from "lucide-react";

import { Container } from "@/components/home/Container";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { heroMetrics } from "@/data/home";
import { useTranslation } from "react-i18next";

const metricIcons = [Handshake, Award, Rocket, Headphones];

export const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-page pb-16 pt-24 text-foreground lg:min-h-[720px] lg:pb-20 lg:pt-28">
      <Container className="relative z-10 flex items-center pb-2 pt-0 lg:pb-4">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_660px] lg:gap-12 xl:gap-16">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl xl:text-[3.5rem]">
              <motion.span
                className="block pb-1.5"
                initial={shouldReduceMotion ? false : { y: 22, opacity: 0 }}
                animate={{ y: shouldReduceMotion ? undefined : 0, opacity: shouldReduceMotion ? undefined : 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {t("hero.h1.a")}{" "}
                <span className="relative inline-block whitespace-nowrap">
                  {t("hero.h1.b")}
                  <svg
                    className="absolute -bottom-0.5 left-0 w-full text-[#FF8A3D]"
                    viewBox="0 0 220 12"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <motion.path
                      d="M3 8 C 55 1, 130 10, 216 5"
                      stroke="currentColor"
                      strokeWidth="7"
                      strokeLinecap="round"
                      opacity={0.28}
                      initial={shouldReduceMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: shouldReduceMotion ? undefined : 1 }}
                      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{ filter: "blur(6px)" }}
                    />
                    <motion.path
                      d="M3 8 C 55 1, 130 10, 216 5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
                      animate={{
                        pathLength: shouldReduceMotion ? undefined : 1,
                        opacity: shouldReduceMotion ? undefined : 1,
                      }}
                      transition={{ duration: 0.75, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.path
                      d="M12 9.5 C 80 5, 150 9, 198 7.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      opacity="0.7"
                      initial={shouldReduceMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: shouldReduceMotion ? undefined : 1 }}
                      transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                </span>
              </motion.span>
              <motion.span
                className="block"
                initial={shouldReduceMotion ? false : { y: 22, opacity: 0 }}
                animate={{ y: shouldReduceMotion ? undefined : 0, opacity: shouldReduceMotion ? undefined : 1 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {t("hero.h1.c")}
              </motion.span>
            </h1>

            <motion.p
              initial={shouldReduceMotion ? false : { y: 16, opacity: 0 }}
              animate={{ y: shouldReduceMotion ? undefined : 0, opacity: shouldReduceMotion ? undefined : 1 }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground sm:text-lg"
            >
              {t("hero.description")}
            </motion.p>

            <motion.dl
              initial={shouldReduceMotion ? false : { y: 16, opacity: 0 }}
              animate={{ y: shouldReduceMotion ? undefined : 0, opacity: shouldReduceMotion ? undefined : 1 }}
              transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 grid max-w-xl grid-cols-4 gap-x-2"
            >
              {heroMetrics.map((metric, index) => {
                const Icon = metricIcons[index % metricIcons.length];
                return (
                  <div key={metric.label} className="min-w-0">
                    <dt className="sr-only">
                      {metric.tKey ? t(`metrics.${metric.tKey}`) : metric.label}
                    </dt>
                    <div className="flex items-center gap-1.5">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-gradient-to-br from-[#00AEEF]/15 to-[#00AEEF]/25 text-[#0B1F3F] ring-1 ring-inset ring-[#00AEEF]/30 dark:text-[#00AEEF] dark:ring-[#00AEEF]/20">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                      <dd className="font-display text-base font-bold leading-none text-foreground">
                        {metric.value}
                      </dd>
                    </div>
                    <p className="mt-1 truncate text-[11px] leading-4 text-muted-foreground">
                      {metric.tKey ? t(`metrics.${metric.tKey}`) : metric.label}
                    </p>
                  </div>
                );
              })}
            </motion.dl>

            <motion.div
              initial={shouldReduceMotion ? false : { y: 16, opacity: 0 }}
              animate={{ y: shouldReduceMotion ? undefined : 0, opacity: shouldReduceMotion ? undefined : 1 }}
              transition={{ duration: 0.55, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="inline-flex h-14 items-center gap-2 rounded-full bg-[#00AEEF] px-7 text-[15px] font-semibold text-[#0B1F3F] shadow-[0_16px_40px_-26px_rgba(11,31,63,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#21B5F2] active:scale-95"
              >
                {t("hero.cta.label")}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/services")}
                className="inline-flex h-14 items-center gap-2 rounded-full border border-border bg-transparent px-7 text-[15px] font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00AEEF]/70 hover:text-[#0B6C92] active:scale-95 dark:hover:text-cyan"
              >
                {t("hero.cta.secondary")}
              </button>
            </motion.div>
          </div>

          <HeroIllustration />
        </div>
      </Container>
    </section>
  );
};