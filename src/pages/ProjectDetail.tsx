import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projectsMeta } from "@/data/projectsData";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const meta = projectsMeta.find((p) => p.slug === slug);

  if (!meta) {
    return <Navigate to="/projets" replace />;
  }

  const title = t(`about.ourWork.projects.${meta.index}.title`);
  const category = t(`about.ourWork.projects.${meta.index}.category`);
  const status = t(`about.ourWork.projects.${meta.index}.status`);
  const desc = t(`about.ourWork.projects.${meta.index}.desc`);

  return (
    <div className="min-h-screen bg-page transition-colors duration-500">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        {/* Hero */}
        <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
          <img
            src={meta.image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 lg:px-8 pb-10">
              <Link
                to="/projets"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {t("projectsPage.backToProjects")}
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-block text-xs font-semibold text-cyan bg-cyan/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  {category}
                </span>
                <span className="inline-block text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  {status}
                </span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl lg:text-5xl font-extrabold text-white"
              >
                {title}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-foreground text-lg leading-relaxed mb-12"
            >
              {desc}
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 border-t border-border">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-cyan hover:bg-cyan/90 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,180,255,0.4)]"
              >
                {t("projectsPage.modal.requestQuote")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projets"
                className="border border-border hover:bg-muted text-foreground px-8 py-3.5 rounded-xl transition-all duration-300"
              >
                {t("projectsPage.backToProjects")}
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;