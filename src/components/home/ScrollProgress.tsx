import { motion, useScroll } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-gradient-to-r from-[#00AEEF]/0 via-[#00AEEF] to-[#0B6C92] shadow-[0_1px_8px_rgba(0,174,239,0.35)]"
    />
  );
};