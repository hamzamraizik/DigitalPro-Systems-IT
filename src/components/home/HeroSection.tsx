import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/home/Container";
import { HeroMedia } from "@/components/home/HeroMedia";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const copyVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-100 dark:bg-[#0A0A0A] pt-24 text-[#111111] dark:text-white sm:pt-28 lg:pt-32 transition-colors duration-500">
      {/* Creative IT Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 invert dark:invert-0 dark:opacity-[0.35] dark:mix-blend-screen transition-all duration-500"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />

      <Container className="relative z-10 flex min-h-[calc(100vh-7rem)] items-center py-14 lg:py-16">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <motion.div
            variants={shouldReduceMotion ? undefined : copyVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            className="max-w-2xl xl:max-w-3xl"
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#555555] dark:text-zinc-300 backdrop-blur-xl sm:text-sm transition-colors duration-500"
            >
              <span className="h-2 w-2 rounded-full bg-[#00AEEF]" />
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="max-w-3xl bg-gradient-to-br from-[#111111] to-[#555555] dark:from-white dark:to-zinc-500 bg-clip-text font-display text-4xl font-bold leading-[1.04] tracking-tight text-transparent sm:text-5xl lg:text-6xl xl:text-[4.4rem] transition-colors duration-500"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="mt-7 max-w-xl text-base leading-8 text-[#555555] dark:text-zinc-400 sm:text-lg transition-colors duration-500"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Button
                asChild
                size="lg"
                variant="hero"
                className="group h-11 rounded-[8px] px-5 text-sm transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Link to="/contact">
                  {t("hero.btnQuote")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="heroOutline"
                className="h-11 rounded-[8px] border-black/20 dark:border-white/20 px-5 text-sm text-[#111111] dark:text-white hover:border-black/40 dark:hover:border-white/40 hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors duration-500"
              >
                <Link to="/services">{t("hero.btnServices")}</Link>
              </Button>
            </motion.div>
          </motion.div>

          <HeroMedia />
        </div>
      </Container>
    </section>
  );
};
