import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, ArrowRight, Check } from "lucide-react";
import { whyUs, type ServiceCategory } from "@/data/servicesData";

interface ServiceModalProps {
  service: ServiceCategory | null;
  onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
  const { t } = useTranslation();

  // Fermeture avec la touche Échap + verrouillage du scroll en arrière-plan
  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
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
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto rounded-[2rem] bg-white dark:bg-navy-dark border border-black/10 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 md:p-14 transition-colors duration-300"
          >
            {/* Bouton fermer */}
            <button
              aria-label={t("servicesPage.modal.close")}
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center text-[#555555] hover:text-[#111111] dark:text-white/70 dark:hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* En-tête */}
            <div className="flex items-start gap-5 mb-4">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                <service.icon className="w-8 h-8 text-cyan" />
              </div>
              <div>
                <span className="text-cyan font-semibold text-sm uppercase tracking-[0.15em] block mb-1">
                  {t("servicesPage.modal.expertiseLabel")}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-[#111111] dark:text-white">
                  {t(`servicesPage.categories.${service.id}.title`)}
                </h3>
              </div>
            </div>

            <p className="text-[#555555] dark:text-white/70 leading-relaxed mb-10 max-w-3xl">
              {t(`servicesPage.categories.${service.id}.intro`)}
            </p>

            {/* Grille des sous-services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.items.map((item) => {
                const tags = item.hasTags
                  ? (t(`servicesPage.categories.${service.id}.tags.${item.key}`, { returnObjects: true }) as string[])
                  : null;

                return (
                  <div
                    key={item.key}
                    className="flex items-start gap-4 bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 hover:border-cyan/40 rounded-xl px-5 py-4 transition-all duration-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                  >
                    <div className="w-11 h-11 shrink-0 rounded-lg bg-cyan/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-[#111111] dark:text-white mb-1">
                        {t(`servicesPage.categories.${service.id}.items.${item.key}.title`)}
                      </h4>
                      <p className="text-[#555555] dark:text-white/60 text-sm leading-relaxed mb-2">
                        {t(`servicesPage.categories.${service.id}.items.${item.key}.desc`)}
                      </p>
                      {Array.isArray(tags) && (
                        <ul className="space-y-1">
                          {tags.map((tag) => (
                            <li
                              key={tag}
                              className="flex items-start gap-2 text-xs text-[#777777] dark:text-white/50"
                            >
                              <Check className="w-3.5 h-3.5 text-cyan mt-0.5 shrink-0" />
                              <span>{tag}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pourquoi nous choisir */}
            <div className="mt-10 pt-8 border-t border-black/10 dark:border-white/10">
              <span className="text-[#777777] dark:text-white/50 font-semibold text-sm uppercase tracking-[0.15em] block mb-4">
                {t("servicesPage.whyUs.title")}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {whyUs.map((w) => (
                  <div
                    key={w.key}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/[0.015] dark:bg-white/[0.02] border border-black/5 dark:border-white/5"
                  >
                    <w.icon className="w-5 h-5 text-cyan shrink-0" />
                    <span className="text-xs text-[#555555] dark:text-white/70">
                      {t(`servicesPage.whyUs.points.${w.key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12 pt-10 border-t border-black/10 dark:border-white/10">
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-cyan hover:bg-cyan/90 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,180,255,0.4)]"
              >
                {t("servicesPage.modal.requestQuote")} <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={onClose}
                className="border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-[#111111] dark:text-white px-8 py-3.5 rounded-xl transition-all duration-300"
              >
                {t("servicesPage.modal.close")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
