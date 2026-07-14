import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParallaxSection } from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Cpu, Globe } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", desc: "Nous visons l'excellence dans chaque projet, avec des standards de qualité élevés." },
  { icon: Users, title: "Proximité", desc: "Un accompagnement personnalisé et une écoute attentive de vos besoins." },
  { icon: Cpu, title: "Innovation", desc: "Nous intégrons les dernières technologies pour des solutions performantes." },
  { icon: Globe, title: "Engagement", desc: "Un engagement fort envers la satisfaction client et le respect des délais." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <section className="bg-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">À propos</h1>
              <p className="text-primary-foreground/70 text-lg">Découvrez DigitalPro Systems IT, notre vision et notre engagement envers l'excellence technologique à Casablanca.</p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80"
          overlayClass="bg-background/95"
          className="py-16 lg:py-24"
          speed={8}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-8 shadow-card">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Notre Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Devenir le partenaire technologique de référence au Maroc, en offrant des solutions innovantes
                  et sécurisées qui permettent aux PME, grandes entreprises et administrations publiques de prospérer
                  dans l'ère digitale. Nous croyons en un avenir où chaque organisation marocaine peut bénéficier
                  d'infrastructures IT de classe mondiale, sécurisées et performantes.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-8 shadow-card">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Notre Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Accompagner les entreprises et administrations marocaines dans leur transformation digitale en leur fournissant
                  des solutions technologiques intégrées : sécurité électronique, cybersécurité, réseaux, développement logiciel
                  et ERP/CRM. Basée à Casablanca, l'équipe de DigitalPro Systems IT s'engage à garantir la sécurité,
                  la performance et la pérennité de vos systèmes d'information.
                </p>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        {/* Values */}
        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80"
          overlayClass="bg-navy-dark/88"
          className="py-16 lg:py-24"
          speed={10}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Nos Valeurs</h2>
              <p className="text-primary-foreground/70 max-w-xl mx-auto">Les principes qui guident chacune de nos actions.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-card text-center hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-primary-foreground mb-2">{v.title}</h3>
                  <p className="text-primary-foreground/60 text-sm">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxSection>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
