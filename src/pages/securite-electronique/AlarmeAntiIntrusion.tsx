import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { BellRing } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
  icon: BellRing,
  category: "Sécurité électronique",
  title: "Alarme",
  accent: "Anti-Intrusion",
  intro: "Sécurisez vos locaux contre toute tentative d'intrusion grâce à des systèmes d'alarme connectés et fiables.",
  sectionTitle: "Soyez alerté dès la moindre intrusion",
  paragraphs: ["Nos systèmes d'alarme anti-intrusion détectent toute présence non autorisée et déclenchent une alerte immédiate. Nous réalisons une étude préalable de vos locaux pour placer les détecteurs aux endroits stratégiques.", "Nos solutions sont évolutives et peuvent être connectées à un centre de télésurveillance pour une réponse rapide en cas d'incident."],
  features: ["Détecteurs de mouvement (infrarouge, micro-ondes)", "Détecteurs d'ouverture de portes et fenêtres", "Sirènes intérieures et extérieures", "Alertes SMS et notifications push en temps réel", "Télésurveillance 24h/24 avec intervention rapide", "Claviers de commande avec codes et badges", "Zones multiples avec gestion indépendante", "Intégration aux systèmes de contrôle d'accès"],
};

export default function AlarmeAntiIntrusion() {
  return <ServicePageTemplate {...params} />;
}
