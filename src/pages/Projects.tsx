import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projectsMeta } from "@/data/projectsData";

const ProjectsPage = () => {
  const { t } = useTranslation();

  const projects = projectsMeta.map((meta) => ({
    slug: meta.slug,
    image: meta.image,
    title: t(`about.ourWork.projects.${meta.index}.title`),
    category: t(`about.ourWork.projects.${meta.index}.category`),
    status: t(`about.ourWork.projects.${meta.index}.status`),
    desc: t(`about.ourWork.projects.${meta.index}.desc`),
  }));

  return (
    <div className="min-h-screen bg-page transition-colors duration-500">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <section className="bg-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <span className="text-cyan-light font-semibold text-sm uppercase tracking-[0.15em] mb-4 block">
                {t("projectsPage.badge")}
              </span>
              <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {t("projectsPage.hero.title")}
              </h1>
              <p className="text-primary-foreground/70 text-lg">{t("projectsPage.hero.subtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-xl border border-border shadow-card overflow-hidden group hover:shadow-elevated transition-all duration-300 flex flex-col"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-block text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="inline-block text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {project.status}
                      </span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
                      {project.desc}
                    </p>
                    <Link
                      to={`/projets/${project.slug}`}
                      className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:gap-4 transition-all w-fit mt-auto"
                    >
                      {t("projectsPage.viewProject")} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;