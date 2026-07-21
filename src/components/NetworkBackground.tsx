import { motion, useReducedMotion } from "framer-motion";

interface NetworkBackgroundProps {
  className?: string;
}

/**
 * Fond décoratif "réseau" : billes bleues reliées par de fines lignes,
 * façon constellation, sur fond clair. Purement décoratif (aria-hidden),
 * positionné en absolute — le parent doit être `relative overflow-hidden`.
 */
export const NetworkBackground = ({ className = "" }: NetworkBackgroundProps) => {
  const shouldReduceMotion = useReducedMotion();

  const pulse = (delay: number) =>
    shouldReduceMotion
      ? undefined
      : {
          animate: { opacity: [0.55, 1, 0.55] },
          transition: { duration: 3.6, repeat: Infinity, delay, ease: "easeInOut" as const },
        };

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {/* Lignes de connexion */}
      <g stroke="hsl(var(--cyan))" strokeWidth="1.5" opacity="0.22">
        {/* cluster haut-droite */}
        <line x1="1040" y1="90" x2="965" y2="35" />
        <line x1="1040" y1="90" x2="1125" y2="45" />
        <line x1="1040" y1="90" x2="995" y2="150" />
        <line x1="1040" y1="90" x2="1150" y2="165" />
        <line x1="1150" y1="165" x2="1085" y2="205" />
        <line x1="1040" y1="90" x2="1180" y2="330" />
        <line x1="1180" y1="330" x2="1120" y2="425" />
        <line x1="1180" y1="330" x2="1195" y2="480" />

        {/* fil isolé haut-centre */}
        <line x1="640" y1="10" x2="700" y2="55" />

        {/* cluster bas-gauche */}
        <line x1="45" y1="705" x2="115" y2="765" />
        <line x1="45" y1="705" x2="30" y2="605" />
        <line x1="45" y1="705" x2="175" y2="655" />
        <line x1="45" y1="705" x2="140" y2="525" />
        <line x1="140" y1="525" x2="335" y2="480" />
        <line x1="335" y1="480" x2="290" y2="360" />
        <line x1="30" y1="605" x2="-10" y2="520" />
      </g>

      {/* Nœuds (billes) */}
      {[
        // cluster haut-droite
        { cx: 1040, cy: 90, r: 7, hub: true },
        { cx: 965, cy: 35, r: 3.5 },
        { cx: 1125, cy: 45, r: 3 },
        { cx: 995, cy: 150, r: 3.5 },
        { cx: 1150, cy: 165, r: 4.5 },
        { cx: 1085, cy: 205, r: 3 },
        { cx: 1180, cy: 330, r: 5.5, hub: true },
        { cx: 1120, cy: 425, r: 3.5 },
        { cx: 1195, cy: 480, r: 3 },

        // fil isolé haut-centre
        { cx: 640, cy: 10, r: 3 },
        { cx: 700, cy: 55, r: 2.5 },

        // cluster bas-gauche
        { cx: 45, cy: 705, r: 7, hub: true },
        { cx: 115, cy: 765, r: 3.5 },
        { cx: 30, cy: 605, r: 3.5 },
        { cx: 175, cy: 655, r: 3 },
        { cx: 140, cy: 525, r: 4, hub: true },
        { cx: 335, cy: 480, r: 3.5 },
        { cx: 290, cy: 360, r: 3 },
        { cx: -10, cy: 520, r: 3 },
      ].map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill="hsl(var(--cyan))"
          opacity={n.hub ? 0.85 : 0.45}
          {...pulse(i * 0.25)}
        />
      ))}
    </svg>
  );
};

export default NetworkBackground;