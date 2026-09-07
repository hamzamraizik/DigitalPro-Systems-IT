import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fait défiler vers l'ancre (#…) à chaque navigation, y compris vers
 * une ancre d'une page déjà chargée en lazy (ex: /services#developpement).
 */
const ScrollToHash = () => {
  const location = useLocation();
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    if (!location.hash || location.hash.length < 2) return;

    const key = `${location.pathname}${location.hash}`;
    if (key === lastKey.current) return;
    lastKey.current = key;

    const id = location.hash.slice(1);
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 20) {
        attempts += 1;
        window.setTimeout(tryScroll, 60);
      }
    };

    tryScroll();
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToHash;