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
const PROJECT_COUNT = 3;
const AUTO_ADVANCE_DELAY = 6000;

type CarouselPosition = -1 | 0 | 1;

const getCarouselPosition = (
  projectIndex: number,
  activeIndex: number,
): CarouselPosition => {
  if (projectIndex === activeIndex) return 0;
  if (projectIndex === (activeIndex - 1 + PROJECT_COUNT) % PROJECT_COUNT) {
    return -1;
  }
  return 1;
};

const carouselMotion = {
  "-1": {
    x: "-102%",
    y: "-50%",
    scale: 0.78,
    opacity: 0.5,
    filter: "blur(5px)",
    zIndex: 10,
  },
  "0": {
    x: "-50%",
    y: "-50%",
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 30,
  },
  "1": {
    x: "2%",
    y: "-50%",
    scale: 0.78,
    opacity: 0.5,
    filter: "blur(5px)",
    zIndex: 10,
  },
} as const;

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const locale = getProjectLocale(i18n.language);
  const prefersReducedMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const stats = [
    {
      icon: Users,
      value: t("about.partner.stats.0.value"),
      label: t("about.partner.stats.0.label"),
    },
    {
      icon: Briefcase,
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

  return (
    <div className="min-h-screen bg-background">

      <main className="pb-16 pt-24 lg:pt-32">
        <section className="container mx-auto mb-24 px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 font-semibold uppercase tracking-wider text-accent">
                {t("about.hero.badge")}
              </p>
              <h1
                className="mb-6 font-display text-4xl font-bold leading-tight text-foreground lg:text-5xl xl:text-6xl"
                dangerouslySetInnerHTML={{ __html: t("about.hero.title") }}
              />
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {t("about.hero.desc1")}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("about.hero.desc2")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="overflow-hidden rounded-2xl shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80"
                alt="DigitalPro Systems IT"
                className="h-[400px] w-full object-cover lg:h-[500px]"
              />
            </motion.div>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="mb-4 font-semibold uppercase tracking-wider text-accent">
                  {t("about.partner.badge")}
                </p>
                <h2 className="mb-6 font-display text-3xl font-bold text-foreground lg:text-4xl">
                  {t("about.partner.title")}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t("about.partner.desc")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                      <stat.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="mb-2 font-display text-4xl font-bold text-foreground">
                      {stat.value}
                    </h3>
                    <p className="font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <p className="mb-4 font-semibold uppercase tracking-wider text-accent">
                {t("about.whatWeDo.badge")}
              </p>
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground lg:text-4xl">
                {t("about.whatWeDo.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("about.whatWeDo.desc")}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <service.icon
                      className="h-8 w-8 text-accent"
                      strokeWidth={1.5}
                    />
                  </div>
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
        </section>

        <section
          id="projects"
          className="scroll-mt-28 overflow-hidden bg-navy-dark py-24 text-white"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-10 text-center lg:mb-14">
              <p className="mb-4 font-semibold uppercase tracking-wider text-accent">
                {t("about.ourWork.badge")}
              </p>
              <h2 className="mb-6 font-display text-3xl font-bold lg:text-5xl">
                {t("about.ourWork.title")}
              </h2>
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
                {`${activeProject + 1} / ${PROJECT_COUNT}: ${projects[activeProject].title}`}
              </p>

              <div className="relative h-[500px] sm:h-[540px] lg:h-[610px]">
                {projects.map((project, index) => {
                  const position = getCarouselPosition(index, activeProject);
                  const isActive = position === 0;
                  const maskImage =
                    position === -1
                      ? "linear-gradient(to right, transparent 0%, rgba(0,0,0,.8) 45%, black 100%)"
                      : position === 1
                        ? "linear-gradient(to left, transparent 0%, rgba(0,0,0,.8) 45%, black 100%)"
                        : "none";

                  return (
                    <motion.article
                      key={project.title}
                      initial={false}
                      animate={carouselMotion[String(position) as "-1" | "0" | "1"]}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 125,
                              damping: 22,
                              mass: 0.85,
                            }
                      }
                      className="absolute left-1/2 top-1/2 h-[430px] w-[82vw] max-w-[780px] overflow-hidden rounded-[2rem] border border-white/15 bg-navy shadow-[0_32px_90px_rgba(0,0,0,.45)] sm:h-[470px] lg:h-[540px]"
                      style={{
                        WebkitMaskImage: maskImage,
                        maskImage,
                      }}
                    >
                      <img
                        src={project.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06172f] via-[#06172f]/55 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-cyan/10" />

                      <motion.div
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                        aria-hidden={!isActive}
                        className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-9 lg:p-12"
                      >
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                            {project.category}
                          </span>
                          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/75 backdrop-blur-md">
                            {project.status}
                          </span>
                        </div>
                        <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-white/45">
                          {String(index + 1).padStart(2, "0")} / 0{PROJECT_COUNT}
                        </p>
                        <h3 className="mb-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
                          {project.title}
                        </h3>
                        <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg">
                          {project.desc}
                        </p>
                        {isActive && (
                          <Link
                            to={`/projets/${projectsMeta[index].slug}`}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                          >
                            {t("projectsPage.viewProject")}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </motion.div>

                      {!isActive && (
                        <button
                          type="button"
                          onClick={() => setActiveProject(index)}
                          aria-label={t("about.ourWork.selectProject", {
                            project: project.title,
                          })}
                          className="absolute inset-0 z-20 cursor-pointer"
                        />
                      )}
                    </motion.article>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={showPreviousProject}
                aria-label={t("about.ourWork.previousProject")}
                className="absolute left-1 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy/80 text-white shadow-xl backdrop-blur-xl transition hover:border-accent/60 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-5 lg:left-8 lg:h-14 lg:w-14"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={showNextProject}
                aria-label={t("about.ourWork.nextProject")}
                className="absolute right-1 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy/80 text-white shadow-xl backdrop-blur-xl transition hover:border-accent/60 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-5 lg:right-8 lg:h-14 lg:w-14"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div
                className="mt-2 flex justify-center gap-2"
                aria-label={t("about.ourWork.carouselLabel")}
              >
                {projects.map((project, index) => (
                  <button
                    key={project.title}
                    type="button"
                    aria-current={activeProject === index ? "true" : undefined}
                    aria-label={t("about.ourWork.selectProject", {
                      project: project.title,
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
            </div>
          </div>
        </section>

        <section className="py-24">
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
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-accent/90"
                >
                  {t("about.cta.button")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="team"
          className="scroll-mt-28 bg-muted/30 py-20"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <p className="mb-4 font-semibold uppercase tracking-wider text-accent">
                {t("about.team.badge")}
              </p>
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground lg:text-4xl">
                {t("about.team.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("about.team.desc")}
              </p>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-5 py-2.5 text-sm font-semibold text-foreground">
                <Users className="h-4 w-4 text-accent" />
                {t("about.team.extendedTeam")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className="group flex min-h-[460px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="relative h-80 overflow-hidden bg-navy-dark">
                    <img
                      src={member.image}
                      alt={
                        locale === "fr"
                          ? `Portrait de ${member.name}`
                          : `Portrait of ${member.name}`
                      }
                      loading="lazy"
                      width={900}
                      height={1100}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ objectPosition: "center" }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-5 font-display text-2xl font-bold text-foreground">
                      {member.name}
                    </h3>
                    <div className="mt-auto rounded-xl border border-accent/15 bg-accent/5 px-4 py-3">
                      <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                        {t("about.team.specialityLabel")}
                      </span>
                      <p className="text-sm font-semibold leading-snug text-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
