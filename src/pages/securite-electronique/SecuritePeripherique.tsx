import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParallaxSection } from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import { ShieldAlert, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  "Clôtures et barrières électrifiées",
  "Barrières infrarouge périmètriques",
  "Détecteurs de vibration et de choc",
  "Éclairage de sécurité automatique",
  "Bornes anti-bélier et bollards",
  "Gardes et rondes de sécurité connectés",
  "Surveillance des zones extérieures et parkings",
  "Intégration avec les systèmes de vidéosurveillance",
];

export default function SecuritePeripherique() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1920&q=80"
          overlayClass="bg-navy-dark/80"
          className="py-20 lg:py-32"
          speed={12}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <Link to="/services" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-accent mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Retour aux services
              </Link>
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 backdrop-blur-sm border border-green-400/30 flex items-center justify-center mb-6">
                <ShieldAlert className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
                Sécurité
                <span className="block text-green-400">Périphérique</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                Sécurisez le périmètre extérieur de vos sites avec des solutions de détection et de dissuasion en première ligne.
              </p>
            </motion.div>
          </div>
        </ParallaxSection>

        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          overlayClass="bg-background/90 backdrop-blur-xl"
          className="py-16 lg:py-24"
          speed={6}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  La première ligne de défense de vos locaux
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  La sécurité périphérique constitue la première barrière de protection avant même que toute intrusion ne soit tentée. DPS-IT analyse votre site pour mettre en place des solutions dissuasives.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Nos solutions couvrent les zones extérieures (parkings, périmètres, clôtures) et les points d'entrée, intégrées à vos autres systèmes de sécurité.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                    Demander un devis gratuit <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
              <div className="grid grid-cols-1 gap-3">
                {features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="group flex items-start gap-4 bg-card border border-border hover:border-green-400/50 rounded-xl px-5 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-sm text-foreground font-medium leading-relaxed">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ParallaxSection>
      </div>
      <Footer />
    </div>
  );
}
