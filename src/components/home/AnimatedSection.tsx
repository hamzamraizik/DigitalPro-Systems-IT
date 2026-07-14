import { motion, useReducedMotion, type MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedSection = ({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedSectionProps) => {
  const shouldReduceMotion = useReducedMotion();

  const motionProps: MotionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.24 },
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <motion.div className={cn(className)} {...motionProps} {...props}>
      {children}
    </motion.div>
  );
};
