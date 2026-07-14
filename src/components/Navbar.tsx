import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import logo from "@/assets/dps-it_logo.png";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.about"), path: "/a-propos" },
    { label: t("nav.blog"), path: "/blog" },
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
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  return (
    <nav
      className={cn(
        "fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "inset-x-0 top-0 md:top-6 md:left-1/2 md:w-[92%] md:max-w-5xl md:-translate-x-1/2 md:rounded-full md:border",
        scrolled
          ? "border-b border-black/5 dark:border-white/10 md:border-black/5 dark:md:border-white/10 bg-white/85 dark:bg-[#0A0A0A]/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "border-b border-transparent md:border-black/5 dark:md:border-white/5 bg-transparent md:bg-white/60 dark:md:bg-white/[0.03] backdrop-blur-xl"
      )}
      style={{ WebkitBackdropFilter: "blur(24px)" }}
      aria-label="Navigation principale"
    >
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex h-16 items-center justify-between transition-all duration-500">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link to="/" className="flex min-w-0 items-center" aria-label="DigitalPro Systems IT - accueil">
              <img 
                src={logo} 
                alt="DigitalPro Systems IT" 
                className={cn("h-auto object-contain transition-all duration-500", scrolled ? "w-[140px]" : "w-[160px]")} 
              />
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-3 py-2 text-[13px] font-medium tracking-wide transition-all duration-300",
                      isActive ? "text-[#111111] dark:text-white" : "text-[#555555] hover:text-[#111111] dark:text-white/60 dark:hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-[12px] font-bold uppercase tracking-wider text-[#555555] hover:bg-black/5 hover:text-[#111111] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
            >
              <Globe className="h-[14px] w-[14px]" />
              {i18n.language === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#555555] hover:bg-black/5 hover:text-[#111111] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
            >
              {theme === "light" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
            </button>
            <Link 
              to="/contact"
              className="rounded-full bg-[#111111] dark:bg-white px-5 py-2 text-[13px] font-semibold text-white dark:text-black transition-all hover:scale-105 hover:bg-black dark:hover:bg-zinc-200"
            >
              {t("nav.quote")}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#111111] dark:text-white transition-colors hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute inset-x-0 top-full flex flex-col overflow-hidden border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0A0A0A]/95 p-4 shadow-2xl backdrop-blur-3xl lg:hidden",
              scrolled ? "mt-2 mx-4 rounded-[24px] border" : "border-t border-b"
            )}
            style={{ WebkitBackdropFilter: "blur(32px)" }}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-[12px] px-4 py-3.5 text-[15px] font-medium transition-colors",
                      isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="mt-4 w-full rounded-full bg-white py-3.5 text-center text-[15px] font-semibold text-black transition-transform active:scale-95"
              >
                {t("nav.quote")}
              </Link>
            </div>
            <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                {theme === "light" ? "Mode Sombre" : "Mode Clair"}
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-white/10"
              >
                <Globe className="h-4 w-4" />
                {i18n.language === 'fr' ? 'English' : 'Français'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
