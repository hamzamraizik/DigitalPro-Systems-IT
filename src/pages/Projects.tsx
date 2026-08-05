import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectProductVisual from "@/components/projects/ProjectProductVisual";
import { getProjectLocale, projects } from "@/data/projectsData";

const Projects = () => {
  const { i18n } = useTranslation();
  const locale = getProjectLocale(i18n.language);
  const prefersReducedMotion = useReducedMotion();
  const copy =
    locale === "fr"
      ? {
          eyebrow: "Études de cas DPS-IT",
          title: "Des produits pensés pour le travail réel.",
          intro:
            "Trois défis métier, trois systèmes conçus pour supprimer la friction et rendre chaque opération plus claire, plus rapide et plus fiable.",
          discover: "Découvrir l'étude de cas",
          principle: "Notre principe",
          principleTitle: "La simplicité visible. La rigueur à l'intérieur.",
          principleBody:
            "Nous commençons par comprendre les décisions, les exceptions et les risques du métier. Ensuite seulement, nous dessinons l'interface qui les rend évidents.",
        }
      : {
          eyebrow: "DPS-IT case studies",
          title: "Products designed for real work.",
          intro:
            "Three business challenges, three systems built to remove friction and make every operation clearer, faster and more dependable.",
          discover: "Explore the case study",
          principle: "Our principle",
          principleTitle: "Visible simplicity. Rigour underneath.",
          principleBody:
            "We begin by understanding business decisions, exceptions and risks. Only then do we design the interface that makes them feel obvious.",
        };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar />
      <main>
        <section className="px-4 pb-20 pt-36 sm:px-6 lg:pb-28 lg:pt-44">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {copy.eyebrow}
            </p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
              {copy.title}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-balance text-lg leading-relaxed text-[#6e6e73] sm:text-xl lg:text-2xl">
              {copy.intro}
            </p>
          </motion.div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:pb-36">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:gap-12">
            {projects.map((project, index) => {
              const story = project.content[locale];
              const dark = index !== 1;
              return (
                <motion.article
                  key={project.slug}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.75 }}
                  className={`relative overflow-hidden rounded-[2.25rem] px-5 pb-0 pt-12 sm:px-10 sm:pt-16 lg:rounded-[3rem] lg:px-16 lg:pt-20 ${
                    dark ? "bg-[#0b0c10] text-white" : "border border-black/5 bg-white text-[#1d1d1f]"
                  }`}
                >
                  <div
                    className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full blur-[120px]"
                    style={{ backgroundColor: project.accentSoft }}
                  />
                  <div className="relative z-10 mx-auto mb-10 max-w-4xl text-center lg:mb-14">
                    <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
                      <span style={{ color: project.accent }}>{project.name}</span>
                      <span className={dark ? "text-white/35" : "text-black/30"}>·</span>
                      <span className={dark ? "text-white/55" : "text-black/45"}>{story.category}</span>
                    </div>
                    <h2 className="text-balance font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                      {story.headline}
                    </h2>
                    <p className={`mx-auto mt-6 max-w-3xl text-balance text-base leading-relaxed sm:text-lg ${dark ? "text-white/62" : "text-[#6e6e73]"}`}>
                      {story.summary}
                    </p>
                    <Link
                      to={`/projets/${project.slug}`}
                      className="group mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
                      style={{ backgroundColor: project.accent, color: "#071019" }}
                    >
                      {copy.discover}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  <div className="relative z-10 translate-y-5 lg:translate-y-8">
                    <ProjectProductVisual {...project} compact />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:py-36">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              <Sparkles className="h-5 w-5" />
              {copy.principle}
            </div>
            <div>
              <h2 className="text-balance font-display text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                {copy.principleTitle}
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#6e6e73] lg:text-xl">
                {copy.principleBody}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
