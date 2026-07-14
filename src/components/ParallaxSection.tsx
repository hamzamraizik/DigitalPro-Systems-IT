import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  imageUrl: string;
  overlayClass?: string;
  className?: string;
  children: React.ReactNode;
  speed?: number;
}

export const ParallaxSection = ({
  imageUrl,
  overlayClass = "bg-navy-dark/80",
  className = "",
  children,
  speed = 12,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="absolute inset-[-20%] will-change-transform"
      >
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </section>
  );
};
