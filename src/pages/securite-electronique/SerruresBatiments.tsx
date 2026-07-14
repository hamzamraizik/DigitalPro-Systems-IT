import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParallaxSection } from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import { KeyRound, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  "Serrures électroniques et magnétiques",
  "Serrures connectées avec contrôle à distance",
  "Cylindres digitaux à code ou carte",
  "Portes blindées et renforcées",
  "Portails et portes automatiques sécurisés",
  "Gestion des clés et habilitations",
  "Historique et audit des ouvertures",
  "Solutions adaptées aux bâtiments multi-locataires",
];

export default function SerruresBatiments() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1504283078522-2cd93bfbe68c?w=1920&q=80"
          overlayClass="bg-navy-dark/80"
          className="py-20 lg:py-32"
          speed={12}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <Link to="/services" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-accent mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Retour aux services
              </Link>
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center mb-6">
                <KeyRound className="w-8 h-8 text-cyan-400" />
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
                Serrures de
                <span className="block text-cyan-400">Bâtiments</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                Des solutions de fermeture intelligentes et sécurisées pour tous types de bâtiments professionnels et résidentiels.
              </p>
            </motion.div>
          </div>
        </ParallaxSection>

        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
          overlayClass="bg-background/90 backdrop-blur-xl"
          className="py-16 lg:py-24"
          speed={6}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Des accès sécurisés et intelligents
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  DPS-IT vous propose des solutions de fermeture connectées, auditables et intégrées à votre système de contrôle d'accès global, pour une gestion fluide et sécurisée.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Que ce soit pour une PME, un immeuble de bureaux ou un site industriel, nous sélectionnons et installons les équipements les mieux adaptés à votre configuration.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
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
                    className="group flex items-start gap-4 bg-card border border-border hover:border-cyan-400/50 rounded-xl px-5 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <Check className="w-4 h-4 text-cyan-500" />
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
