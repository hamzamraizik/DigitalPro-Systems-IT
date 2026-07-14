import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParallaxSection } from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import { BellRing, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  "Détecteurs de mouvement (infrarouge, micro-ondes)",
  "Détecteurs d'ouverture de portes et fenêtres",
  "Sirènes intérieures et extérieures",
  "Alertes SMS et notifications push en temps réel",
  "Télésurveillance 24h/24 avec intervention rapide",
  "Claviers de commande avec codes et badges",
  "Zones multiples avec gestion indépendante",
  "Intégration aux systèmes de contrôle d'accès",
];

export default function AlarmeAntiIntrusion() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          overlayClass="bg-navy-dark/80"
          className="py-20 lg:py-32"
          speed={12}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <Link to="/services" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-accent mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Retour aux services
              </Link>
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 flex items-center justify-center mb-6">
                <BellRing className="w-8 h-8 text-amber-400" />
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
                Alarme
                <span className="block text-amber-400">Anti-Intrusion</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                Sécurisez vos locaux contre toute tentative d'intrusion grâce à des systèmes d'alarme connectés et fiables.
              </p>
            </motion.div>
          </div>
        </ParallaxSection>

        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1573164713347-df926dd8e6a0?w=1920&q=80"
          overlayClass="bg-background/90 backdrop-blur-xl"
          className="py-16 lg:py-24"
          speed={6}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Soyez alerté dès la moindre intrusion
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Nos systèmes d'alarme anti-intrusion détectent toute présence non autorisée et déclenchent une alerte immédiate. Nous réalisons une étude préalable de vos locaux pour placer les détecteurs aux endroits stratégiques.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Nos solutions sont évolutives et peuvent être connectées à un centre de télésurveillance pour une réponse rapide en cas d'incident.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
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
                    className="group flex items-start gap-4 bg-card border border-border hover:border-amber-400/50 rounded-xl px-5 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <Check className="w-4 h-4 text-amber-500" />
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
