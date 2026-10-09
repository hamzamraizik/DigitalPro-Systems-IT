import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { Fingerprint } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1920&q=80",
  icon: Fingerprint,
  category: "Sécurité électronique",
  title: "Contrôle",
  accent: "d'Accès",
  intro: "Maîtrisez et sécurisez les accès à vos locaux grâce à des solutions biométriques et électroniques de dernière génération.",
  sectionTitle: "Contrôlez qui entre et sort de vos espaces",
  paragraphs: ["Nos solutions de contrôle d'accès vous permettent de définir précisément qui peut accéder à quelles zones, à quels moments. Du badge RFID aux systèmes biométriques les plus avancés, nous déployons des architectures adaptées à vos besoins.", "Chaque installation est accompagnée d'une formation de vos équipes et d'un support technique réactif pour garantir une exploitation optimale."],
  features: ["Lecteurs biométriques (empreinte, iris, reconnaissance faciale)", "Badges & cartes RFID/NFC", "Contrôle multi-zones et multi-niveaux d'habilitation", "Gestion des plages horaires d'accès", "Historique et journalisation des entrées/sorties", "Intégration avec les systèmes de vidéosurveillance", "Contrôle à distance via application mobile", "Gestion centralisée de plusieurs sites"],
};

export default function ControleAcces() {
  return <ServicePageTemplate {...params} />;
}
