import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  Compass,
  Headset,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/home/Container";
import { processSteps } from "@/data/home";
import { useTranslation } from "react-i18next";

const stepIcon: LucideIcon[] = [ClipboardList, Compass, Rocket, Headset];

export const ApproachSection = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const desktopLineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const [horizontalCenters, setHorizontalCenters] = useState<number[]>([]);
  const [verticalCenters, setVerticalCenters] = useState<number[]>([]);

  const aboveSteps = [0, 2];
  const belowSteps = [1, 3];

  useEffect(() => {
    const measure = () => {
      if (desktopLineRef.current && desktopLineRef.current.offsetParent !== null) {
        const cells = Array.from(
          desktopLineRef.current.querySelectorAll<HTMLElement>("[data-node-cell]")
        );
        if (cells.length === 4) {
          setHorizontalCenters(cells.map((el) => el.offsetLeft + el.offsetWidth / 2));
        }
      }
      if (mobileLineRef.current && mobileLineRef.current.offsetParent !== null) {
        const items = Array.from(
          mobileLineRef.current.querySelectorAll<HTMLElement>("[data-mobile-item]")
        );
        if (items.length === 4) {
          setVerticalCenters(items.map((el) => el.offsetTop + 28));
        }
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const hoverProps = (index: number) => ({
    onMouseEnter: () => setActiveStep(index),
    onMouseLeave: () => setActiveStep(0),
    onFocus: () => setActiveStep(index),
    onBlur: () => setActiveStep(0),
  });

  const renderNode = (index: number) => {
    const num = String(index + 1).padStart(2, "0");
    const passed = index <= activeStep;
    return (
      <span
        className={`relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 bg-white font-display text-base font-bold leading-none tabular-nums transition-colors duration-300 ease-out dark:bg-slate-900 ${
          passed
            ? "border-sky-500 text-sky-700 dark:border-sky-400 dark:text-sky-300"
            : "border-slate-900/15 text-[#111111] dark:border-white/15 dark:text-white"
        }`}
      >
        <span className="relative">{num}</span>
      </span>
    );
  };

  const stepMotion = (index: number) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, delay: 0.15 + index * 0.12 },
  });

  return (
    <section className="relative overflow-hidden bg-page py-20 transition-colors duration-500 md:py-28">
      <div
        className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#00AEEF]/[0.05] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 rounded-full bg-black/[0.03] blur-3xl dark:bg-white/[0.04]"
        aria-hidden="true"
      />

      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B6C92] dark:text-[#00AEEF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D]" aria-hidden="true" />
              {t("approach.eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#111111] dark:text-white sm:text-4xl lg:text-5xl">
              {t("approach.title")}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[#555555] dark:text-zinc-400">
              {t("approach.description")}
            </p>
          </div>

          <div className="relative mx-auto mt-10 max-w-5xl px-6 md:px-10">
            {/* Mobile (< md): vertical track + progress fill on the left */}
            <div className="relative md:hidden" ref={mobileLineRef}>
              <div
                className="absolute left-7 w-px -translate-x-1/2 bg-slate-900/10 dark:bg-white/10"
                style={{
                  top: (verticalCenters[0] ?? 0) + 28,
                  height:
                    verticalCenters[3] != null
                      ? Math.max(0, verticalCenters[3] - verticalCenters[0] - 56)
                      : 0,
                }}
                aria-hidden="true"
              />
              {verticalCenters[3] != null &&
                [0, 1, 2].map((i) => {
                  const filled = activeStep > i;
                  return (
                    <div
                      key={i}
                      className={`absolute left-7 w-[2px] -translate-x-1/2 rounded-full transition-colors duration-300 ease-out ${
                        filled ? "bg-sky-500 dark:bg-sky-400" : "bg-slate-900/10 dark:bg-white/10"
                      }`}
                      style={{
                        top: (verticalCenters[i] ?? 0) + 28,
                        height: Math.max(
                          0,
                          (verticalCenters[i + 1] ?? 0) - (verticalCenters[i] ?? 0) - 56
                        ),
                        transitionDelay: shouldReduceMotion ? "0ms" : `${i * 100}ms`,
                      }}
                      aria-hidden="true"
                    />
                  );
                })}

              <div className="flex flex-col gap-16">
                {processSteps.map((step, index) => {
                  const Icon = stepIcon[index % stepIcon.length];
                  const active = activeStep === index;
                  return (
                    <motion.div
                      key={step.tKey}
                      {...stepMotion(index)}
                      {...hoverProps(index)}
                      data-mobile-item
                      className="relative flex items-start gap-5"
                    >
                      <span className="shrink-0">{renderNode(index)}</span>
                      <div className="flex flex-col pt-1">
                        <span
                          className={`grid h-11 w-11 place-items-center rounded-xl transition-all duration-300 ease-out ${
                            active
                              ? "border border-sky-500/40 bg-sky-500/10 text-sky-700 dark:border-sky-400/40 dark:bg-sky-400/10 dark:text-sky-300"
                              : "bg-[#00AEEF]/10 text-[#0B6C92] ring-1 ring-inset ring-[#00AEEF]/25 dark:text-[#00AEEF]"
                          }`}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        <p
                          className={`mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ease-out ${
                            active
                              ? "text-sky-600 dark:text-sky-400"
                              : "text-[#1A1A1A]/55 dark:text-white/55"
                          }`}
                        >
                          {step.tKey ? t(`approach.steps.${step.tKey}.tag`) : ""}
                        </p>
                        <h3 className="mt-2 max-w-[13rem] font-display text-lg font-bold leading-snug tracking-tight text-[#111111] dark:text-white">
                          {step.tKey ? t(`approach.steps.${step.tKey}.title`) : step.title}
                        </h3>
                        <p className="mt-2.5 max-w-[17rem] text-sm leading-6 text-[#555555] dark:text-zinc-400">
                          {step.tKey ? t(`approach.steps.${step.tKey}.description`) : step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Desktop (md+): zigzag timeline */}
            <div className="hidden flex-col md:flex">
              {/* Row 1 — content for 01 and 03, bottom-aligned (above the line) */}
              <div className="grid grid-cols-4 items-end gap-x-8 md:min-h-[10.5rem]">
                {aboveSteps.map((index) => {
                  const step = processSteps[index];
                  const Icon = stepIcon[index % stepIcon.length];
                  const active = activeStep === index;
                  const passed = index <= activeStep;
                  return (
                    <motion.div
                      key={step.tKey}
                      {...stepMotion(index)}
                      {...hoverProps(index)}
                      className={`relative flex flex-col items-center text-center ${
                        index === 0 ? "col-start-1" : "col-start-3"
                      }`}
                    >
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ease-out ${
                          active
                            ? "text-sky-600 dark:text-sky-400"
                            : "text-[#1A1A1A]/55 dark:text-white/55"
                        }`}
                      >
                        {step.tKey ? t(`approach.steps.${step.tKey}.tag`) : ""}
                      </p>
                      <h3 className="mt-1 max-w-[13rem] font-display text-lg font-bold leading-snug tracking-tight text-[#111111] dark:text-white">
                        {step.tKey ? t(`approach.steps.${step.tKey}.title`) : step.title}
                      </h3>
                      <p className="mt-1.5 max-w-[20rem] text-center text-balance text-sm leading-snug text-[#555555] dark:text-zinc-400">
                        {step.tKey ? t(`approach.steps.${step.tKey}.description`) : step.description}
                      </p>
                      <span
                        className={`mt-3 grid h-11 w-11 place-items-center rounded-xl transition-all duration-300 ease-out ${
                          active
                            ? "border border-sky-500/40 bg-sky-500/10 text-sky-700 dark:border-sky-400/40 dark:bg-sky-400/10 dark:text-sky-300"
                            : "bg-[#00AEEF]/10 text-[#0B6C92] ring-1 ring-inset ring-[#00AEEF]/25 dark:text-[#00AEEF]"
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <span
                        className={`h-4 w-px shrink-0 transition-colors duration-300 ease-out ${
                          passed ? "bg-sky-500 dark:bg-sky-400" : "bg-slate-900/15 dark:bg-white/15"
                        }`}
                        aria-hidden="true"
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Row 2 — the track, progress fill, and numbered nodes */}
              <div className="relative" ref={desktopLineRef}>
                <div
                  className="absolute top-7 h-px -translate-y-1/2 bg-slate-900/10 dark:bg-white/10"
                  style={{
                    left: (horizontalCenters[0] ?? 0) + 28,
                    width:
                      horizontalCenters[3] != null
                        ? Math.max(0, horizontalCenters[3] - horizontalCenters[0] - 56)
                        : 0,
                  }}
                  aria-hidden="true"
                />
                {horizontalCenters[3] != null &&
                  [0, 1, 2].map((i) => {
                    const filled = activeStep > i;
                    return (
                      <div
                        key={i}
                        className={`absolute top-7 h-[2px] -translate-y-1/2 rounded-full transition-colors duration-300 ease-out ${
                          filled ? "bg-sky-500 dark:bg-sky-400" : "bg-slate-900/10 dark:bg-white/10"
                        }`}
                        style={{
                          left: (horizontalCenters[i] ?? 0) + 28,
                          width: Math.max(
                            0,
                            (horizontalCenters[i + 1] ?? 0) - (horizontalCenters[i] ?? 0) - 56
                          ),
                          transitionDelay: shouldReduceMotion ? "0ms" : `${i * 100}ms`,
                        }}
                        aria-hidden="true"
                      />
                    );
                  })}

                <div className="grid grid-cols-4 gap-x-8">
                  {processSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      {...stepMotion(index)}
                      {...hoverProps(index)}
                      data-node-cell
                      className="relative flex justify-center"
                    >
                      {renderNode(index)}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Row 3 — content for 02 and 04, top-aligned (below the line) */}
              <div className="grid grid-cols-4 items-start gap-x-8 md:min-h-[10.5rem]">
                {belowSteps.map((index) => {
                  const step = processSteps[index];
                  const Icon = stepIcon[index % stepIcon.length];
                  const active = activeStep === index;
                  const passed = index <= activeStep;
                  return (
                    <motion.div
                      key={step.tKey}
                      {...stepMotion(index)}
                      {...hoverProps(index)}
                      className={`relative flex flex-col items-center text-center ${
                        index === 1 ? "col-start-2" : "col-start-4"
                      }`}
                    >
                      <span
                        className={`h-4 w-px shrink-0 transition-colors duration-300 ease-out ${
                          passed ? "bg-sky-500 dark:bg-sky-400" : "bg-slate-900/15 dark:bg-white/15"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-xl transition-all duration-300 ease-out ${
                          active
                            ? "border border-sky-500/40 bg-sky-500/10 text-sky-700 dark:border-sky-400/40 dark:bg-sky-400/10 dark:text-sky-300"
                            : "bg-[#00AEEF]/10 text-[#0B6C92] ring-1 ring-inset ring-[#00AEEF]/25 dark:text-[#00AEEF]"
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <p
                        className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ease-out ${
                          active
                            ? "text-sky-600 dark:text-sky-400"
                            : "text-[#1A1A1A]/55 dark:text-white/55"
                        }`}
                      >
                        {step.tKey ? t(`approach.steps.${step.tKey}.tag`) : ""}
                      </p>
                      <h3 className="mt-1 max-w-[13rem] font-display text-lg font-bold leading-snug tracking-tight text-[#111111] dark:text-white">
                        {step.tKey ? t(`approach.steps.${step.tKey}.title`) : step.title}
                      </h3>
                      <p className="mt-1.5 max-w-[20rem] text-center text-balance text-sm leading-snug text-[#555555] dark:text-zinc-400">
                        {step.tKey ? t(`approach.steps.${step.tKey}.description`) : step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};