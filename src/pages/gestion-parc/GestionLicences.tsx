import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { BookOpen } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80",
  icon: BookOpen,
  category: "Gestion de parc informatique",
  title: "Gestion des Licences",
  accent: "",
  intro: "Optimisation de licences. Découvrez comment DigitalPro Systems IT peut accompagner votre entreprise vers le succès.",
  sectionTitle: "Des solutions taillées pour vos besoins",
  paragraphs: ["Nous mettons à votre disposition notre savoir-faire en matière de gestion des licences pour optimiser vos processus, sécuriser vos données et accroître votre performance globale.", "Chaque projet est mené avec rigueur et méthode, en étroite collaboration avec vos équipes techniques et fonctionnelles."],
  features: ["Expertise technique approfondie et certifiée", "Accompagnement personnalisé et sur-mesure", "Support réactif et disponibilité de nos équipes", "Solutions technologiques de dernière génération", "Respect rigoureux des délais et des engagements", "Transfert de compétences et formation continue"],
};

export default function GestionLicences() {
  return <ServicePageTemplate {...params} />;
}
