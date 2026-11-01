import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, ArrowRight, Check, Sparkles } from "lucide-react";
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/40 dark:bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`service-modal-title-${service.id}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto rounded-[2rem] bg-[#F8FAFC] dark:bg-navy-dark border border-black/10 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 md:p-14 transition-colors duration-300"
          >
            {/* Décor d'arrière-plan */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-cyan/10 via-cyan/5 to-transparent rounded-t-[2rem]" />
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-cyan/15 rounded-full blur-[100px]" />

            {/* Bouton fermer */}
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={t("servicesPage.modal.close")}
              onClick={onClose}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-black/10 dark:border-white/15 flex items-center justify-center text-[#111111] dark:text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* En-tête */}
            <div className="relative flex items-start gap-5 mb-5">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-cyan to-cyan-light flex items-center justify-center shadow-[0_8px_24px_rgba(0,174,239,0.35)]"
              >
                <service.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 text-cyan font-semibold text-xs uppercase tracking-[0.2em] block mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("servicesPage.modal.expertiseLabel")}
                </span>
                <h3
                  id={`service-modal-title-${service.id}`}
                  className="font-display text-2xl lg:text-3xl font-extrabold text-[#111111] dark:text-white tracking-tight"
                >
                  {t(`servicesPage.categories.${service.id}.title`)}
                </h3>
              </div>
            </div>

            <p className="relative text-[#555555] dark:text-white/70 leading-relaxed mb-10 max-w-3xl text-[15px]">
              {t(`servicesPage.categories.${service.id}.intro`)}
            </p>

            {/* Grille des sous-services */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.items.map((item) => {
                const tags = item.hasTags
                  ? (t(`servicesPage.categories.${service.id}.tags.${item.key}`, { returnObjects: true }) as string[])
                  : null;

                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                  >
                    <Link
                      to={`/services/${service.id}/${serviceSlugByKey[item.key]}`}
                      onClick={onClose}
                      className="group flex items-start gap-4 bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-cyan/50 rounded-2xl px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,174,239,0.12)] dark:hover:shadow-[0_12px_32px_rgba(0,174,239,0.2)]"
                    >
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center transition-all duration-300 group-hover:bg-cyan group-hover:scale-105">
                        <item.icon className="w-5 h-5 text-cyan transition-colors duration-300 group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <h4 className="font-display text-base font-bold text-[#111111] dark:text-white">
                            {t(`servicesPage.categories.${service.id}.items.${item.key}.title`)}
                          </h4>
                          <ArrowRight className="w-4 h-4 text-cyan/0 transition-all duration-300 group-hover:text-cyan group-hover:translate-x-1 shrink-0" />
                        </div>
                        <p className="text-[#555555] dark:text-white/60 text-sm leading-relaxed mb-2">
                          {t(`servicesPage.categories.${service.id}.items.${item.key}.desc`)}
                        </p>
                        {Array.isArray(tags) && (
                          <ul className="space-y-1.5">
                            {tags.map((tag) => (
                              <li
                                key={tag}
                                className="flex items-start gap-2 text-xs text-[#666666] dark:text-white/55"
                              >
                                <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-cyan/10 flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-cyan" />
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

            {/* Pourquoi nous choisir */}
            <div className="relative mt-12 pt-8 border-t border-black/10 dark:border-white/10">
              <span className="text-[#666666] dark:text-white/50 font-semibold text-xs uppercase tracking-[0.2em] block mb-5">
                {t("servicesPage.whyUs.title")}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {whyUs.map((w) => (
                  <div
                    key={w.key}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-cyan/30 hover:bg-cyan/[0.03] transition-all duration-300"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-cyan/10 flex items-center justify-center">
                      <w.icon className="w-4 h-4 text-cyan shrink-0" />
                    </div>
                    <span className="text-xs font-medium text-[#444444] dark:text-white/70">
                      {t(`servicesPage.whyUs.points.${w.key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative mt-12 pt-8 border-t border-black/10 dark:border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="group inline-flex w-full md:w-auto items-center justify-center gap-2 bg-gradient-to-r from-cyan to-cyan-light text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,180,255,0.45)]"
                >
                  {t("servicesPage.modal.requestQuote")} <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-full md:w-auto items-center justify-center border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-[#111111] dark:text-white px-8 py-3.5 rounded-xl transition-all duration-300"
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
