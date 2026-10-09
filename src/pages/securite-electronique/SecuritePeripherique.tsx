import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { ShieldAlert } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1920&q=80",
  icon: ShieldAlert,
  category: "Sécurité électronique",
  title: "Sécurité",
  accent: "Périphérique",
  intro: "Sécurisez le périmètre extérieur de vos sites avec des solutions de détection et de dissuasion en première ligne.",
  sectionTitle: "La première ligne de défense de vos locaux",
  paragraphs: ["La sécurité périphérique constitue la première barrière de protection avant même que toute intrusion ne soit tentée. DPS-IT analyse votre site pour mettre en place des solutions dissuasives.", "Nos solutions couvrent les zones extérieures (parkings, périmètres, clôtures) et les points d'entrée, intégrées à vos autres systèmes de sécurité."],
  features: ["Clôtures et barrières électrifiées", "Barrières infrarouge périmètriques", "Détecteurs de vibration et de choc", "Éclairage de sécurité automatique", "Bornes anti-bélier et bollards", "Gardes et rondes de sécurité connectés", "Surveillance des zones extérieures et parkings", "Intégration avec les systèmes de vidéosurveillance"],
};

export default function SecuritePeripherique() {
  return <ServicePageTemplate {...params} />;
}
