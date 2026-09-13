import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { KeyRound } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1504283078522-2cd93bfbe68c?w=1920&q=80",
  icon: KeyRound,
  category: "Sécurité électronique",
  title: "Serrures de",
  accent: "Bâtiments",
  intro: "Des solutions de fermeture intelligentes et sécurisées pour tous types de bâtiments professionnels et résidentiels.",
  sectionTitle: "Des accès sécurisés et intelligents",
  paragraphs: ["DPS-IT vous propose des solutions de fermeture connectées, auditables et intégrées à votre système de contrôle d'accès global, pour une gestion fluide et sécurisée.", "Que ce soit pour une PME, un immeuble de bureaux ou un site industriel, nous sélectionnons et installons les équipements les mieux adaptés à votre configuration."],
  features: ["Serrures électroniques et magnétiques", "Serrures connectées avec contrôle à distance", "Cylindres digitaux à code ou carte", "Portes blindées et renforcées", "Portails et portes automatiques sécurisés", "Gestion des clés et habilitations", "Historique et audit des ouvertures", "Solutions adaptées aux bâtiments multi-locataires"],
};

export default function SerruresBatiments() {
  return <ServicePageTemplate {...params} />;
}
