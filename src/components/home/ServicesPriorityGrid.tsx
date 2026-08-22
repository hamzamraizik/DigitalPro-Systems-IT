import { useState, useEffect, type CSSProperties, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Calculator,
  Cctv,
  Code2,
  Fingerprint,
  Headphones,
  Lock,
  Network,
  Package,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/home/Container";
import { SectionHeader } from "@/components/home/SectionHeader";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type ServiceGroup = "software" | "hardware";
type ServiceVariant =
  | "erp"
  | "web"
  | "mobile"
  | "hardware"
  | "securityPhysical"
  | "network"
  | "cyber"
  | "gestion"
  | "support";

type PriorityService = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  variant: ServiceVariant;
  group: ServiceGroup;
  icon: LucideIcon;
  image?: string;
};

const softwareServices: PriorityService[] = [
  {
    title: "Solutions ERP & CRM sur mesure",
    eyebrow: "Flagship logiciel",
    description:
      "Automatisation avancée, gestion de stock, ventes, achats, workflows personnalisés et pilotage complet de vos opérations.",
    href: "/services#developpement",
    variant: "erp",
    group: "software",
    icon: Workflow,
    image: "/software-bg.webp",
  },
  {
    title: "Développement Web & Plateformes Digitales",
    eyebrow: "Plateformes",
    description:
      "Portails métier, interfaces e-commerce, extranets et applications web rapides, sécurisées et pensées pour l'usage quotidien.",
    href: "/services#developpement",
    variant: "web",
    group: "software",
    icon: Code2,
  },
  {
    title: "Applications mobiles métier",
    eyebrow: "Terrain & client",
    description:
      "Applications mobiles pour équipes terrain, parcours client, notifications, formulaires et données connectées.",
    href: "/services#developpement",
    variant: "mobile",
    group: "software",
    icon: Smartphone,
  },
];

const hardwareServices: PriorityService[] = [
  {
    title: "Vente de Matériel",
    eyebrow: "Équipement",
    description: "Serveurs, équipements réseaux, stations de travail, périphériques et licences professionnelles.",
    href: "/services#distribution",
    variant: "hardware",
    group: "hardware",
    icon: Server,
    image: "/hardware-bg.webp",
  },
  {
    title: "Sécurité Électronique",
    eyebrow: "Flagship sécurité site",
    description:
      "Contrôle d'accès, vidéosurveillance intelligente, alarmes, protection incendie et sécurisation des zones sensibles.",
    href: "/services#securite-electronique",
    variant: "securityPhysical",
    group: "hardware",
    icon: Fingerprint,
    image: "/security-bg.webp",
  },
  {
    title: "Infrastructures Réseaux & Systèmes",
    eyebrow: "Flagship infrastructure",
    description:
      "Architecture LAN/WAN, câblage certifié, WiFi entreprise, VPN, virtualisation, stockage et cloud hybride.",
    href: "/services#infrastructures-reseaux",
    variant: "network",
    group: "hardware",
    icon: Network,
    image: "/network-bg.webp",
  },
  {
    title: "Cybersécurité",
    eyebrow: "Protection",
    description: "Audit, pare-feu nouvelle génération, durcissement, VPN et supervision des environnements sensibles.",
    href: "/services#cybersecurite",
    variant: "cyber",
    group: "hardware",
    icon: ShieldCheck,
    image: "/cyber-bg.webp",
  },
  {
    title: "Gestion de Parc IT",
    eyebrow: "Exploitation",
    description: "Infogérance, maintenance préventive, inventaire, migration postes et support technique réactif.",
    href: "/services#gestion-parc",
    variant: "gestion",
    group: "hardware",
    icon: Headphones,
    image: "/gestion-bg.webp",
  },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const handleSpotlightMove = (event: MouseEvent<HTMLAnchorElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
};

const DashboardPreview = () => (
  <div className="group relative flex w-full max-w-[480px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950 shadow-2xl transition-all duration-500 hover:border-white/20">
    {/* Decorative Top Bar */}
    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#00AEEF] to-transparent opacity-30" />
    
    <div className="relative z-10 flex items-start justify-between p-6 pb-0">
      <div>
        <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#00AEEF]">Écosystème Intégré</span>
        <h4 className="font-display text-lg font-bold text-white">ERP & CRM</h4>
      </div>
      <span className="flex items-center gap-1.5 rounded-full border border-[#00AEEF]/20 bg-[#00AEEF]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00AEEF]">
         <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00AEEF]" />
         Connecté
      </span>
    </div>

    <div className="relative mt-2 flex h-[280px] w-full items-center justify-center overflow-hidden">
       {/* Background Glow */}
       <div className="absolute inset-0 scale-75 rounded-full bg-[#00AEEF]/5 blur-3xl transition-colors duration-500 group-hover:bg-[#00AEEF]/10" />
       
       <img 
         src="/erp-illustration.webp"
         alt="ERP CRM Dashboard" 
         loading="lazy"
         decoding="async"
         className="relative z-10 h-full w-full scale-[1.15] object-contain drop-shadow-xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.25]"
       />
    </div>

    <div className="absolute bottom-0 left-0 z-20 w-full bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent p-6 pt-16">
       <div className="flex w-full items-center justify-between rounded-[20px] border border-white/5 bg-white/5 p-2 shadow-lg backdrop-blur-xl">
          {[
            { name: "Ventes", icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { name: "Stocks", icon: Package, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { name: "Compta", icon: Calculator, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
            { name: "RH", icon: Users, color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
            { name: "Projets", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
          ].map((item) => (
             <div key={item.name} className="group/item relative flex flex-col items-center justify-center">
               <div className={cn("relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-[14px] border transition-all duration-300 group-hover/item:-translate-y-2 group-hover/item:scale-110 group-hover/item:shadow-xl", item.bg, item.border)}>
                 <item.icon className={cn("h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300", item.color)} />
               </div>
               <span className="absolute -bottom-1 text-[9px] font-bold text-zinc-300 opacity-0 transition-all duration-300 group-hover/item:-bottom-5 group-hover/item:opacity-100">
                 {item.name}
               </span>
             </div>
          ))}
       </div>
    </div>
  </div>
);

const WebPreview = () => (
  <div className="relative flex h-full w-full max-w-xl items-center justify-center p-4">
    <div className="group relative w-full overflow-hidden rounded-[24px] border border-white/10 shadow-2xl ring-1 ring-white/5 transition-all duration-700 hover:border-[#00AEEF]/50">
      <img 
        src="/web-realistic.webp"
        alt="Web Development" 
        loading="lazy"
        decoding="async"
        className="w-full object-cover aspect-video transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[24px] pointer-events-none" />
    </div>
  </div>
);

const AccessControlPreview = () => (
  <div className="mb-2 mt-8 flex w-full flex-1 items-center justify-center">
    <div className="group relative flex h-[280px] w-full max-w-[320px] items-center justify-center">
      {/* Decorative Rings */}
      <div className="absolute h-[280px] w-[280px] rounded-full border border-white/10" />
      <div className="absolute h-[200px] w-[200px] rounded-full border border-dashed border-white/20" />
      <div className="absolute h-[120px] w-[120px] rounded-full border border-[#00AEEF]/10 bg-[#00AEEF]/5" />

      {/* Pulsing glow */}
      <div
        className="absolute h-[120px] w-[120px] animate-ping rounded-full bg-[#00AEEF] opacity-[0.03]"
        style={{ animationDuration: "3s" }}
      />

      {/* Central Icon Container */}
      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-950/5 transition-transform duration-700 ease-out group-hover:scale-105">
        <Fingerprint className="h-10 w-10 text-[#00AEEF]" />
      </div>

      {/* Floating Badges */}
      <div className="absolute right-2 top-12 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1">
        <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pr-4 shadow-lg shadow-zinc-950/5 ring-1 ring-zinc-950/5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-50">
            <Cctv className="h-3.5 w-3.5 text-zinc-500" />
          </div>
          <span className="text-xs font-bold text-zinc-700">24 Active</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-2 transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:translate-y-1">
        <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-4 shadow-lg shadow-zinc-950/5 ring-1 ring-zinc-950/5">
          <span className="text-xs font-bold text-zinc-700">Secured</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NetworkTopologyPreview = () => (
  <div className="mt-8 rounded-[24px] border border-white/10 bg-black/[0.36] p-5">
    <div className="grid grid-cols-3 gap-4">
      {["Firewall", "Core", "Cloud"].map((node, index) => (
        <div key={node} className="relative rounded-[18px] border border-white/10 bg-white/[0.045] p-4">
          {index < 2 && <span className="absolute left-full top-1/2 hidden h-px w-4 bg-white/20 md:block" />}
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{node}</p>
          <p className="mt-3 font-display text-xl font-bold text-white">{index === 0 ? "VPN" : index === 1 ? "LAN" : "PRA"}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 grid gap-2 sm:grid-cols-3">
      {["WiFi 6", "VLAN", "Monitoring"].map((item) => (
        <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-center text-xs font-semibold text-white/60">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const CyberSecurityPreview = () => (
  <div className="mt-8 rounded-[20px] border border-white/10 bg-black/40 p-5 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
        <span className="text-[10px] font-bold tracking-wider text-emerald-400">SECURE</span>
      </div>
      <ShieldCheck className="h-4 w-4 text-emerald-500/50" />
    </div>
    <div className="space-y-2 relative z-10">
      {["Pare-feu actif", "Audit continu", "Zero Trust"].map((item) => (
        <div key={item} className="flex items-center gap-3 border-b border-white/5 pb-2 last:border-0 last:pb-0">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-zinc-300">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const GestionPreview = () => (
  <div className="mt-8 rounded-[20px] border border-white/10 bg-zinc-900/50 p-5 overflow-hidden">
    <div className="flex items-end justify-between mb-4">
      <div>
        <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1">Santé du parc</p>
        <p className="font-display text-2xl font-bold text-white">99.9%</p>
      </div>
      <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
        <Headphones className="h-4 w-4 text-[#00AEEF]" />
      </div>
    </div>
    <div className="flex gap-2">
      <div className="flex-1 bg-white/5 rounded-lg p-2 border border-white/5">
        <p className="text-[9px] text-zinc-500 uppercase">Tickets</p>
        <p className="text-sm font-bold text-white mt-1">4</p>
      </div>
      <div className="flex-1 bg-white/5 rounded-lg p-2 border border-white/5">
        <p className="text-[9px] text-zinc-500 uppercase">Postes</p>
        <p className="text-sm font-bold text-white mt-1">128</p>
      </div>
    </div>
  </div>
);

const HardwarePreview = () => (
  <div className="relative flex h-full w-full max-w-xl items-center justify-center p-4">
    <div className="group relative w-full overflow-hidden rounded-[24px] border border-white/10 shadow-2xl ring-1 ring-white/5 transition-all duration-700 hover:border-[#00AEEF]/50">
      <img 
        src="/hardware-realistic.webp"
        alt="IT Hardware and Servers" 
        loading="lazy"
        decoding="async"
        className="w-full object-cover aspect-video transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[24px] pointer-events-none" />
      
      {/* Small floating badge */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2 pointer-events-none">
        <span className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-zinc-950/80 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-400 shadow-sm backdrop-blur-md">
           <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
           Matériel En Stock
        </span>
      </div>
    </div>
  </div>
);

const MobileAppPreview = () => (
  <div className="relative flex h-full w-full max-w-xl items-center justify-center p-4">
    <div className="group relative w-full overflow-hidden rounded-[24px] border border-white/10 shadow-2xl ring-1 ring-white/5 transition-all duration-700 hover:border-[#00AEEF]/50">
      <img 
        src="/mobile-realistic.webp"
        alt="Mobile Apps" 
        loading="lazy"
        decoding="async"
        className="w-full object-cover aspect-[4/3] transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[24px] pointer-events-none" />
    </div>
  </div>
);

const PriorityCard = ({ service }: { service: PriorityService }) => {
  const Icon = service.icon;
  const isErp = service.variant === "erp";
  const isWeb = service.variant === "web";
  const isMobile = service.variant === "mobile";
  const isSecurityPhysical = service.variant === "securityPhysical";
  const isNetwork = service.variant === "network";
  const isCyber = service.variant === "cyber";
  const isGestion = service.variant === "gestion";
  const isHardware = service.variant === "hardware";
  
  const isLight = isErp || isSecurityPhysical;
  const isDark = !isLight;

  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        isErp && "md:col-span-2 md:row-span-2",
        isWeb && "md:col-span-2",
        isMobile && "md:col-span-2",
        isSecurityPhysical && "md:col-span-2 md:row-span-2",
        isNetwork && "md:col-span-2",
        isCyber && "md:col-span-1",
        isGestion && "md:col-span-1",
        isHardware && "md:col-span-4",
      )}
    >
      <Link
        to={service.href}
        onMouseMove={isDark ? handleSpotlightMove : undefined}
        className={cn(
          "group relative flex h-full min-h-[280px] overflow-hidden rounded-[28px] border p-6 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]",
          isLight
            ? "flex-col border-zinc-950/10 bg-zinc-100 text-zinc-950 hover:scale-[1.01] md:p-8"
            : "flex-col border-white/5 bg-zinc-900/50 text-white hover:border-white/20",
          isErp && "min-h-[640px]",
          isSecurityPhysical && "min-h-[620px]",
          isWeb && "min-h-[320px] pr-6 sm:pr-[190px] md:p-8 md:pr-[210px]",
          isNetwork && "min-h-[360px] md:p-8",
          isHardware && "flex-col md:flex-row md:items-center min-h-[220px] md:p-8"
        )}
      >
        {isDark && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.05), transparent 42%)",
            }}
          />
        )}

        {service.image && (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[26px]">
            <img 
              src={service.image} 
              alt="" 
              loading="lazy"
              decoding="async"
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                isSecurityPhysical ? "opacity-40 mix-blend-multiply" : isLight ? "opacity-[0.08] mix-blend-multiply" : "opacity-[0.25] mix-blend-screen"
              )} 
            />
            <div className={cn(
              "absolute inset-0", 
              isLight ? "bg-gradient-to-t from-zinc-100 via-zinc-100/60 to-transparent" : "bg-gradient-to-t from-zinc-900/95 via-zinc-900/70 to-transparent"
            )} />
            {isDark && <div className="absolute inset-0 bg-black/20" />}
          </div>
        )}

        {isWeb && <WebPreview />}
        {isMobile && <MobileAppPreview />}

        <div className={cn("relative z-10 flex h-full flex-col", (isHardware || isWeb || isMobile) && "md:w-[55%] md:justify-center md:pr-4")}>
          <div className="mb-6 flex items-center gap-3">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border",
                isLight ? "border-zinc-950/10 bg-white" : "border-white/10 bg-white/[0.04]",
              )}
            >
              <Icon className="h-5 w-5 text-[#00AEEF]" aria-hidden="true" />
            </span>
            <span className={cn("text-xs font-semibold uppercase tracking-[0.2em]", isLight ? "text-zinc-600" : "text-zinc-500")}>
              {service.eyebrow}
            </span>
          </div>

          <h3
            className={cn(
              "font-display font-bold leading-[1.02] tracking-tight",
              isErp || isSecurityPhysical ? "text-4xl sm:text-5xl" : isWeb || isNetwork ? "text-3xl sm:text-4xl" : "text-2xl",
            )}
          >
            {isWeb ? (
              <>
                Développement Web
                <span className="block text-[#00AEEF]">& Plateformes Digitales</span>
              </>
            ) : isNetwork ? (
              <>
                Infrastructures Réseaux
                <span className="block text-[#00AEEF]">& Systèmes</span>
              </>
            ) : (
              service.title
            )}
          </h3>

          <p className={cn("mt-5 max-w-xl text-sm leading-7 sm:text-base", isLight ? "text-zinc-700" : "text-zinc-400")}>
            {service.description}
          </p>

          {isErp && <DashboardPreview />}
          {isSecurityPhysical && <AccessControlPreview />}
          {isNetwork && <NetworkTopologyPreview />}

          {isCyber && <CyberSecurityPreview />}
          {isGestion && <GestionPreview />}

          <span
            className={cn(
              "mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300",
              isErp || isSecurityPhysical
                ? "w-fit rounded-[8px] bg-[#00AEEF] px-5 py-3 text-white group-hover:-translate-y-0.5 group-hover:bg-[#009BD4]"
                : "pt-8 text-zinc-300 group-hover:text-[#00AEEF]",
              isMobile && "pt-10",
              isHardware && "md:pt-6"
            )}
          >
            Explorer
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
        
        {isHardware && <HardwarePreview />}
      </Link>
    </motion.article>
  );
};

const ServiceFamily = ({
  eyebrow,
  title,
  description,
  services,
}: {
  eyebrow: string;
  title: string;
  description: string;
  services: PriorityService[];
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="mb-12 lg:mb-16"
      >
        <SectionHeader eyebrow={eyebrow} title={title} description={description} inverse />
      </motion.div>

      <motion.div
        variants={shouldReduceMotion ? undefined : gridVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.14 }}
        className="grid grid-cols-1 gap-5 md:grid-cols-4"
      >
        {services.map((service) => (
          <PriorityCard key={service.title} service={service} />
        ))}
      </motion.div>
    </div>
  );
};

const InteractiveCarousel = ({
  eyebrow,
  title,
  description,
  services,
}: {
  eyebrow: string;
  title: string;
  description: string;
  services: PriorityService[];
}) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [services.length, isHovered]);

  const activeService = services[activeIndex];

  return (
    <div className="mb-12 lg:mb-16">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      
      <div 
        className="mt-12 flex flex-col lg:flex-row gap-6 lg:gap-8 bg-[#0A0A0A] dark:bg-[#111111] border border-black/5 dark:border-white/10 rounded-[32px] p-4 lg:p-6 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] dark:shadow-none transition-colors duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Menu */}
        <div className="flex flex-col justify-center gap-2 lg:w-[35%]">
          {services.map((service, idx) => {
            const isActive = idx === activeIndex;
            const Icon = service.icon;
            return (
              <button
                key={service.title}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "group relative flex w-full items-center gap-4 overflow-hidden rounded-[24px] p-4 text-left transition-all duration-300",
                  isActive 
                    ? "border border-white/10 bg-white/10 shadow-lg" 
                    : "border border-transparent hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill" 
                    className="absolute inset-0 rounded-[24px] bg-[#00AEEF]/[0.03]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={cn(
                  "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] transition-colors duration-300",
                  isActive ? "bg-[#00AEEF] text-white shadow-[0_0_20px_rgba(0,174,239,0.4)]" : "bg-white/5 text-zinc-400 group-hover:bg-white/10 group-hover:text-zinc-200"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="relative z-10 pr-2">
                  <p className={cn(
                    "mb-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300",
                    isActive ? "text-[#00AEEF]" : "text-zinc-500 group-hover:text-zinc-400"
                  )}>
                    {t(`servicesGrid.${service.group}.cards.${service.variant}.eyebrow`)}
                  </p>
                  <p className={cn(
                    "font-display text-sm font-bold leading-tight transition-colors duration-300 sm:text-base",
                    isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                  )}>
                    {t(`servicesGrid.${service.group}.cards.${service.variant}.title`)}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Preview Area */}
        <div className="relative flex min-h-[360px] flex-col overflow-hidden rounded-[28px] border border-white/5 bg-zinc-950/80 sm:min-h-[440px] lg:min-h-[500px] lg:w-[65%]">
          <AnimatePresence mode="wait">
             <motion.div
                key={activeService.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative flex h-full w-full flex-col"
             >
                {/* Background Image logic */}
                {activeService.image && (
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <img 
                      src={activeService.image} 
                      alt="" 
                      className="h-full w-full scale-105 object-cover opacity-30 mix-blend-screen transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col p-5 sm:p-8 lg:p-12">
                  <div className="max-w-2xl">
                    <h3 className="mb-4 font-display text-2xl font-bold text-white sm:text-4xl">
                      {t(`servicesGrid.${activeService.group}.cards.${activeService.variant}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {t(`servicesGrid.${activeService.group}.cards.${activeService.variant}.description`)}
                    </p>
                  </div>

                  {/* Previews */}
                  <div className="relative z-10 mt-6 flex flex-1 items-center justify-center sm:mt-8">
                     {activeService.variant === "erp" && <DashboardPreview />}
                     {activeService.variant === "web" && <WebPreview />}
                     {activeService.variant === "mobile" && <MobileAppPreview />}
                     {activeService.variant === "hardware" && <HardwarePreview />}
                     {activeService.variant === "securityPhysical" && <AccessControlPreview />}
                     {activeService.variant === "network" && <NetworkTopologyPreview />}
                     {activeService.variant === "cyber" && <CyberSecurityPreview />}
                     {activeService.variant === "gestion" && <GestionPreview />}
                  </div>

                  <div className="relative z-10 mt-6 sm:mt-8">
                    <Link
                       to={activeService.href}
                       className="inline-flex items-center gap-2 rounded-[12px] bg-[#00AEEF] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#009BD4] hover:shadow-[0_0_20px_rgba(0,174,239,0.3)]"
                    >
                       {t("servicesGrid.btnExplore")}
                       <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
             </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const ServicesPriorityGrid = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-zinc-100 dark:bg-[#0A0A0A] py-20 text-[#111111] dark:text-white sm:py-24 lg:py-28 transition-colors duration-500">
      <Container>
        <div className="space-y-24 lg:space-y-32">
          <InteractiveCarousel
            eyebrow={t("servicesGrid.infra.eyebrow")}
            title={t("servicesGrid.infra.title")}
            description={t("servicesGrid.infra.description")}
            services={hardwareServices}
          />
          
          <InteractiveCarousel
            eyebrow={t("servicesGrid.software.eyebrow")}
            title={t("servicesGrid.software.title")}
            description={t("servicesGrid.software.description")}
            services={softwareServices}
          />
        </div>
      </Container>
    </section>
  );
};
