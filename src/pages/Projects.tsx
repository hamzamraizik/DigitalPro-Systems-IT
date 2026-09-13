import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "@/components/Footer";
import ProjectProductVisual from "@/components/projects/ProjectProductVisual";
import { getProjectLocale, projects } from "@/data/projectsData";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconTile } from "@/components/ui/IconTile";
import { cn } from "@/lib/utils";

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
          viewProduct: "Voir le produit",
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
          viewProduct: "View product",
          principle: "Our principle",
          principleTitle: "Visible simplicity. Rigour underneath.",
          principleBody:
            "We begin by understanding business decisions, exceptions and risks. Only then do we design the interface that makes them feel obvious.",
        };

  const [activeId, setActiveId] = useState<string>(projects[0].slug);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId((entry.target as HTMLElement).dataset.slug ?? projects[0].slug);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const project of projects) {
      const el = sectionRefs.current[project.slug];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollToProduct = (slug: string) => {
    setActiveId(slug);
    sectionRefs.current[slug]?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-page text-foreground transition-colors duration-500">
      <main>
        <section className="px-4 pb-16 pt-36 sm:px-6 sm:pb-20 lg:pt-44">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-5xl text-center"
          >
            <Eyebrow className="mb-6">
              {copy.eyebrow}
            </Eyebrow>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
              {copy.title}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
              {copy.intro}
            </p>
          </motion.div>
        </section>

        <div className="sticky top-0 z-40 border-b border-black/5 bg-page/95 backdrop-blur-xl transition-colors duration-500 dark:border-white/[0.08]">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
            <nav
              aria-label="Choisir un produit"
              className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/80 p-1 shadow-sm dark:border-white/15 dark:bg-white/[0.06]"
            >
              {projects.map((project) => (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => scrollToProduct(project.slug)}
                  aria-current={activeId === project.slug ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-5",
                    activeId === project.slug
                      ? "bg-[#1A1A1A] text-white shadow-sm dark:bg-white dark:text-[#1A1A1A]"
                      : "text-[#6e6e73] hover:text-[#1A1A1A] dark:text-white/60 dark:hover:text-white",
                  )}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-opacity duration-300"
                    style={{ backgroundColor: project.accent }}
                    aria-hidden="true"
                  />
                  {project.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <section className="px-4 pb-24 sm:px-6 lg:pb-36">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:gap-12">
            {projects.map((project, index) => {
              const story = project.content[locale];
              const dark = index !== 1;
              const flip = index === 1;
              return (
                <motion.article
                  key={project.slug}
                  id={`product-${project.slug}`}
                  ref={(el) => {
                    sectionRefs.current[project.slug] = el;
                  }}
                  data-slug={project.slug}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.75 }}
                  className={`relative scroll-mt-28 overflow-hidden rounded-[2.25rem] px-5 py-14 sm:px-10 sm:py-16 lg:rounded-[3rem] lg:px-14 lg:py-20 ${
                    dark ? "bg-[#0b0c10] text-white" : "border border-black/5 bg-white text-[#1d1d1f]"
                  }`}
                >
                  <div
                    className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full blur-[120px]"
                    style={{ backgroundColor: project.accentSoft }}
                  />
                  <div
                    className={cn(
                      "relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16",
                    )}
                  >
                    <div className={cn(flip && "lg:order-2 lg:pl-16")}>
                      <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
                        <span style={{ color: project.accent }}>{project.name}</span>
                        <span className={dark ? "text-white/35" : "text-black/30"}>·</span>
                        <span className={dark ? "text-white/55" : "text-black/45"}>{story.category}</span>
                      </div>
                      <h2 className="max-w-xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
                        {story.headline}
                      </h2>
                      <p className={`mt-6 max-w-xl text-balance text-base leading-relaxed sm:text-lg ${dark ? "text-white/62" : "text-[#6e6e73] dark:text-zinc-400"}`}>
                        {story.summary}
                      </p>
                      <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                        {story.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-sm font-medium">
                            <span
                              className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
                              style={{ backgroundColor: project.accentSoft }}
                              aria-hidden="true"
                            >
                              <Check className="h-3 w-3" style={{ color: project.accent }} />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/projets/${project.slug}`}
                        className="group mt-9 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
                        style={{ backgroundColor: project.accent, color: "#071019" }}
                      >
                        {copy.discover}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                    <motion.div
                      className={cn(flip && "lg:order-1 lg:pr-16")}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                    >
                      <ProjectProductVisual {...project} compact />
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="bg-page px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => {
                const story = project.content[locale];
                return (
                  <motion.div
                    key={project.slug}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white p-8 transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.03] sm:p-9"
                  >
                    <div
                      className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full blur-3xl"
                      style={{ backgroundColor: project.accentSoft }}
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: project.accent }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
                        {project.name}
                      </p>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {story.tagline}
                      </p>
                      <Link
                        to={`/projets/${project.slug}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
                        style={{ color: project.accent }}
                      >
                        {copy.viewProduct}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-4 py-24 sm:px-6 lg:py-36">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0B6C92] dark:text-cyan">
              <IconTile size="sm">
                <Sparkles className="h-4 w-4" />
              </IconTile>
              {copy.principle}
            </div>
            <div>
              <h2 className="text-balance font-display text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                {copy.principleTitle}
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
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