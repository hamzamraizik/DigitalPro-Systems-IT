import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleCheck,
  Layers3,
  LockKeyhole,
  Route,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectProductVisual from "@/components/projects/ProjectProductVisual";
import { getProject, getProjectLocale, projects } from "@/data/projectsData";

const capabilityIcons = [Workflow, Layers3, LockKeyhole, Route];

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const locale = getProjectLocale(i18n.language);
  const prefersReducedMotion = useReducedMotion();
  const project = getProject(slug);

  const labels =
    locale === "fr"
      ? {
          back: "Tous les projets",
          challenge: "Le défi",
          friction: "Ce qui bloquait le quotidien",
          approach: "Notre réponse",
          capabilities: "Ce que nous avons construit",
          capabilitiesTitle: "Une expérience simple, soutenue par des règles solides.",
          journey: "Le parcours",
          journeyTitle: "Du premier geste au résultat final.",
          outcomes: "Ce que le produit change",
          stack: "Socle technique",
          next: "Découvrir aussi",
          cta: "Vous reconnaissez votre propre défi ?",
          ctaBody: "Expliquez-nous votre quotidien. Nous transformerons ses points de friction en un système clair, fiable et fait pour évoluer.",
          ctaButton: "Parler de votre projet",
        }
      : {
          back: "All projects",
          challenge: "The challenge",
          friction: "What was blocking the working day",
          approach: "Our response",
          capabilities: "What we built",
          capabilitiesTitle: "A simple experience, supported by rigorous rules.",
          journey: "The journey",
          journeyTitle: "From the first action to the final result.",
          outcomes: "What the product changes",
          stack: "Technical foundation",
          next: "Explore next",
          cta: "Does this feel like your own challenge?",
          ctaBody: "Tell us how your work really happens. We will turn its friction into a clear, dependable system built to evolve.",
          ctaButton: "Discuss your project",
        };

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-6 text-center dark:bg-[#0a0b10]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#1d1d1f] dark:text-zinc-100">Project not found</h1>
          <Link to="/projets" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <ArrowLeft className="h-4 w-4" /> {labels.back}
          </Link>
        </div>
      </div>
    );
  }

  const story = project.content[locale];
  const related = projects.filter((item) => item.slug !== project.slug);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] dark:bg-[#0a0b10] dark:text-zinc-100">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#07080b] px-4 pb-16 pt-32 text-white sm:px-6 lg:pb-24 lg:pt-40">
          <div
            className="pointer-events-none absolute left-1/2 top-[-12rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[160px]"
            style={{ backgroundColor: project.accentSoft }}
          />
          <div className="relative z-10 mx-auto max-w-7xl">
            <Link
              to="/projets"
              className="mb-14 inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> {labels.back}
            </Link>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="mx-auto max-w-5xl text-center"
            >
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
                <span style={{ color: project.accent }}>{project.name}</span>
                <span className="text-white/25">·</span>
                <span className="text-white/50">{story.category}</span>
              </div>
              <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
                {story.headline}
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-balance text-lg leading-relaxed text-white/60 sm:text-xl">
                {story.summary}
              </p>
              <span
                className="mt-7 inline-flex rounded-full border px-4 py-2 text-xs font-semibold"
                style={{ borderColor: `${project.accent}55`, color: project.accent, backgroundColor: project.accentSoft }}
              >
                {story.status}
              </span>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 48, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.18 }}
              className="mt-14 lg:mt-20"
            >
              <ProjectProductVisual {...project} />
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:py-36 dark:bg-[#111318]">          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <p className="sticky top-28 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: project.accent }}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: project.accentSoft }}>01</span>
                {labels.challenge}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.17em] text-[#86868b] dark:text-zinc-500">{labels.friction}</p>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl dark:text-zinc-100">
                {story.problem.title}
              </h2>
              <p className="mt-7 text-lg leading-[1.8] text-[#6e6e73] dark:text-zinc-400">{story.problem.body}</p>
              <div className="mt-10 space-y-4">
                {story.problem.points.map((point) => (
                  <div key={point} className="flex gap-4 rounded-2xl border border-black/5 bg-[#f5f5f7] p-5 sm:p-6 dark:border-white/10 dark:bg-white/[0.04]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: project.accent }}>
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="leading-relaxed text-[#424245] dark:text-zinc-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
              <p className="flex items-center gap-3 self-start text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: project.accent }}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: project.accentSoft }}>02</span>
                {labels.approach}
              </p>
              <div>
                <h2 className="text-balance font-display text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl dark:text-zinc-100">
                  {story.solution.title}
                </h2>
                <p className="mt-7 text-lg leading-[1.8] text-[#6e6e73] dark:text-zinc-400">{story.solution.body}</p>
              </div>
            </div>

            <div className="mt-20 border-t border-black/10 pt-16 lg:mt-28 lg:pt-24 dark:border-white/10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#86868b] dark:text-zinc-500">{labels.capabilities}</p>
              <h3 className="mt-5 max-w-4xl text-balance font-display text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl lg:text-6xl dark:text-zinc-100">
                {labels.capabilitiesTitle}
              </h3>
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {story.capabilities.map((capability, index) => {
                  const Icon = capabilityIcons[index % capabilityIcons.length];
                  return (
                    <motion.article
                      key={capability.title}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.55, delay: index * 0.07 }}
                      className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_18px_60px_rgba(0,0,0,0.05)] sm:p-9 dark:border-white/10 dark:bg-[#12141a] dark:shadow-none"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: project.accentSoft, color: project.accent }}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <h4 className="mt-8 text-2xl font-semibold tracking-[-0.025em] dark:text-zinc-100">{capability.title}</h4>
                      <p className="mt-4 leading-relaxed text-[#6e6e73] dark:text-zinc-400">{capability.body}</p>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#0b0c10] px-4 py-24 text-white sm:px-6 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: project.accent }}>{labels.journey}</p>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">{labels.journeyTitle}</h2>
            </div>
            <div className="relative mt-16 grid gap-5 md:grid-cols-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-white/10 md:block" />
              {story.journey.map((step, index) => (
                <div key={step.title} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#14161b] font-mono text-sm font-semibold" style={{ color: project.accent }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/52">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:py-36 dark:bg-[#111318]">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: project.accent }}>{labels.outcomes}</p>
                <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl dark:text-zinc-100">{story.closing}</h2>
              </div>
              <div className="space-y-4 lg:pt-10">
                {story.outcomes.map((outcome) => (
                  <div key={outcome} className="flex gap-4 border-b border-black/10 pb-5 dark:border-white/10">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" style={{ color: project.accent }} />
                    <p className="leading-relaxed text-[#424245] dark:text-zinc-300">{outcome}</p>
                  </div>
                ))}
                <div className="pt-5">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#86868b] dark:text-zinc-500">{labels.stack}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full bg-[#f5f5f7] px-4 py-2 text-xs font-semibold text-[#424245] dark:bg-white/10 dark:text-zinc-200">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#86868b] dark:text-zinc-500">{labels.next}</p>
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((item) => {
                const itemStory = item.content[locale];
                return (
                  <Link key={item.slug} to={`/projets/${item.slug}`} className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_18px_60px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1 sm:p-10 dark:bg-[#12141a] dark:shadow-none">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: item.accent }}>{item.name}</span>
                    <h3 className="mt-5 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] dark:text-zinc-100">{itemStory.headline}</h3>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#424245] dark:text-zinc-300">{labels.next}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:pb-36">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0b0c10] px-6 py-20 text-center text-white sm:px-12 lg:rounded-[3rem] lg:py-28">
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-[120px]" style={{ backgroundColor: project.accentSoft }} />
            <Sparkles className="relative z-10 mx-auto h-8 w-8" style={{ color: project.accent }} />
            <h2 className="relative z-10 mx-auto mt-7 max-w-4xl text-balance font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">{labels.cta}</h2>
            <p className="relative z-10 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55">{labels.ctaBody}</p>
            <Link to="/contact" className="relative z-10 mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-[#071019] transition-transform hover:scale-[1.03]" style={{ backgroundColor: project.accent }}>
              {labels.ctaButton}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
