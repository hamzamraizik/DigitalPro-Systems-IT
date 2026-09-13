import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Code,
  Headphones,
  Puzzle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Footer from "@/components/Footer";
import { getProjectLocale, projectsMeta } from "@/data/projectsData";
import { teamMembers } from "@/data/teamData";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconTile } from "@/components/ui/IconTile";
import { CTAButton } from "@/components/home/CTAButton";
import { Button } from "@/components/ui/button";

const PROJECT_COUNT = 3;
const AUTO_ADVANCE_DELAY = 6000;

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const locale = getProjectLocale(i18n.language);
  const prefersReducedMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const stats = [
    {
      icon: Briefcase,
      value: t("about.partner.stats.0.value"),
      label: t("about.partner.stats.0.label"),
    },
    {
      icon: Users,
      value: t("about.partner.stats.1.value"),
      label: t("about.partner.stats.1.label"),
    },
    {
      icon: Award,
      value: t("about.partner.stats.2.value"),
      label: t("about.partner.stats.2.label"),
    },
  ];

  const services = [
    {
      icon: ShieldCheck,
      title: t("about.whatWeDo.services.0.title"),
      desc: t("about.whatWeDo.services.0.desc"),
    },
    {
      icon: Code,
      title: t("about.whatWeDo.services.1.title"),
      desc: t("about.whatWeDo.services.1.desc"),
    },
    {
      icon: Puzzle,
      title: t("about.whatWeDo.services.2.title"),
      desc: t("about.whatWeDo.services.2.desc"),
    },
    {
      icon: Headphones,
      title: t("about.whatWeDo.services.3.title"),
      desc: t("about.whatWeDo.services.3.desc"),
    },
  ];

  const projects = projectsMeta.map((project) => {
    const story = project.content[locale];
    return {
      title: project.name,
      category: story.category,
      status: story.status,
      desc: story.summary,
      image: project.image,
      slug: project.slug,
    };
  });

  const team = teamMembers.map((member) => ({
    ...member,
    role: t(`about.team.members.${member.roleKey}.role`),
  }));

  const showNextProject = useCallback(() => {
    setActiveProject((current) => (current + 1) % PROJECT_COUNT);
  }, []);

  const showPreviousProject = useCallback(() => {
    setActiveProject(
      (current) => (current - 1 + PROJECT_COUNT) % PROJECT_COUNT,
    );
  }, []);

  useEffect(() => {
    if (isCarouselPaused || prefersReducedMotion) return undefined;

    const interval = window.setInterval(showNextProject, AUTO_ADVANCE_DELAY);
    return () => window.clearInterval(interval);
  }, [isCarouselPaused, prefersReducedMotion, showNextProject]);

  const [featuredService, ...moreServices] = services;
  const project = projects[activeProject];
  const flip = activeProject % 2 === 1;

  return (
    <div className="min-h-screen bg-page transition-colors duration-500">

      <main className="pb-24 pt-24 lg:pb-28 lg:pt-36">
        {/* Hero + stats sidebar */}
        <section className="container mx-auto px-4 lg:px-8">
          <div className="relative">
            <div
              className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-cyan/10 blur-[120px]"
              aria-hidden="true"
            />
            <div className="relative grid gap-12 lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,4fr)] lg:items-center lg:gap-14">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Eyebrow className="mb-5">
                  {t("about.hero.badge")}
                </Eyebrow>
                <h1
                  className="mb-6 max-w-xl font-display text-4xl font-bold leading-tight text-foreground lg:text-5xl xl:text-6xl"
                  dangerouslySetInnerHTML={{ __html: t("about.hero.title") }}
                />
                <div className="max-w-xl">
                  <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                    {t("about.hero.desc1")}
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {t("about.hero.desc2")}
                  </p>
                </div>
              </motion.div>

              <div
                className="hidden w-px self-stretch border-l-2 border-dashed border-border/60 lg:block"
                aria-hidden="true"
              />

              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {t("about.partner.statsLabel")}
                </p>
                <div className="flex flex-col gap-10">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <IconTile className="h-12 w-12">
                        <stat.icon className="h-5 w-5" />
                      </IconTile>
                      <div>
                        <p className="font-display text-3xl font-bold text-foreground lg:text-4xl">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* Our story */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Eyebrow className="mb-4">
                  {t("about.story.eyebrow")}
                </Eyebrow>
                <h2 className="mb-6 font-display text-3xl font-bold text-foreground lg:text-4xl">
                  {t("about.story.title")}
                </h2>
                <div
                  className="h-[3px] w-16 rounded-full bg-cyan"
                  aria-hidden="true"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground"
              >
                <p>{t("about.story.text1")}</p>
                <p>{t("about.story.text2")}</p>
                <p className="mb-0 text-foreground">{t("about.story.text3")}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What we do — V-shape */}
        <section className="bg-muted/30 py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 flex justify-center">
                <Eyebrow>
                  {t("about.whatWeDo.badge")}
                </Eyebrow>
              </div>
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground lg:text-4xl">
                {t("about.whatWeDo.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("about.whatWeDo.desc")}
              </p>
            </div>

            <div className="flex flex-col items-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-md"
              >
                <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated lg:p-10">
                  <IconTile size="lg" className="mb-6">
                    <featuredService.icon className="h-8 w-8" strokeWidth={1.5} />
                  </IconTile>
                  <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
                    {featuredService.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {featuredService.desc}
                  </p>
                </div>
              </motion.div>

              <div className="grid w-full gap-8 md:grid-cols-3">
                {moreServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index + 1) * 0.08 }}
                    className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
                  >
                    <IconTile className="mb-6 h-14 w-14">
                      <service.icon className="h-7 w-7" strokeWidth={1.5} />
                    </IconTile>
                    <h3 className="mb-4 font-display text-xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {service.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products — alternating showcase */}
        <section
          id="projects"
          className="scroll-mt-28 overflow-hidden bg-navy-dark py-24 text-white lg:py-32"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-14 text-center lg:mb-16">
              <div className="mb-4 flex justify-center">
                <Eyebrow>
                  {t("about.ourWork.badge")}
                </Eyebrow>
              </div>
              <h2 className="mb-6 font-display text-3xl font-bold lg:text-5xl">
                {t("about.ourWork.title")}
              </h2>
              <div className="mx-auto mb-6 h-[3px] w-16 rounded-full bg-cyan" aria-hidden="true" />
              <p className="mx-auto max-w-2xl text-base text-white/65 lg:text-lg">
                {t("about.ourWork.desc")}
              </p>
            </div>

            <div
              role="region"
              aria-roledescription="carousel"
              aria-label={t("about.ourWork.carouselLabel")}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") showPreviousProject();
                if (event.key === "ArrowRight") showNextProject();
              }}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onFocusCapture={() => setIsCarouselPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsCarouselPaused(false);
                }
              }}
              className="relative mx-auto max-w-7xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-navy-dark"
            >
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {`${activeProject + 1} / ${PROJECT_COUNT}: ${project.title}`}
              </p>

              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <motion.div
                  key={`img-${project.title}`}
                  initial={{ opacity: 0, x: flip ? -24 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                  className={flip ? "lg:order-2" : ""}
                >
                  <div className="group relative">
                    <div
                      className="pointer-events-none absolute -left-10 -top-10 h-60 w-60 rounded-full bg-[#00AEEF]/20 blur-3xl"
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute -right-6 -bottom-6 hidden h-full w-full rounded-3xl border border-[#0B6C92]/10 bg-[#00AEEF]/10 lg:block"
                      aria-hidden="true"
                    />
                    <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_32px_64px_-32px_rgba(11,108,146,0.3)] transition-all duration-500 group-hover:border-[#00AEEF]/50 dark:border-white/[0.08]">
                      <img
                        src={project.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-[280px] w-full object-cover brightness-[0.92] contrast-[1.08] saturate-[1.1] transition-transform duration-1000 ease-out group-hover:scale-105 sm:h-[360px] lg:h-[440px]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/75 via-[#0B1020]/10 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#07111F]/85 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan shadow-lg ring-1 ring-inset ring-white/15 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D]" aria-hidden="true" />
                        {project.status}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  key={`txt-${project.title}`}
                  initial={{ opacity: 0, x: flip ? 24 : -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
                  className={flip ? "lg:order-1" : ""}
                >
                  <p className="mb-3 font-mono text-sm tracking-[0.25em] text-cyan">
                    {String(activeProject + 1).padStart(2, "0")} / 0{PROJECT_COUNT}
                  </p>
                  <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#00AEEF]">
                    {project.category}
                  </span>
                  <h3 className="mb-5 mt-5 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                  <p className="mb-8 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg">
                    {project.desc}
                  </p>
                  <Button
                    asChild
                    variant="heroOutline"
                    size="lg"
                    className="rounded-full px-7"
                  >
                    <Link to={`/projets/${project.slug}`}>
                      {t("projectsPage.viewProject")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <div className="mt-12 flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={showPreviousProject}
                  aria-label={t("about.ourWork.previousProject")}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-navy/80 text-white shadow-xl backdrop-blur-xl transition hover:border-accent/60 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div
                  className="flex items-center gap-2"
                  aria-label={t("about.ourWork.carouselLabel")}
                >
                  {projects.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      aria-current={activeProject === index ? "true" : undefined}
                      aria-label={t("about.ourWork.selectProject", {
                        project: item.title,
                      })}
                      onClick={() => setActiveProject(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeProject === index
                          ? "w-10 bg-accent"
                          : "w-2 bg-white/25 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={showNextProject}
                  aria-label={t("about.ourWork.nextProject")}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-navy/80 text-white shadow-xl backdrop-blur-xl transition hover:border-accent/60 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          id="team"
          className="scroll-mt-28 py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 flex justify-center">
                <Eyebrow>
                  {t("about.team.badge")}
                </Eyebrow>
              </div>
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground lg:text-4xl">
                {t("about.team.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("about.team.desc")}
              </p>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-5 py-2.5 text-sm font-semibold text-foreground">
                <Users className="h-4 w-4 text-cyan" />
                {t("about.team.extendedTeam")}
              </p>
            </div>

            <div className="grid gap-12 sm:grid-cols-3">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-cyan/30 bg-navy-dark shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                      <img
                        src={member.image}
                        alt={
                          locale === "fr"
                            ? `Portrait de ${member.name}`
                            : `Portrait of ${member.name}`
                        }
                        loading="lazy"
                        width={288}
                        height={288}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: member.imagePosition }}
                      />
                    </div>
                    <span
                      className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#FF8A3D] ring-4 ring-[#0B1020] dark:ring-[#0B1020]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-1 font-display text-xl font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-dark to-navy p-10 text-center sm:p-12 lg:p-20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-navy-dark/10 to-navy-dark/80" />
              <div className="relative z-10">
                <h2 className="mb-6 font-display text-3xl font-bold text-white lg:text-5xl">
                  {t("about.cta.title")}
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70 lg:text-xl">
                  {t("about.cta.desc")}
                </p>
                <CTAButton to="/contact">{t("about.cta.button")}</CTAButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;