import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
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
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Footer from "@/components/Footer";
import { getProjectLocale, projectsMeta } from "@/data/projectsData";
import { teamMembers } from "@/data/teamData";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconTile } from "@/components/ui/IconTile";
import { CTAButton } from "@/components/home/CTAButton";

const heroValueIcons = [Target, ShieldCheck, Users, TrendingUp];

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const locale = getProjectLocale(i18n.language);
  const prefersReducedMotion = useReducedMotion();

  const emblaOptions = useMemo(
    () => ({
      loop: true,
      align: "start" as const,
      skipSnaps: false,
      duration: prefersReducedMotion ? 0 : 25,
    }),
    [prefersReducedMotion],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapList, setSnapList] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapList(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

  return (
    <div className="min-h-screen bg-page transition-colors duration-500">

      <main className="pb-16 pt-20 lg:pb-24 lg:pt-28">
        {/* Hero — asymmetric statement + visual */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32 lg:grid-cols-12 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 lg:col-start-1 lg:row-start-1"
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur dark:border-white/10 dark:bg-white/5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
                {t("about.hero.badge")}
              </span>
              <h1
                className="mb-6 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground lg:text-5xl"
                dangerouslySetInnerHTML={{ __html: t("about.hero.title") }}
              />
              <p className="mb-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("about.hero.desc1")}
              </p>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("about.hero.desc2")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 lg:self-center"
            >
              <div className="rounded-3xl border border-slate-900/10 bg-white p-10 shadow-xl shadow-black/5 md:p-12 dark:border-white/10 dark:bg-slate-900/50">
                <div className="space-y-8">
                  {heroValueIcons.map((ValueIcon, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      className={
                        i > 0
                          ? "flex items-start gap-4 border-t border-slate-900/5 pt-8 dark:border-white/5"
                          : "flex items-start gap-4"
                      }
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-900/5 text-cyan dark:bg-white/5">
                        <ValueIcon className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-base font-semibold text-foreground">
                          {t(`about.hero.values.${i}.title`)}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-gray-400">
                          {t(`about.hero.values.${i}.desc`)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-6 lg:col-start-1 lg:row-start-2"
            >
              <div className="mt-2 flex divide-x divide-slate-900/10 border-t border-slate-900/10 pb-4 pt-8 lg:mt-4 dark:divide-white/10 dark:border-white/10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex flex-1 flex-col gap-2 pl-5 pr-4 first:pl-0 sm:pl-7"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900/5 text-cyan dark:bg-white/5">
                      <stat.icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <p className="font-display text-2xl font-semibold tabular-nums text-foreground lg:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our story — sticky editorial */}
        <section className="relative overflow-hidden pb-16 pt-20 md:pt-28 lg:pb-24">
          <div
            className="pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full bg-cyan/[0.05] blur-[110px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-28 lg:self-start"
              >
                <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan">
                  <span className="font-display text-sm font-bold tabular-nums">01</span>
                  <span className="h-px w-8 bg-cyan/50" aria-hidden="true" />
                  {t("about.story.eyebrow")}
                </p>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance lg:text-4xl">
                  {t("about.story.title")}
                </h2>
                <div
                  className="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan to-transparent"
                  aria-hidden="true"
                />
              </motion.div>
            </div>
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="max-w-2xl"
              >
                <p className="text-lg leading-[1.85] text-muted-foreground">
                  {t("about.story.text1")}
                </p>
                <p className="mt-6 text-lg leading-[1.85] text-muted-foreground">
                  {t("about.story.text2")}
                </p>
                <blockquote className="mt-8 border-l-2 border-cyan pl-6 sm:pl-8">
                  <p className="font-display text-xl font-semibold leading-snug tracking-tight text-foreground text-balance sm:text-2xl">
                    {t("about.story.text3")}
                  </p>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What we do — V-shape */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-4 flex justify-center">
                <Eyebrow>
                  {t("about.whatWeDo.badge")}
                </Eyebrow>
              </div>
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground lg:text-4xl">
                {t("about.whatWeDo.title")}
              </h2>
              <div className="mx-auto mb-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-cyan to-transparent" aria-hidden="true" />
              <p className="text-lg text-muted-foreground">
                {t("about.whatWeDo.desc")}
              </p>
            </div>

            <div className="mx-auto grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 4) * 0.08 }}
                  className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/30"
                >
                  <IconTile size="lg" className="mb-4 transition-all duration-300 group-hover:border-cyan/50 group-hover:shadow-[0_0_14px_rgba(0,174,239,0.28)]">
                    <service.icon className="h-7 w-7" strokeWidth={1.5} />
                  </IconTile>
                  <h3 className="mb-2 font-display text-xl font-bold text-foreground">
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

        {/* Products — alternating showcase */}
        <section
          id="projects"
          className="scroll-mt-28 overflow-hidden border-y border-black/5 bg-page py-16 lg:py-24 dark:border-white/5 dark:bg-white/[0.02]"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-14 text-center lg:mb-16">
              <div className="mb-4 flex justify-center">
                <Eyebrow>
                  {t("about.ourWork.badge")}
                </Eyebrow>
              </div>
              <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
                {t("about.ourWork.title")}
              </h2>
              <div className="mx-auto mb-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-cyan to-transparent" aria-hidden="true" />
              <p className="mx-auto max-w-2xl text-base text-muted-foreground lg:text-lg">
                {t("about.ourWork.desc")}
              </p>
            </div>

            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <div className="w-full overflow-hidden" ref={emblaRef}>
              <div className="flex w-full">
                {projects.map((slide) => (
                  <div key={slide.title} className="min-w-0 flex-[0_0_100%]">
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                      <div className="group relative">
                        <div
                          className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 rounded-3xl border border-[#0B6C92]/10 bg-[#00AEEF]/10 blur-[6px]"
                          aria-hidden="true"
                        />
                        <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] shadow-none transition-colors duration-500 group-hover:border-[#00AEEF]/50 dark:border-white/[0.08]">
                          <img
                            src={slide.image}
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
                          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#07111F]/85 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan ring-1 ring-inset ring-white/15 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D]" aria-hidden="true" />
                            {slide.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full border border-cyan/30 bg-cyan/[0.08] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                          {slide.category}
                        </span>
                        <h3 className="mb-5 mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                          {slide.title}
                        </h3>
                        <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                          {slide.desc}
                        </p>
                        <Link
                          to={`/projets/${slide.slug}`}
                          className="group/link inline-flex items-center gap-2 rounded-full text-base font-semibold text-cyan transition-colors hover:text-[#0B9BCE] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                        >
                          {t("projectsPage.viewProject")}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-5">
              <span className="font-mono text-sm tabular-nums tracking-[0.25em] text-cyan">
                {String(selectedSnap + 1).padStart(2, "0")} /{" "}
                {String(snapList.length || projects.length).padStart(2, "0")}
              </span>
              <span className="h-4 w-px bg-black/15 dark:bg-white/15" aria-hidden="true" />
              <button
                type="button"
                onClick={scrollPrev}
                aria-label={t("about.ourWork.previousProject")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white/70 text-foreground shadow-none backdrop-blur-xl transition hover:border-cyan/50 hover:bg-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan dark:border-white/20 dark:bg-navy/80 dark:text-white dark:hover:border-accent/60 dark:hover:bg-accent/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div
                className="flex items-center gap-2"
                aria-label={t("about.ourWork.carouselLabel")}
              >
                {snapList.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-current={selectedSnap === index ? "true" : undefined}
                    aria-label={t("about.ourWork.selectProject", {
                      project: projects[index]?.title ?? "",
                    })}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      selectedSnap === index
                        ? "w-10 bg-cyan"
                        : "w-2 bg-black/20 hover:bg-black/40 dark:bg-white/25 dark:hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={scrollNext}
                aria-label={t("about.ourWork.nextProject")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white/70 text-foreground shadow-none backdrop-blur-xl transition hover:border-cyan/50 hover:bg-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan dark:border-white/20 dark:bg-navy/80 dark:text-white dark:hover:border-accent/60 dark:hover:bg-accent/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          id="team"
          className="scroll-mt-28 py-16 lg:py-24"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
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
                    <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-cyan/30 bg-navy-dark shadow-[0_0_18px_rgba(34,211,238,0.14)]">
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
                      className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#FF8A3D] ring-4 ring-white dark:ring-[#0B1020]"
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
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/[0.7] p-10 text-center shadow-none backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-12 lg:p-20">
              <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" aria-hidden="true" />
              <div className="relative z-10">
                <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground text-balance lg:text-5xl">
                  {t("about.cta.title")}
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground lg:text-xl">
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
