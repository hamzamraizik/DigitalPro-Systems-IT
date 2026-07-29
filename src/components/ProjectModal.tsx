import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, ArrowRight } from "lucide-react";

export interface ProjectItem {
  index: number;
  title: string;
  category: string;
  status: string;
  desc: string;
  image: string;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
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
            aria-labelledby={`project-modal-title-${project.index}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-[2rem] bg-white dark:bg-navy-dark border border-black/10 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-colors duration-300"
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={t("projectsPage.modal.close")}
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 flex items-center justify-center text-[#555555] hover:text-[#111111] dark:text-white/70 dark:hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 md:h-72 overflow-hidden rounded-t-[2rem]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-block text-xs font-semibold text-cyan bg-cyan/10 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="inline-block text-xs font-semibold text-[#555555] dark:text-white/60 bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full">
                  {project.status}
                </span>
              </div>

              <h3
                id={`project-modal-title-${project.index}`}
                className="font-display text-2xl lg:text-3xl font-extrabold text-[#111111] dark:text-white mb-6"
              >
                {project.title}
              </h3>

              <p className="text-[#555555] dark:text-white/70 leading-relaxed mb-10">
                {project.desc}
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 border-t border-black/10 dark:border-white/10">
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-cyan hover:bg-cyan/90 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,180,255,0.4)]"
                >
                  {t("projectsPage.modal.requestQuote")} <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-[#111111] dark:text-white px-8 py-3.5 rounded-xl transition-all duration-300"
                >
                  {t("projectsPage.modal.close")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;