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
  const isUnsplashImage = imageUrl.includes("images.unsplash.com");
  const unsplashBase = isUnsplashImage ? imageUrl.split("?")[0] : imageUrl;
  const optimizedImageUrl = isUnsplashImage
    ? `${unsplashBase}?auto=format&fit=crop&w=1200&q=72`
    : imageUrl;
  const responsiveSources = isUnsplashImage
    ? [640, 960, 1200, 1600]
        .map((width) => `${unsplashBase}?auto=format&fit=crop&w=${width}&q=72 ${width}w`)
        .join(", ")
    : undefined;
  const isHero = speed >= 10;
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
          src={optimizedImageUrl}
          srcSet={responsiveSources}
          sizes={responsiveSources ? "100vw" : undefined}
          alt=""
          className="w-full h-full object-cover"
          loading={isHero ? "eager" : "lazy"}
          fetchPriority={isHero ? "high" : "auto"}
          decoding="async"
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </section>
  );
};
