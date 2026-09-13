import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { Wifi } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80",
  icon: Wifi,
  category: "Infrastructures & Réseaux",
  title: "WiFi Entreprise",
  accent: "",
  intro: "Solutions Wi-Fi 6. Découvrez comment DigitalPro Systems IT peut accompagner votre entreprise vers le succès.",
  sectionTitle: "Des solutions taillées pour vos besoins",
  paragraphs: ["Nous mettons à votre disposition notre savoir-faire en matière de wifi entreprise pour optimiser vos processus, sécuriser vos données et accroître votre performance globale.", "Chaque projet est mené avec rigueur et méthode, en étroite collaboration avec vos équipes techniques et fonctionnelles."],
  features: ["Expertise technique approfondie et certifiée", "Accompagnement personnalisé et sur-mesure", "Support réactif et disponibilité de nos équipes", "Solutions technologiques de dernière génération", "Respect rigoureux des délais et des engagements", "Transfert de compétences et formation continue"],
};

export default function WifiEntreprise() {
  return <ServicePageTemplate {...params} />;
}
