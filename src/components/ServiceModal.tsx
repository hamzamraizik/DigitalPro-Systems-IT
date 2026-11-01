import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, ArrowRight, Check, Sparkles } from "lucide-react";
import { serviceSlugByKey, type ServiceCategory } from "@/data/servicesData";

interface ServiceModalProps {
  service: ServiceCategory | null;
  onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!service) return;

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [service, onClose]);

  useEffect(() => {
    dialogRef.current?.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [service?.id, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {service && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#07111f]/90 backdrop-blur-md" />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`service-modal-title-${service.id}`}
            aria-describedby={`service-modal-desc-${service.id}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="thin-scroll relative z-10 max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0a1628] shadow-[0_24px_70px_-30px_rgba(0,0,0,0.7)]"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={t("servicesPage.modal.close")}
              onClick={onClose}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white shadow-none backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="relative border-b border-white/[0.1] p-8 pb-6 md:p-14 md:pb-8">
              <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div className="relative flex items-start gap-5">
                <motion.div
                  initial={shouldReduceMotion ? false : { scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-white"
                >
                  <service.icon className="h-8 w-8" strokeWidth={1.5} />
                </motion.div>
                <div className="pt-1">
                  <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t("servicesPage.modal.expertiseLabel")}
                  </span>
                  <h3
                    id={`service-modal-title-${service.id}`}
                    className="font-display text-2xl font-extrabold tracking-tight text-white lg:text-3xl"
                  >
                    {t(`servicesPage.categories.${service.id}.title`)}
                  </h3>
                </div>
              </div>
            </div>

            {/* Intro */}
            <div className="px-8 pt-6 md:px-14">
              <p
                id={`service-modal-desc-${service.id}`}
                className="max-w-3xl text-[15px] leading-relaxed text-zinc-400"
              >
                {t(`servicesPage.categories.${service.id}.intro`)}
              </p>
            </div>

            {/* Sub-services grid */}
            <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2 md:p-14">
              {service.items.map((item, i) => {
                const tags = item.hasTags
                  ? (t(`servicesPage.categories.${service.id}.tags.${item.key}`, { returnObjects: true }) as string[])
                  : null;

                return (
                  <motion.div
                    key={item.key}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      delay: shouldReduceMotion ? 0 : 0.1 + i * 0.05,
                    }}
                  >
                    <Link
                      to={`/services/${service.id}/${serviceSlugByKey[item.key]}`}
                      onClick={onClose}
                      className="group flex items-start gap-4 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition-colors duration-300 group-hover:border-white/30">
                        <item.icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between gap-3">
                          <span className="flex items-baseline gap-2.5">
                            <span className="font-mono text-[11px] tabular-nums text-zinc-500">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <h4 className="font-display text-base font-bold text-white">
                              {t(`servicesPage.categories.${service.id}.items.${item.key}.title`)}
                            </h4>
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-white/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                        </div>
                        <p className="mb-2 text-sm leading-relaxed text-zinc-400">
                          {t(`servicesPage.categories.${service.id}.items.${item.key}.desc`)}
                        </p>
                        {Array.isArray(tags) && tags.length > 0 && (
                          <ul className="space-y-1.5">
                            {tags.map((tag) => (
                              <li key={tag} className="flex items-start gap-2 text-xs text-zinc-400">
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10">
                                  <Check className="h-2.5 w-2.5 text-white/80" />
                                </span>
                                <span>{tag}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="border-t border-white/[0.1] px-8 pt-8 pb-10 md:px-14">
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <Link
                  to="/devis"
                  onClick={onClose}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-[#0a1628] shadow-[0_10px_25px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:w-auto"
                >
                  {t("servicesPage.modal.requestQuote")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:w-auto"
                >
                  {t("servicesPage.modal.close")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
