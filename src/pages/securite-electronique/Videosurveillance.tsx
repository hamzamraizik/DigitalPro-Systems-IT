import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParallaxSection } from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import { Camera, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  "Caméras IP haute définition (HD, Full HD, 4K)",
  "Vision nocturne & infrarouge",
  "Analyse vidéo intelligente (détection de mouvement, reconnaissance de plaques)",
  "Enregistrement continu ou sur événement (NVR/DVR)",
  "Accès à distance sécurisé via smartphone ou PC",
  "Caméras dôme, bullet, PTZ selon les zones",
  "Stockage local et/ou cloud",
  "Intégration aux systèmes de contrôle d'accès et d'alarmes",
];

export default function Videosurveillance() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
          overlayClass="bg-navy-dark/80"
          className="py-20 lg:py-32"
          speed={12}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <Link to="/services" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-accent mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Retour aux services
              </Link>
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
                Vidéo
                <span className="block text-purple-400">surveillance</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">
                Surveillez et protégez vos locaux 24h/24 grâce à des systèmes de vidéosurveillance IP haute définition.
              </p>
            </motion.div>
          </div>
        </ParallaxSection>

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
                  Une surveillance intelligente et fiable
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Nous concevons et déployons des systèmes de vidéosurveillance adaptés à chaque configuration de site : bureaux, entrepôts, commerces, sites industriels ou résidences.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Nos solutions s'appuient sur des équipements certifiés des meilleures marques du marché, avec garantie de service et support technique réactif.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
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
                    className="group flex items-start gap-4 bg-card border border-border hover:border-purple-400/50 rounded-xl px-5 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <Check className="w-4 h-4 text-purple-500" />
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
