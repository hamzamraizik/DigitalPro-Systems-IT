import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import logo from "@/assets/dps-it_logo.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.about"), path: "/a-propos" },
    { label: t("nav.projects"), path: "/projets" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  useEffect(() => {
    // Check if dark mode is active on load
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  };

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 120 && y > lastY);
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const iconBtn =
    "inline-flex items-center justify-center rounded-full border border-black/[0.06] bg-white/70 text-[#3A3A3A] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#00AEEF]/40 hover:text-[#1A1A1A] hover:shadow-[0_6px_18px_rgba(0,174,239,0.18)] active:scale-95 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70 dark:hover:border-[#00AEEF]/40 dark:hover:bg-white/10 dark:hover:text-white";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-gray-100 transition-[background-color,box-shadow,border-color] duration-500 dark:border-white/[0.08]",
        "bg-[#F7FBF9]/95 backdrop-blur-xl dark:bg-[#0A0A0A]/95",
        scrolled && "border-gray-200/80 bg-[#F7FBF9]/[0.98] shadow-lg shadow-black/[0.04] dark:border-white/10 dark:bg-[#0A0A0A]/[0.98] dark:shadow-black/20",
      )}
      style={{ WebkitBackdropFilter: "blur(16px)" }}
      aria-label="Navigation principale"
    >
      <div className={cn("mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 md:px-8", scrolled ? "h-16" : "h-20")}>
        <Link
          to="/"
          className="group flex min-w-0 items-center transition-transform duration-500 hover:-translate-y-[1px]"
          aria-label="DigitalPro Systems IT - accueil"
        >
          <img
            src={logo}
            alt="DigitalPro Systems IT"
            width="600"
            height="400"
            className="h-[130px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 dark:brightness-0 dark:invert"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex lg:gap-9">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group inline-flex items-center gap-2 text-[14px] transition-all duration-300 hover:-translate-y-[1px]",
                  isActive
                    ? "font-semibold text-[#0B6C92] dark:text-[#00AEEF]"
                    : "font-normal text-[#0B6C92]/70 hover:text-[#00AEEF] dark:text-[#00AEEF]/60 dark:hover:text-[#00AEEF]",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-dot"
                    className="h-[6px] w-[6px] rounded-full bg-gradient-to-br from-[#00AEEF] to-[#00AEEF]"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : (
                  <span className="h-[6px] w-[6px]" aria-hidden="true" />
                )}
                <span className="relative">
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-[#00AEEF] to-[#00AEEF] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/contact"
            className="hidden items-center rounded-full bg-[#1A1A1A] px-5 py-2.5 text-[13px] font-semibold leading-none text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(0,174,239,0.3)] active:scale-95 dark:bg-white dark:text-[#1A1A1A] dark:hover:shadow-[0_8px_24px_rgba(0,174,239,0.25)] lg:inline-flex"
          >
            {t("nav.quote")}
          </Link>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={i18n.language === 'fr' ? "Switch to English" : "Passer en français"}
            className={cn(iconBtn, "hidden h-[32px] gap-1.5 px-3 text-[12px] font-bold uppercase tracking-wider lg:inline-flex")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={i18n.language}
                initial={{ y: 6, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -6, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease: EASE }}
                className="flex items-center gap-1.5"
              >
                <Globe className="h-[14px] w-[14px]" strokeWidth={2} />
                {i18n.language === 'fr' ? 'EN' : 'FR'}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
            className={cn(iconBtn, "hidden h-[32px] w-[32px] lg:inline-flex")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -100, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 100, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center justify-center"
              >
                {theme === "light" ? <Moon className="h-[16px] w-[16px]" strokeWidth={2} /> : <Sun className="h-[16px] w-[16px]" strokeWidth={2} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] transition-colors hover:bg-black/[0.04] focus-visible:outline-none dark:text-white dark:hover:bg-white/10 lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -120, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 120, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex"
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 120, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -120, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex"
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-x-4 top-20 z-[60] flex max-h-[calc(100dvh-6rem)] flex-col overflow-y-auto rounded-[24px] border border-black/[0.06] bg-[#F7FBF9]/90 p-4 text-[#1A1A1A] shadow-2xl shadow-black/[0.08] dark:border-white/10 dark:bg-[#0A0A0A]/90 dark:text-white dark:shadow-black/40 lg:hidden"
            style={{ WebkitBackdropFilter: "blur(28px) saturate(1.5)" }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: EASE, delay: 0.05 + index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-[12px] px-4 py-3.5 text-[15px] transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-[#00AEEF]/10 to-[#00AEEF]/10 font-semibold text-[#0B6C92] dark:bg-white/10 dark:text-[#00AEEF]"
                          : "font-medium text-[#0B6C92]/70 hover:bg-black/[0.03] hover:text-[#00AEEF] dark:text-[#00AEEF]/60 dark:hover:bg-white/5 dark:hover:text-[#00AEEF]",
                      )}
                    >
                      {isActive && (
                        <span className="h-[6px] w-[6px] rounded-full bg-gradient-to-br from-[#00AEEF] to-[#00AEEF]" aria-hidden="true" />
                      )}
                      {!isActive && <span className="h-[6px] w-[6px]" aria-hidden="true" />}
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE, delay: 0.05 + navItems.length * 0.05 }}
            >
              <Link
                to="/contact"
                className="mt-4 w-full rounded-full bg-[#1A1A1A] py-3.5 text-center text-[15px] font-semibold text-white transition-all active:scale-95 dark:bg-white dark:text-[#1A1A1A]"
              >
                {t("nav.quote")}
              </Link>
            </motion.div>
            <div className="mt-4 flex flex-col gap-3 border-t border-black/[0.06] pt-4 dark:border-white/10 min-[380px]:flex-row min-[380px]:justify-between">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 rounded-full bg-black/[0.04] px-4 py-2 text-sm text-[#1A1A1A] transition-colors hover:bg-black/[0.08] dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex items-center justify-center"
                  >
                    {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </motion.span>
                </AnimatePresence>
                {theme === "light" ? "Mode Sombre" : "Mode Clair"}
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 rounded-full bg-black/[0.04] px-4 py-2 text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-black/[0.08] dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={i18n.language}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex items-center justify-center"
                  >
                    <Globe className="h-4 w-4" />
                  </motion.span>
                </AnimatePresence>
                {i18n.language === 'fr' ? 'English' : 'Français'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;