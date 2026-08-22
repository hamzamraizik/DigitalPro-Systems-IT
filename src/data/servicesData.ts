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

// Toutes les chaînes affichées vivent dans src/locales/fr.json et en.json
// sous la clé "servicesPage". Ce fichier ne contient que la structure
// (icônes, ids, clés de traduction) — jamais de texte en dur.

export interface ServiceItem {
  key: string; // clé i18n -> servicesPage.categories.<id>.items.<key>
  icon: LucideIcon;
  hasTags?: boolean; // true si des tags existent -> servicesPage.categories.<id>.tags.<key>
}

export interface ServiceCategory {
  id: string; // clé i18n -> servicesPage.categories.<id>
  icon: LucideIcon;
  items: ServiceItem[];
}

export interface WhyUsItem {
  key: string; // clé i18n -> servicesPage.whyUs.points.<key>
  icon: LucideIcon;
}

export const serviceSlugByKey: Record<string, string> = {
  controleAcces: "controle-acces",
  videosurveillance: "videosurveillance",
  alarmeIntrusion: "alarme-anti-intrusion",
  protectionIncendie: "protection-incendie",
  securitePeripherique: "securite-peripherique",
  serruresBatiments: "serrures-batiments",
  firewallVpn: "firewall-vpn",
  detectionIntrusion: "detection-intrusion",
  socSupervision: "soc-supervision",
  auditSecurite: "audit-securite",
  sensibilisation: "sensibilisation",
  planReprise: "plan-reprise",
  reseauxLanWan: "reseaux-lan-wan",
  cablageStructure: "cablage-structure",
  wifiEntreprise: "wifi-entreprise",
  virtualisation: "virtualisation",
  firewallReseau: "firewall-reseau",
  cloudHybride: "cloud-hybride",
  maintenancePreventive: "maintenance-preventive",
  helpdesk: "helpdesk",
  supervisionProactive: "supervision-proactive",
  inventaireSuivi: "inventaire-suivi",
  migrationPostes: "migration-postes",
  gestionLicences: "gestion-licences",
  applicationsWeb: "applications-web",
  applicationsMobiles: "applications-mobiles",
  apiIntegrations: "api-integrations",
  erpSurMesure: "erp-sur-mesure",
  crmRelationClient: "crm-relation-client",
  businessIntelligence: "business-intelligence",
  serveursStockage: "serveurs-stockage",
  postesTravail: "postes-travail",
  equipementsReseau: "equipements-reseau",
  peripheriques: "peripheriques",
  licencesLogicielles: "licences-logicielles",
  importExport: "import-export",
};

export const whyUs: WhyUsItem[] = [
  { key: "expertise", icon: Award },
  { key: "accompagnement", icon: Handshake },
  { key: "support", icon: Headphones },
  { key: "solutions", icon: Rocket },
  { key: "delais", icon: Clock },
  { key: "formation", icon: GraduationCap },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: "securite-electronique",
    icon: ShieldCheck,
    items: [
      { key: "controleAcces", icon: Fingerprint, hasTags: true },
      { key: "videosurveillance", icon: Camera, hasTags: true },
      { key: "alarmeIntrusion", icon: BellRing, hasTags: true },
      { key: "protectionIncendie", icon: Flame, hasTags: true },
      { key: "securitePeripherique", icon: ShieldAlert, hasTags: true },
      { key: "serruresBatiments", icon: KeyRound, hasTags: true },
    ],
  },
  {
    id: "cybersecurite",
    icon: Shield,
    items: [
      { key: "firewallVpn", icon: Shield },
      { key: "detectionIntrusion", icon: Bug },
      { key: "socSupervision", icon: Eye },
      { key: "auditSecurite", icon: BookOpen },
      { key: "sensibilisation", icon: Lock },
      { key: "planReprise", icon: Database },
    ],
  },
  {
    id: "infrastructures-reseaux",
    icon: Globe,
    items: [
      { key: "reseauxLanWan", icon: Globe },
      { key: "cablageStructure", icon: HardDrive },
      { key: "wifiEntreprise", icon: Wifi },
      { key: "virtualisation", icon: Server },
      { key: "firewallReseau", icon: ShieldCheck },
      { key: "cloudHybride", icon: TrendingUp },
    ],
  },
  {
    id: "gestion-parc",
    icon: Monitor,
    items: [
      { key: "maintenancePreventive", icon: Monitor },
      { key: "helpdesk", icon: Headphones },
      { key: "supervisionProactive", icon: LayoutDashboard },
      { key: "inventaireSuivi", icon: Package },
      { key: "migrationPostes", icon: Laptop },
      { key: "gestionLicences", icon: BookOpen },
    ],
  },
  {
    id: "developpement",
    icon: Code,
    items: [
      { key: "applicationsWeb", icon: Globe },
      { key: "applicationsMobiles", icon: Laptop },
      { key: "apiIntegrations", icon: Code },
      { key: "erpSurMesure", icon: BarChart3 },
      { key: "crmRelationClient", icon: TrendingUp },
      { key: "businessIntelligence", icon: LayoutDashboard },
    ],
  },
  {
    id: "distribution",
    icon: Server,
    items: [
      { key: "serveursStockage", icon: Server },
      { key: "postesTravail", icon: Laptop },
      { key: "equipementsReseau", icon: Wifi },
      { key: "peripheriques", icon: Package },
      { key: "licencesLogicielles", icon: BookOpen },
      { key: "importExport", icon: Truck },
    ],
  },
];

export const getServiceCategory = (id: string) =>
  serviceCategories.find((c) => c.id === id);
