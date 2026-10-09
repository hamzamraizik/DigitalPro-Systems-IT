import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { Shield } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80",
  icon: Shield,
  category: "Cybersécurité",
  title: "Firewall & VPN",
  accent: "",
  intro: "Protection périmétrique avancée. Découvrez comment DigitalPro Systems IT peut accompagner votre entreprise vers le succès.",
  sectionTitle: "Des solutions taillées pour vos besoins",
  paragraphs: ["Nous mettons à votre disposition notre savoir-faire en matière de firewall & vpn pour optimiser vos processus, sécuriser vos données et accroître votre performance globale.", "Chaque projet est mené avec rigueur et méthode, en étroite collaboration avec vos équipes techniques et fonctionnelles."],
  features: ["Expertise technique approfondie et certifiée", "Accompagnement personnalisé et sur-mesure", "Support réactif et disponibilité de nos équipes", "Solutions technologiques de dernière génération", "Respect rigoureux des délais et des engagements", "Transfert de compétences et formation continue"],
};

export default function FirewallVpn() {
  return <ServicePageTemplate {...params} />;
}
