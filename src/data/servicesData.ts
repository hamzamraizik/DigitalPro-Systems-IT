import {
  ShieldCheck, Shield, Globe, Monitor, Code, Server,
  Fingerprint, Camera, BellRing, Flame, ShieldAlert, KeyRound,
  Bug, Eye, BookOpen, Lock, Database,
  HardDrive, Wifi, TrendingUp,
  Headphones, LayoutDashboard, Package, Laptop,
  BarChart3, Truck,
  Award, Handshake, Rocket, Clock, GraduationCap,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags?: string[];
}

export interface ServiceCategory {
  id: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  items: ServiceItem[];
}

export interface WhyUsItem {
  icon: LucideIcon;
  text: string;
}

// Points de différenciation communs, affichés dans chaque popup de service
export const whyUs: WhyUsItem[] = [
  { icon: Award, text: "Expertise technique approfondie et certifiée" },
  { icon: Handshake, text: "Accompagnement personnalisé et sur-mesure" },
  { icon: Headphones, text: "Support réactif et disponibilité de nos équipes" },
  { icon: Rocket, text: "Solutions technologiques de dernière génération" },
  { icon: Clock, text: "Respect rigoureux des délais et des engagements" },
  { icon: GraduationCap, text: "Transfert de compétences et formation continue" },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: "securite-electronique",
    icon: ShieldCheck,
    title: "Sécurité Électronique",
    intro:
      "Protégez vos locaux, vos équipes et vos actifs physiques grâce à des systèmes de sécurité électronique intelligents, conçus sur mesure pour chaque site : bureaux, entrepôts, commerces ou sites industriels. Nos équipements certifiés sont installés et maintenus par nos techniciens agréés.",
    items: [
      {
        icon: Fingerprint,
        title: "Contrôle d'Accès",
        desc: "Biométrie, badges RFID/NFC, gestion multi-zones et journaux d'accès en temps réel.",
        tags: [
          "Lecteurs biométriques (empreinte, iris, reconnaissance faciale)",
          "Badges & cartes RFID/NFC",
          "Gestion multi-sites centralisée",
          "Historique et journalisation des entrées/sorties",
        ],
      },
      {
        icon: Camera,
        title: "Vidéosurveillance",
        desc: "Caméras IP/HD 24h/24, vision nocturne, analyse vidéo intelligente et stockage sécurisé.",
        tags: [
          "Caméras IP HD/Full HD/4K",
          "Vision nocturne & infrarouge",
          "Analyse vidéo intelligente (reconnaissance de plaques)",
          "Stockage local et/ou cloud",
        ],
      },
      {
        icon: BellRing,
        title: "Alarme Anti-Intrusion",
        desc: "Détecteurs de mouvement, sirènes, alertes SMS et télésurveillance avec intervention rapide.",
        tags: [
          "Détecteurs infrarouge & micro-ondes",
          "Sirènes intérieures et extérieures",
          "Alertes SMS en temps réel",
          "Télésurveillance 24h/24",
        ],
      },
      {
        icon: Flame,
        title: "Protection Incendie",
        desc: "Détection précoce, extinction automatique, conformité réglementaire et maintenance annuelle.",
        tags: [
          "Détecteurs de fumée et de chaleur",
          "Centrales d'alarme certifiées",
          "Sprinklers et extinction automatique",
          "Maintenance réglementaire périodique",
        ],
      },
      {
        icon: ShieldAlert,
        title: "Sécurité Périphérique",
        desc: "Clôtures électrifiées, barrières infrarouges, éclairage automatique et surveillance périmétrique.",
        tags: [
          "Clôtures et barrières électrifiées",
          "Détecteurs de vibration et de choc",
          "Éclairage de sécurité automatique",
          "Bornes anti-bélier et bollards",
        ],
      },
      {
        icon: KeyRound,
        title: "Serrures de Bâtiments",
        desc: "Serrures connectées, cylindres digitaux, portes blindées et gestion des accès à distance.",
        tags: [
          "Serrures connectées à distance",
          "Cylindres digitaux à code ou carte",
          "Portes et portails automatiques sécurisés",
          "Historique et audit des ouvertures",
        ],
      },
    ],
  },
  {
    id: "cybersecurite",
    icon: Shield,
    title: "Cybersécurité",
    intro:
      "Anticipez, détectez et neutralisez les menaces numériques grâce à une approche complète de la cybersécurité : protection périmétrique, supervision continue, audits réguliers et formation de vos équipes, pour une résilience totale face aux cyberattaques.",
    items: [
      { icon: Shield, title: "Firewall & VPN", desc: "Protection périmétrique avancée et tunnels VPN sécurisés pour vos collaborateurs." },
      { icon: Bug, title: "Détection d'Intrusion", desc: "IDS/IPS, monitoring continu et alertes en temps réel sur vos infrastructures." },
      { icon: Eye, title: "SOC & Supervision", desc: "Centre opérationnel de sécurité, surveillance 24h/24 et réponse aux incidents." },
      { icon: BookOpen, title: "Audit de Sécurité", desc: "Tests de pénétration, analyse des vulnérabilités et rapports de conformité." },
      { icon: Lock, title: "Sensibilisation", desc: "Formations et ateliers pour sensibiliser vos équipes aux bonnes pratiques." },
      { icon: Database, title: "Plan de Reprise", desc: "PRA/PCA, sauvegarde chiffrée et continuité d'activité garantie." },
    ],
  },
  {
    id: "infrastructures-reseaux",
    icon: Globe,
    title: "Infrastructures Réseaux & Systèmes",
    intro:
      "Construisez une infrastructure réseau robuste, évolutive et hautement disponible. De la conception du câblage à la migration vers le cloud hybride, nous concevons des architectures qui garantissent performance, sécurité et agilité à votre entreprise.",
    items: [
      { icon: Globe, title: "Réseaux LAN/WAN", desc: "Conception et déploiement de réseaux performants et hautement disponibles." },
      { icon: HardDrive, title: "Câblage Structuré", desc: "Installation de câblage cuivre et fibre optique aux standards TIA/ISO." },
      { icon: Wifi, title: "WiFi Entreprise", desc: "Solutions Wi-Fi 6 haute densité avec itinérance transparente et sécurisation." },
      { icon: Server, title: "Virtualisation", desc: "VMware, Hyper-V, migration vers le cloud hybride et conteneurisation." },
      { icon: ShieldCheck, title: "Firewall Réseau", desc: "Segmentation, DMZ, VLAN et politique de sécurité réseau avancée." },
      { icon: TrendingUp, title: "Cloud Hybride", desc: "Migration et gestion de vos ressources cloud AWS, Azure ou privées." },
    ],
  },
  {
    id: "gestion-parc",
    icon: Monitor,
    title: "Gestion de Parc Informatique",
    intro:
      "Confiez-nous la gestion opérationnelle de votre parc informatique. Maintenance préventive, helpdesk réactif, supervision proactive et inventaire automatisé : nous assurons la tranquillité et la continuité de votre activité au quotidien.",
    items: [
      { icon: Monitor, title: "Maintenance Préventive", desc: "Interventions planifiées, nettoyage, mises à jour et rapport de santé du parc." },
      { icon: Headphones, title: "Helpdesk N1/N2/N3", desc: "Support technique multi-niveaux, ticketing et SLA garantis." },
      { icon: LayoutDashboard, title: "Supervision Proactive", desc: "Monitoring en temps réel avec alertes avant panne et tableaux de bord." },
      { icon: Package, title: "Inventaire & Suivi", desc: "Gestion complète des actifs informatiques et cycle de vie des équipements." },
      { icon: Laptop, title: "Migration de Postes", desc: "Remplacement, déploiement d'images et transfert de données sécurisé." },
      { icon: BookOpen, title: "Gestion des Licences", desc: "Audit, renouvellement et optimisation de vos licences logicielles." },
    ],
  },
  {
    id: "developpement",
    icon: Code,
    title: "Développement Logiciel & ERP/CRM",
    intro:
      "Optimisez vos flux de travail grâce à des logiciels métiers sur mesure. De l'application web à l'intégration ERP, nos équipes de développement conçoivent des solutions digitales adaptées à vos processus et à votre secteur d'activité.",
    items: [
      { icon: Globe, title: "Applications Web", desc: "Sites et applications web sur mesure, performants, responsive et sécurisés." },
      { icon: Laptop, title: "Applications Mobiles", desc: "Apps iOS et Android natives ou cross-platform adaptées à vos métiers." },
      { icon: Code, title: "API & Intégrations", desc: "Connexion de vos logiciels existants via des APIs robustes et documentées." },
      { icon: BarChart3, title: "ERP sur Mesure", desc: "Implémentation et personnalisation de solutions ERP adaptées à votre secteur." },
      { icon: TrendingUp, title: "CRM & Relation Client", desc: "Gestion des ventes, marketing automation et fidélisation client." },
      { icon: LayoutDashboard, title: "Business Intelligence", desc: "Tableaux de bord, KPIs et rapports pour piloter votre activité." },
    ],
  },
  {
    id: "distribution",
    icon: Server,
    title: "Vente & Distribution de Matériel",
    intro:
      "Équipez votre entreprise avec du matériel professionnel de qualité, sourcé auprès des meilleurs constructeurs mondiaux. Serveurs, postes de travail, équipements réseau et périphériques : nous gérons le sourcing, l'installation et la garantie.",
    items: [
      { icon: Server, title: "Serveurs & Stockage", desc: "Serveurs rack, NAS, SAN et solutions de stockage haute capacité." },
      { icon: Laptop, title: "Postes de Travail", desc: "PC fixes, laptops, stations graphiques de marques leaders avec garantie." },
      { icon: Wifi, title: "Équipements Réseau", desc: "Switches, routeurs, points d'accès Cisco, Ubiquiti, HP et autres." },
      { icon: Package, title: "Périphériques", desc: "Imprimantes, écrans, scanners et accessoires informatiques professionnels." },
      { icon: BookOpen, title: "Licences Logicielles", desc: "Microsoft, Adobe, antivirus et logiciels métiers au meilleur prix." },
      { icon: Truck, title: "Import / Export", desc: "Importation et exportation de matériel technologique international." },
    ],
  },
];

export const getServiceCategory = (id: string) =>
  serviceCategories.find((c) => c.id === id);
