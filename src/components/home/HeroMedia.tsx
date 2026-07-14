import type { MouseEvent } from "react";
import { useEffect, useRef, useState, useMemo } from "react";
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
  LockKeyhole,
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
  hidden: { opacity: 0, x: 22, scale: 0.98, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, x: -18, scale: 0.98, filter: "blur(8px)" },
};

const ErpVisual = () => (
  <div className="flex h-full w-full items-center justify-center relative">
    <div className="absolute w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl" />
    
    <div className="w-[190px] sm:w-[230px] rounded-[16px] border border-white/10 bg-black/40 backdrop-blur-md p-3 relative z-10 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Workflow className="h-4 w-4 text-[#00AEEF]" />
          <div className="h-2 w-16 bg-white/40 rounded-full" />
        </div>
        <span className="flex h-4 items-center rounded-full bg-emerald-500/10 px-1.5 text-[8px] font-bold text-emerald-400 border border-emerald-500/20">LIVE</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-2">
        <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0 }} className="rounded-[10px] bg-white/[0.04] p-2 border border-white/5">
          <div className="h-1.5 w-10 bg-white/30 rounded-full mb-1.5" />
          <div className="text-sm font-bold text-white">96%</div>
        </motion.div>
        <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="rounded-[10px] bg-[#00AEEF]/10 p-2 border border-[#00AEEF]/20">
          <div className="h-1.5 w-8 bg-[#00AEEF]/50 rounded-full mb-1.5" />
          <div className="text-sm font-bold text-[#00AEEF]">+42</div>
        </motion.div>
      </div>
      
      <div className="rounded-[10px] bg-white/[0.03] border border-white/5 p-2">
        <div className="flex justify-between items-end">
          <div className="flex gap-1 items-end h-8">
            {[40, 70, 45, 90, 65, 80].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-2 bg-gradient-to-t from-[#00AEEF]/20 to-[#00AEEF] rounded-t-sm" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WebVisual = () => (
  <div className="flex h-full w-full items-center justify-center relative">
    <div className="absolute w-32 h-32 bg-[#00AEEF]/20 rounded-full blur-2xl" />
    
    <div className="relative w-[180px] sm:w-[220px]">
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-full rounded-[16px] border border-white/10 bg-white/[0.03] backdrop-blur-md p-3 shadow-2xl"
      >
        <div className="flex items-center gap-1.5 mb-3">
          <div className="h-2 w-2 rounded-full bg-red-400/80" />
          <div className="h-2 w-2 rounded-full bg-amber-400/80" />
          <div className="h-2 w-2 rounded-full bg-green-400/80" />
        </div>
        
        <div className="flex gap-2 mb-3">
          <div className="h-16 w-1/3 rounded-[10px] bg-gradient-to-br from-[#00AEEF]/20 to-transparent border border-[#00AEEF]/30 p-2">
             <div className="h-1.5 w-8 bg-white/40 rounded-full mb-2" />
             <div className="h-3 w-12 bg-white rounded-full" />
          </div>
          <div className="h-16 w-2/3 rounded-[10px] bg-white/[0.05] border border-white/5 p-2 flex flex-col gap-1.5">
             <div className="h-1.5 w-full bg-white/10 rounded-full" />
             <div className="h-1.5 w-4/5 bg-white/10 rounded-full" />
             <div className="h-1.5 w-full bg-white/10 rounded-full" />
          </div>
        </div>
        
        <div className="h-8 w-full rounded-[8px] bg-[#00AEEF]/10 flex items-center px-3 justify-between">
           <div className="h-1.5 w-16 bg-[#00AEEF]/60 rounded-full" />
           <div className="h-3 w-3 rounded-full bg-[#00AEEF]" />
        </div>
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 4, 0], x: [0, 2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-4 -bottom-4 w-[110px] rounded-[12px] border border-white/10 bg-black/80 backdrop-blur-xl p-2.5 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-5 rounded-full bg-[#00AEEF] flex items-center justify-center">
             <Code2 className="h-3 w-3 text-white" />
          </div>
          <div className="h-1.5 w-12 bg-white/60 rounded-full" />
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "86%" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full bg-[#00AEEF]" 
          />
        </div>
      </motion.div>
    </div>
  </div>
);

const SecurityVisual = () => (
  <div className="flex h-full w-full items-center justify-center relative">
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" 
    />
    
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-4 rounded-full border border-dashed border-emerald-500/30"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-8 rounded-full border border-emerald-500/10"
      />
      
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-24 w-24 items-center justify-center rounded-[24px] border border-emerald-500/30 bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)]"
      >
        <ShieldCheck className="h-10 w-10 text-emerald-400" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: [10, -10] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute h-0.5 w-12 bg-emerald-400/50 blur-[1px]"
        />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-6 -bottom-2 flex items-center gap-2 rounded-[10px] border border-white/10 bg-black/80 backdrop-blur-md px-3 py-2 shadow-xl"
      >
        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <span className="text-[10px] font-bold tracking-wider text-emerald-100">SECURE</span>
      </motion.div>
    </div>
  </div>
);

const NetworkVisual = () => (
  <div className="flex h-full w-full items-center justify-center relative">
    <div className="absolute w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
    
    <div className="relative w-[180px] h-[140px]">
      <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 174, 239, 0.4))' }}>
        <motion.path 
          d="M 90 20 L 30 120 M 90 20 L 150 120 M 30 120 L 150 120" 
          stroke="rgba(0, 174, 239, 0.3)" 
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
        />
        <motion.circle cx="90" cy="20" r="4" fill="#00AEEF" animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="30" cy="120" r="4" fill="#00AEEF" animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
        <motion.circle cx="150" cy="120" r="4" fill="#00AEEF" animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} />
      </svg>
      
      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-0 left-[70px] bg-black/60 backdrop-blur-md border border-[#00AEEF]/30 rounded-[8px] px-2 py-1">
        <Network className="h-3 w-3 text-[#00AEEF] mx-auto mb-0.5" />
        <div className="text-[8px] font-bold text-white text-center">CLOUD</div>
      </motion.div>
      
      <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="absolute bottom-0 left-[10px] bg-black/60 backdrop-blur-md border border-white/10 rounded-[8px] px-2 py-1">
        <Server className="h-3 w-3 text-white/70 mx-auto mb-0.5" />
        <div className="text-[8px] font-bold text-white/70 text-center">LAN</div>
      </motion.div>
      
      <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute bottom-0 right-[10px] bg-black/60 backdrop-blur-md border border-white/10 rounded-[8px] px-2 py-1">
        <LockKeyhole className="h-3 w-3 text-white/70 mx-auto mb-0.5" />
        <div className="text-[8px] font-bold text-white/70 text-center">VPN</div>
      </motion.div>
    </div>
  </div>
);

const HardwareVisual = () => (
  <div className="flex h-full w-full items-center justify-center relative">
    <div className="grid grid-cols-2 gap-3 w-[180px] sm:w-[220px]">
      {[
        { name: "Serveurs", load: 45, icon: Server },
        { name: "Stockage", load: 82, icon: Server },
        { name: "CPU", load: 30, icon: Server },
        { name: "RAM", load: 60, icon: Server }
      ].map((item, i) => (
        <motion.div 
          key={item.name}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          className="rounded-[12px] border border-white/10 bg-black/40 backdrop-blur-md p-2.5 relative overflow-hidden shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <item.icon className="h-3 w-3 text-white/50" />
            <span className="text-[9px] font-semibold text-white/70 uppercase tracking-wider">{item.name}</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${item.load}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className={`h-full ${item.load > 80 ? 'bg-amber-400' : 'bg-[#00AEEF]'}`} 
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ServiceVisual = ({ visual }: { visual: HeroOffering["visual"] }) => {
  if (visual === "erp") return <ErpVisual />;
  if (visual === "web") return <WebVisual />;
  if (visual === "network") return <NetworkVisual />;
  if (visual === "hardware") return <HardwareVisual />;
  if (visual === "support") return <HardwareVisual />;
  return <SecurityVisual />;
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
        className="group relative"
      >
        <div className="rounded-[36px] border-[4px] border-zinc-400 dark:border-black bg-zinc-300 dark:bg-black p-3 sm:p-4 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] dark:shadow-inner ring-1 ring-black/10 dark:ring-zinc-800 transition-colors duration-500">
          <div className="relative overflow-hidden rounded-[24px] border border-black/20 dark:border-zinc-800 bg-[#070707] transition-colors duration-500">
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
              className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_24%,transparent_42%)] opacity-40"
            />

            <div className="relative z-10 aspect-[16/11] p-3 sm:p-5">
              <div className="flex h-full flex-col rounded-[24px] border border-white/5 bg-white/[0.015] p-3 sm:p-4 shadow-2xl">
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
                      <motion.div
                        key={`${activeOffering.title}-visual`}
                        variants={slideVariants}
                        initial={shouldReduceMotion ? false : "hidden"}
                        animate="visible"
                        exit={shouldReduceMotion ? undefined : "exit"}
                        transition={{ duration: 0.48, ease: "easeOut" }}
                        className="relative h-full overflow-hidden"
                      >
                        <img
                          src={activeOffering.image}
                          alt={activeOffering.imageAlt}
                          className="absolute inset-0 h-full w-full object-cover opacity-[0.25]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/50 to-transparent" />
                        
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,174,239,0.1),transparent_70%)]" />

                        <div className="relative z-10 h-full p-2">
                          <ServiceVisual visual={activeOffering.visual} />
                        </div>
                      </motion.div>
                    </AnimatePresence>
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
