import {
  BarChart3,
  CheckCircle2,
  Code2,
  Fingerprint,
  HardDrive,
  Headphones,
  LockKeyhole,
  Network,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface Metric {
  value: string;
  label: string;
  tKey?: string;
}

export interface Service {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  image?: string;
  imageAlt?: string;
  layout: "feature" | "darkWide" | "darkSmall";
  kicker?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  tKey?: string;
}

export interface TrustPoint {
  title: string;
  description: string;
  icon: LucideIcon;
  tKey?: string;
}

export const heroMetrics: Metric[] = [
  { value: "20+", label: "Clients accompagnés", tKey: "clients" },
  { value: "5+", label: "Années d'expérience", tKey: "experience" },
  { value: "50+", label: "Projets livrés", tKey: "projects" },
  { value: "24/7", label: "Support technique", tKey: "support" },
];

export const expertisePoints: TrustPoint[] = [
  {
    title: "Cybersécurité opérationnelle",
    description: "Audit, durcissement, pare-feu, supervision et plans de reprise pour environnements sensibles.",
    icon: ShieldCheck,
    tKey: "cyber"
  },
  {
    title: "Infrastructure fiable",
    description: "Réseaux LAN/WAN, WiFi entreprise, virtualisation, stockage et cloud hybride.",
    icon: Network,
    tKey: "infra"
  },
  {
    title: "Systèmes métier",
    description: "ERP, CRM, applications web, API et tableaux de bord adaptés aux processus internes.",
    icon: Code2,
    tKey: "system"
  },
  {
    title: "Sécurité & Contrôle physique",
    description: "Vidéosurveillance avancée, contrôle d'accès biométrique et alarmes pour protéger vos sites.",
    icon: Fingerprint,
    tKey: "physical"
  },
];

export const services: Service[] = [
  {
    title: "Sécurité électronique",
    description: "Contrôle d'accès, vidéosurveillance, alarmes et protection incendie pour sites professionnels.",
    href: "/services#securite-electronique",
    icon: Fingerprint,
    layout: "feature",
    kicker: "Sites sensibles",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Caméra de vidéosurveillance installée sur un site professionnel",
  },
  {
    title: "Cybersécurité",
    description: "Firewalls, VPN, détection d'intrusion, audit, sensibilisation et supervision SOC.",
    href: "/services#cybersecurite",
    icon: LockKeyhole,
    layout: "darkWide",
    kicker: "Protection active",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Poste de travail cybersécurité dans un environnement sombre",
  },
  {
    title: "Réseaux & systèmes",
    description: "Architecture, câblage, WiFi, virtualisation, firewall réseau et cloud hybride.",
    href: "/services#infrastructures-reseaux",
    icon: Network,
    layout: "darkSmall",
    kicker: "Infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Baie serveur et câblage réseau en salle informatique",
  },
  {
    title: "Gestion de parc IT",
    description: "Helpdesk, maintenance préventive, inventaire, migration postes et gestion des licences.",
    href: "/services#gestion-parc",
    icon: Headphones,
    layout: "darkSmall",
    kicker: "Support continu",
  },
  {
    title: "ERP, CRM & logiciels",
    description: "Applications web et mobiles, integrations API, ERP sur mesure et Business Intelligence.",
    href: "/services#developpement",
    icon: BarChart3,
    layout: "darkSmall",
    kicker: "Outils métier",
  },
  {
    title: "Matériel professionnel",
    description: "Serveurs, stockage, postes de travail, équipements réseau, périphériques et licences.",
    href: "/services#distribution",
    icon: HardDrive,
    layout: "darkSmall",
    kicker: "Distribution",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Composants électroniques et matériel informatique professionnel",
  },
];

export const solutionsEditorialCard = {
  title: "Une architecture pensée autour des risques réels",
  description:
    "Nous relions sécurité physique, réseau, sauvegarde, supervision et logiciel métier dans un ensemble cohérent, documenté et exploitable par vos équipes.",
  href: "/services",
};

export const processSteps: ProcessStep[] = [
  {
    title: "Audit terrain",
    description: "Nous cadrons les risques, les dépendances métier, l'existant technique et les contraintes du site.",
    tKey: "s1"
  },
  {
    title: "Architecture cible",
    description: "Nous proposons une trajectoire claire avec priorités, budget, planning et niveau de service attendu.",
    tKey: "s2"
  },
  {
    title: "Déploiement maîtrisé",
    description: "Les équipes installent, sécurisent, documentent et valident chaque composant avant passage en production.",
    tKey: "s3"
  },
  {
    title: "Support continu",
    description: "Supervision, maintenance, assistance et amélioration continue gardent l'infrastructure sous contrôle.",
    tKey: "s4"
  },
];

export const caseStudyMetrics: Metric[] = [
  { value: "42", label: "Équipements sécurisés" },
  { value: "6", label: "Sites raccordés" },
  { value: "99.9%", label: "Disponibilité visée" },
];

export const caseStudyHighlights = [
  "Segmentation réseau et contrôle des accès critiques",
  "Supervision centralisée avec alertes et procédures d'escalade",
  "Sauvegarde, documentation et plan de reprise d'activité",
];

export const whyUsPoints = [
  "Expertise technique certifiée",
  "Support réactif 24/7",
  "Solutions personnalisées",
  "Partenariats avec les leaders du marché",
  "Présence nationale au Maroc",
  "Engagement qualité et délais",
].map((title) => ({ title, icon: CheckCircle2 }));

export const footerServiceLinks = [
  "Sécurité électronique",
  "Infrastructures réseaux",
  "Développement logiciel",
  "Solutions ERP/CRM",
  "Vente de matériel",
];

export const footerCompanyLinks = [
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
