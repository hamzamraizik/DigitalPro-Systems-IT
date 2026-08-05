import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Remonte la page en haut à chaque changement de route.
 * React Router ne le fait pas automatiquement par défaut.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;