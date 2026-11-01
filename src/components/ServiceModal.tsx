import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, ArrowRight, Check, Sparkles, ExternalLink } from "lucide-react";
import { serviceSlugByKey, whyUs, type ServiceCategory } from "@/data/servicesData";

interface ServiceModalProps {
  service: ServiceCategory | null;
  onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

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

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
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
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/[0.15] bg-[#0a1628] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)" }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={t("servicesPage.modal.close")}
              onClick={onClose}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-white/15"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="relative border-b border-white/[0.1] p-8 pb-6 md:p-14 md:pb-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-64 rounded-t-[2rem] bg-gradient-to-b from-[#00AEEF]/10 via-[#00AEEF]/5 to-transparent" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00AEEF]/15 blur-[100px]" />

              <div className="relative flex items-start gap-5">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[#00AEEF]"
                  style={{
                    background: "rgba(0,174,239,0.12)",
                    border: "1px solid rgba(0,174,239,0.4)",
                    boxShadow: "0 0 10px rgba(0,174,239,0.3)",
                  }}
                >
                  <service.icon className="h-8 w-8" />
                </motion.div>
                <div className="pt-1">
                  <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#00AEEF]">
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
              <p className="max-w-3xl text-[15px] leading-relaxed text-[#9aa6b2]">
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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={`/services/${service.id}/${serviceSlugByKey[item.key]}`}
                      onClick={onClose}
                      className="group flex items-start gap-4 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00AEEF]/50 hover:bg-white/[0.06] hover:shadow-[0_12px_32px_rgba(0,174,239,0.15)]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#00AEEF] transition-all duration-300 group-hover:bg-[#00AEEF] group-hover:text-white" style={{ background: "rgba(0,174,239,0.12)", border: "1px solid rgba(0,174,239,0.4)" }}>
                        <item.icon className="h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between gap-3">
                          <h4 className="font-display text-base font-bold text-white">
                            {t(`servicesPage.categories.${service.id}.items.${item.key}.title`)}
                          </h4>
                          <ArrowRight className="h-4 w-4 shrink-0 text-[#00AEEF]/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#00AEEF]" />
                        </div>
                        <p className="mb-2 text-sm leading-relaxed text-[#9aa6b2]">
                          {t(`servicesPage.categories.${service.id}.items.${item.key}.desc`)}
                        </p>
                        {Array.isArray(tags) && tags.length > 0 && (
                          <ul className="space-y-1.5">
                            {tags.map((tag) => (
                              <li key={tag} className="flex items-start gap-2 text-xs text-[#9aa6b2]">
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/15">
                                  <Check className="h-2.5 w-2.5 text-[#00AEEF]" />
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

            {/* Why us */}
            <div className="border-t border-white/[0.1] px-8 pt-8 md:px-14">
              <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.2em] text-[#9aa6b2]">
                {t("servicesPage.whyUs.title")}
              </span>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {whyUs.map((w) => (
                  <div
                    key={w.key}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 transition-all duration-300 hover:border-[#00AEEF]/30 hover:bg-[#00AEEF]/[0.03]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00AEEF]/15 text-[#00AEEF]">
                      <w.icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium text-[#b8c4d0]">
                      {t(`servicesPage.whyUs.points.${w.key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="border-t border-white/[0.1] px-8 pt-8 pb-10 md:px-14">
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-8 py-3.5 font-bold text-[#07111f] transition-all duration-300 hover:scale-[1.03] hover:bg-[#21B5F2] hover:shadow-[0_0_30px_rgba(0,174,239,0.45)] md:w-auto"
                >
                  {t("servicesPage.modal.requestQuote")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-8 py-3.5 text-white transition-all duration-300 hover:bg-white/5 md:w-auto"
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
