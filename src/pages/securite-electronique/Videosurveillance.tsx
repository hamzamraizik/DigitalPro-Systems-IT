import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { Camera } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80",
  icon: Camera,
  category: "Sécurité électronique",
  title: "Vidéo",
  accent: "surveillance",
  intro: "Surveillez et protégez vos locaux 24h/24 grâce à des systèmes de vidéosurveillance IP haute définition.",
  sectionTitle: "Une surveillance intelligente et fiable",
  paragraphs: ["Nous concevons et déployons des systèmes de vidéosurveillance adaptés à chaque configuration de site : bureaux, entrepôts, commerces, sites industriels ou résidences.", "Nos solutions s'appuient sur des équipements certifiés des meilleures marques du marché, avec garantie de service et support technique réactif."],
  features: ["Caméras IP haute définition (HD, Full HD, 4K)", "Vision nocturne & infrarouge", "Analyse vidéo intelligente (détection de mouvement, reconnaissance de plaques)", "Enregistrement continu ou sur événement (NVR/DVR)", "Accès à distance sécurisé via smartphone ou PC", "Caméras dôme, bullet, PTZ selon les zones", "Stockage local et/ou cloud", "Intégration aux systèmes de contrôle d'accès et d'alarmes"],
};

export default function Videosurveillance() {
  return <ServicePageTemplate {...params} />;
}
