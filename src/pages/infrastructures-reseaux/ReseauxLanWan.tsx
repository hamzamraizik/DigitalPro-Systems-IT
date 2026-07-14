import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParallaxSection } from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import { Globe, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  "Expertise technique approfondie et certifiée",
  "Accompagnement personnalisé et sur-mesure",
  "Support réactif et disponibilité de nos équipes",
  "Solutions technologiques de dernière génération",
  "Respect rigoureux des délais et des engagements",
  "Transfert de compétences et formation continue",
];

export default function ReseauxLanWan() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        {/* Hero */}
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
          overlayClass="bg-navy-dark/80"
          className="py-20 lg:py-32"
          speed={12}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <Link to="/services" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-accent mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Retour aux services
              </Link>
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
                Réseaux LAN/WAN
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                Réseaux performants. Découvrez comment DigitalPro Systems IT peut accompagner votre entreprise vers le succès.
              </p>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* Content */}
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80"
          overlayClass="bg-background/90 backdrop-blur-xl"
          className="py-16 lg:py-24"
          speed={6}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Des solutions taillées pour vos besoins
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Nous mettons à votre disposition notre savoir-faire en matière de réseaux lan/wan pour optimiser vos processus, sécuriser vos données et accroître votre performance globale. 
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Chaque projet est mené avec rigueur et méthode, en étroite collaboration avec vos équipes techniques et fonctionnelles.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
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
                    className="group flex items-start gap-4 bg-card border border-border hover:border-blue-400/50 rounded-xl px-5 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <Check className="w-4 h-4 text-blue-500" />
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
