import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { Flame } from "lucide-react";

const params = {
  imageUrl: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?w=1920&q=80",
  icon: Flame,
  category: "Sécurité électronique",
  title: "Protection",
  accent: "Incendie",
  intro: "Protégez vos collaborateurs et vos biens avec des systèmes de détection et de lutte contre l'incendie conformes aux normes en vigueur.",
  sectionTitle: "Sécurité incendie aux normes pour vos locaux",
  paragraphs: ["DPS-IT conçoit et installe des systèmes de détection précoce et d'extinction qui vous permettent de réagir rapidement et de minimiser les dommages en cas de sinistre.", "Chaque installation est réalisée par des techniciens certifiés et fait l'objet d'un rapport de conformité. Nous assurons également la maintenance annuelle obligatoire."],
  features: ["Détecteurs de fumée optiques et ioniques", "Détecteurs de chaleur et de gaz", "Centrales d'alarme incendie certifiées", "Sirènes et flashs d'évacuation", "Sprinklers et systèmes d'extinction automatique", "Plans d'évacuation et signalétique de sécurité", "Maintenance réglementaire et contrôles périodiques", "Formation du personnel aux procédures d'urgence"],
};

export default function ProtectionIncendie() {
  return <ServicePageTemplate {...params} />;
}
