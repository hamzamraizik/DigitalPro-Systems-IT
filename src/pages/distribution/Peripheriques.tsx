import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { Package } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
  icon: Package,
  category: "Distribution & Équipements",
  title: "Périphériques",
  accent: "",
  intro: "Imprimantes, écrans. Découvrez comment DigitalPro Systems IT peut accompagner votre entreprise vers le succès.",
  sectionTitle: "Des solutions taillées pour vos besoins",
  paragraphs: ["Nous mettons à votre disposition notre savoir-faire en matière de périphériques pour optimiser vos processus, sécuriser vos données et accroître votre performance globale.", "Chaque projet est mené avec rigueur et méthode, en étroite collaboration avec vos équipes techniques et fonctionnelles."],
  features: ["Expertise technique approfondie et certifiée", "Accompagnement personnalisé et sur-mesure", "Support réactif et disponibilité de nos équipes", "Solutions technologiques de dernière génération", "Respect rigoureux des délais et des engagements", "Transfert de compétences et formation continue"],
};

export default function Peripheriques() {
  return <ServicePageTemplate {...params} />;
}
