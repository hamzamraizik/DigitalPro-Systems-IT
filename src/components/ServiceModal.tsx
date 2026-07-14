import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ArrowRight, Check } from "lucide-react";
import { whyUs, type ServiceCategory } from "@/data/servicesData";

interface ServiceModalProps {
  service: ServiceCategory | null;
  onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#0a1628]/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto rounded-[2rem] bg-navy-dark border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 md:p-14"
          >
            {/* Bouton fermer */}
            <button
              aria-label="Fermer"
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* En-tête */}
            <div className="flex items-start gap-5 mb-4">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <service.icon className="w-8 h-8 text-accent" />
              </div>
              <div>
                <span className="text-accent font-semibold text-sm uppercase tracking-[0.15em] block mb-1">
                  Notre Expertise
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-white">
                  {service.title}
                </h3>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-10 max-w-3xl">
              {service.intro}
            </p>

            {/* Grille des sous-services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.items.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 bg-white/[0.03] border border-white/10 hover:border-accent/40 rounded-xl px-5 py-4 transition-all duration-300 hover:bg-white/[0.05]"
                >
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed mb-2">
                      {item.desc}
                    </p>
                    {item.tags && (
                      <ul className="space-y-1">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="flex items-start gap-2 text-xs text-white/50"
                          >
                            <Check className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                            <span>{tag}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pourquoi nous choisir */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <span className="text-white/50 font-semibold text-sm uppercase tracking-[0.15em] block mb-4">
                Pourquoi nous choisir
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {whyUs.map((w) => (
                  <div
                    key={w.text}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <w.icon className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-xs text-white/70">{w.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12 pt-10 border-t border-white/10">
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,180,255,0.4)]"
              >
                Demander un devis <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={onClose}
                className="border border-white/20 hover:bg-white/5 text-white px-8 py-3.5 rounded-xl transition-all duration-300"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
