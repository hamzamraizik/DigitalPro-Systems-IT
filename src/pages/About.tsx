import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParallaxSection } from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Cpu, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
const valueKeys = [
  { key: "excellence", icon: Award },
  { key: "proximite", icon: Users },
  { key: "innovation", icon: Cpu },
  { key: "engagement", icon: Globe },
];

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <section className="bg-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
<h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {t("aboutPage.hero.title")}
              </h1>
              <p className="text-primary-foreground/70 text-lg">{t("aboutPage.hero.subtitle")}</p>            </motion.div>
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
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t("aboutPage.vision.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.vision.text")}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-8 shadow-card">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-accent" />
                </div>
               <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t("aboutPage.mission.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.mission.text")}
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
<h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">{t("aboutPage.values.title")}</h2>
              <p className="text-primary-foreground/70 max-w-xl mx-auto">{t("aboutPage.values.subtitle")}</p>            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{valueKeys.map((v, i) => (
                <motion.div key={v.key}                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-card text-center hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-6 h-6 text-accent" />
                  </div>
<h3 className="font-display font-semibold text-primary-foreground mb-2">
                    {t(`aboutPage.values.items.${v.key}.title`)}
                  </h3>
                  <p className="text-primary-foreground/60 text-sm">
                    {t(`aboutPage.values.items.${v.key}.desc`)}
                  </p>                </motion.div>
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
