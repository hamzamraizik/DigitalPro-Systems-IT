import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Code2,
  Fingerprint,
  Network,
  Server,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const springConfig = { stiffness: 140, damping: 20, mass: 0.4 };
const ROTATION_MS = 4200;

type HeroOffering = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  visual: "erp" | "web" | "security" | "network" | "support" | "hardware";
  tags: string[];
  image: string;
  imageAlt: string;
  tKey: "erp" | "web" | "securityPhysical" | "network" | "cyber" | "hardware";
};

const offerings: HeroOffering[] = [
  {
    eyebrow: "Logiciel métier",
    title: "ERP & CRM sur mesure",
    description: "Automatisation, stock, ventes, workflows et tableaux de bord opérationnels.",
    icon: Workflow,
    visual: "erp",
    tags: ["Stock", "CRM", "Automatisation"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Interface logicielle sombre sur un écran de développement",
    tKey: "erp",
  },
  {
    eyebrow: "Plateformes digitales",
    title: "Web & e-commerce",
    description: "Portails clients, interfaces métier et plateformes web rapides et élégantes.",
    icon: Code2,
    visual: "web",
    tags: ["UX", "API", "E-commerce"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Poste de travail avec application web en développement",
    tKey: "web",
  },
  {
    eyebrow: "Sécurité site",
    title: "Sécurité électronique",
    description: "Contrôle d'accès, vidéosurveillance intelligente, alarmes et protection incendie.",
    icon: Fingerprint,
    visual: "security",
    tags: ["Accès", "Caméras", "Incendie"],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Caméra de surveillance dans un site professionnel sécurisé",
    tKey: "securityPhysical",
  },
  {
    eyebrow: "Infrastructure",
    title: "Réseaux & systèmes",
    description: "LAN/WAN, WiFi entreprise, VPN, virtualisation, stockage et cloud hybride.",
    icon: Network,
    visual: "network",
    tags: ["Fibre", "VPN", "Cloud"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Baies serveur et câblage réseau dans une salle informatique",
    tKey: "network",
  },
  {
    eyebrow: "Protection active",
    title: "Cybersécurité",
    description: "Audit, pare-feu, durcissement, supervision SOC et protection des accès.",
    icon: ShieldCheck,
    visual: "security",
    tags: ["SOC", "VPN", "Pare-feu"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Poste de cybersécurité avec visualisation réseau",
    tKey: "cyber",
  },
  {
    eyebrow: "Exploitation & matériel",
    title: "Support IT & hardware",
    description: "Infogérance, maintenance, serveurs, postes de travail et équipements réseau.",
    icon: Server,
    visual: "hardware",
    tags: ["Support", "Serveurs", "Parc IT"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Composants électroniques et matériel informatique professionnel",
    tKey: "hardware",
  },
];

const slideVariants = {
  hidden: { opacity: 0, x: 22, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -18, scale: 0.98 },
};

export const HeroMedia = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const rotateY = useTransform(springX, [0, 1], [5, -5]);
  const rotateX = useTransform(springY, [0, 1], [-5, 5]);
  const activeOffering = offerings[activeIndex];
  const ActiveIcon = activeOffering.icon;
  const { t } = useTranslation();

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    timerRef.current = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % offerings.length);
    }, ROTATION_MS);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [activeIndex, shouldReduceMotion]);

  const handleSelect = (index: number) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setActiveIndex(index);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    event.currentTarget.style.setProperty("--screen-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--screen-y", `${event.clientY - rect.top}px`);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    event.currentTarget.style.setProperty("--screen-x", "50%");
    event.currentTarget.style.setProperty("--screen-y", "50%");
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: 24 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, duration: 1.2, delay: 0.55 }}
      className="mx-auto w-full max-w-[620px] [perspective:1400px] lg:ml-auto xl:max-w-[720px] 2xl:max-w-[840px]"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative [backface-visibility:hidden]"
      >
        <div className="rounded-[36px] border-[4px] border-zinc-400 dark:border-black bg-zinc-300 dark:bg-black p-3 sm:p-4 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] dark:shadow-inner ring-1 ring-black/10 dark:ring-zinc-800 transition-colors duration-500">
          <div className="relative overflow-hidden rounded-[24px] border border-black/20 dark:border-zinc-800 bg-[#070707] transition-colors duration-500 [backface-visibility:hidden] [transform:translateZ(0)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(600px circle at var(--screen-x,50%) var(--screen-y,50%), rgba(0,174,239,0.1), transparent 40%)",
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_24%,transparent_42%)] opacity-0 dark:opacity-40"
            />

            <div className="relative z-10 aspect-[16/11] p-3 sm:p-5">
              <div className="flex h-full flex-col rounded-[24px] border border-white/5 bg-white/[0.015] p-3 shadow-2xl [backface-visibility:hidden] sm:p-4">
                <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-black transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeOffering.title}-ambient`}
                      src={activeOffering.image}
                      alt=""
                      initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 0.35, scale: 1 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/80 to-[#0A0A0A]" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeOffering.title}
                      variants={slideVariants}
                      initial={shouldReduceMotion ? false : "hidden"}
                      animate="visible"
                      exit={shouldReduceMotion ? undefined : "exit"}
                      transition={{ duration: 0.48, ease: "easeOut" }}
                      className="relative z-10 flex h-full flex-col justify-between p-5"
                    >
                      <div>
                        <div className="mb-5 flex items-center justify-between gap-3">
                          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                            {t(`hero.offerings.${activeOffering.tKey}.eyebrow`)}
                          </p>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,174,239,0.2)]">
                            <ActiveIcon className="h-4 w-4 text-[#00AEEF]" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-[26px]">
                          {t(`hero.offerings.${activeOffering.tKey}.title`)}
                        </h3>
                        <p className="mt-4 text-[13px] leading-relaxed text-zinc-300">
                          {t(`hero.offerings.${activeOffering.tKey}.description`)}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {[1, 2, 3].map((tagIndex) => (
                          <span
                            key={tagIndex}
                            className="rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10"
                          >
                            {t(`hero.offerings.${activeOffering.tKey}.tags.t${tagIndex}`)}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                  <motion.div className="min-h-[190px] overflow-hidden rounded-[20px] border border-white/10 bg-black transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${activeOffering.title}-visual`}
                        src={activeOffering.image}
                        alt={activeOffering.imageAlt}
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 p-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                        <ActiveIcon className="h-4 w-4 text-[#00AEEF]" aria-hidden="true" />
                      </span>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/85">
                        {t(`hero.offerings.${activeOffering.tKey}.eyebrow`)}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    {t("hero.media.offer")} {String(activeIndex + 1).padStart(2, "0")} / {String(offerings.length).padStart(2, "0")}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {offerings.map((offering, index) => (
                      <button
                        key={offering.title}
                        type="button"
                        aria-label={`Afficher ${t(`hero.offerings.${offering.tKey}.title`)}`}
                        onClick={() => handleSelect(index)}
                        className="relative h-2 w-2 rounded-full bg-white/15 transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
                      >
                        {index === activeIndex && (
                          <motion.span
                            layoutId="hero-offering-dot"
                            className="absolute inset-0 rounded-full bg-[#00AEEF]"
                            transition={{ type: "spring", stiffness: 260, damping: 24 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto h-12 w-[38%] rounded-b-[30px] border-x border-b border-zinc-500 dark:border-zinc-800 bg-zinc-400 dark:bg-black transition-colors duration-500" />
        <div className="mx-auto h-3 w-[58%] rounded-full border border-zinc-600 dark:border-zinc-800 bg-zinc-500 dark:bg-black shadow-lg transition-colors duration-500" />
      </motion.div>
    </motion.div>
  );
};
