import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PageHeroProps {
  badge?: ReactNode;
  badgePulse?: boolean;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  visual?: ReactNode;
  small?: boolean;
  className?: string;
}

const copyVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const noiseDataUri =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")";

export const PageHero = ({
  badge,
  badgePulse = true,
  title,
  description,
  children,
  visual,
  small = false,
  className = "",
}: PageHeroProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={`relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-24 ${className}`}>
      {/* Layered ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#2fb6ff]/[0.13] blur-[150px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-24 h-[26rem] w-[26rem] rounded-full bg-blue-600/[0.14] blur-[170px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#2fb6ff]/[0.1] blur-[180px]" />

      {/* Aurora conic arc (Linear / Vercel style light field) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-18%] top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rotate-12 rounded-full opacity-50 blur-[110px]"
style={{
          background:
            "conic-gradient(from 120deg, rgba(47,182,255,0.2), rgba(59,130,246,0.14) 40%, transparent 62%, rgba(59,130,246,0.12) 100%)",
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: noiseDataUri }}
      />

      {/* Horizon line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <motion.div
            variants={shouldReduceMotion ? undefined : copyVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            className="max-w-2xl"
          >
            {badge && (
              <motion.div
                variants={shouldReduceMotion ? undefined : itemVariants}
                className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-white/85 backdrop-blur-md sm:text-sm"
              >
                {badgePulse && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2fb6ff] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2fb6ff] shadow-[0_0_10px_#2fb6ff]" />
                  </span>
                )}
                {badge}
              </motion.div>
            )}

            <motion.h1
              variants={shouldReduceMotion ? undefined : itemVariants}
              className={
                small
                  ? "font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl"
                  : "font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl"
              }
            >
              {title}
            </motion.h1>

            {description && (
              <motion.div
                variants={shouldReduceMotion ? undefined : itemVariants}
                className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg sm:leading-9"
              >
                {description}
              </motion.div>
            )}

            {children && (
              <motion.div
                variants={shouldReduceMotion ? undefined : itemVariants}
                className="mt-9"
              >
                {children}
              </motion.div>
            )}
          </motion.div>

          {visual && (
            <motion.div
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="hidden lg:block"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;