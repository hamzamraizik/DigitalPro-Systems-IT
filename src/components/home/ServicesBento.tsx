import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/home/Container";
import { SectionHeader } from "@/components/home/SectionHeader";
import { SolutionBentoCard } from "@/components/home/SolutionBentoCard";
import { services, solutionsEditorialCard } from "@/data/home";

const orderedServiceTitles = [
  "Sécurité électronique",
  "Réseaux & systèmes",
  "Gestion de parc IT",
  "Cybersécurité",
  "Matériel professionnel",
  "ERP, CRM & logiciels",
];

const placementByTitle: Record<string, string> = {
  "Sécurité électronique": "md:col-span-2 md:row-span-2",
  "Réseaux & systèmes": "md:col-span-1 lg:col-span-2",
  "Gestion de parc IT": "md:col-span-1 lg:col-span-2",
  "Cybersécurité": "md:col-span-2",
  "Matériel professionnel": "md:col-span-1",
  "ERP, CRM & logiciels": "md:col-span-1",
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export const ServicesBento = () => {
  const shouldReduceMotion = useReducedMotion();
  const orderedServices = orderedServiceTitles
    .map((title) => services.find((service) => service.title === title))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <section className="bg-[#111111] py-20 text-white sm:py-24 lg:py-28">
      <Container>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <SectionHeader
            eyebrow="Solutions"
            title="Une couverture IT complète, organisée autour des risques réels."
            description="Un bento de compétences critiques: sécurité physique, cybersécurité, réseaux, support, matériel et logiciels métier."
            inverse
          />
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.14 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {orderedServices.map((service) => (
            <SolutionBentoCard
              key={service.title}
              service={service}
              className={placementByTitle[service.title]}
            />
          ))}

          <motion.article variants={shouldReduceMotion ? undefined : cardVariants} className="md:col-span-3 lg:col-span-4">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 p-7 transition-colors duration-300 hover:border-white/20 md:p-9">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00AEEF]">
                    Architecture intégrée
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                    {solutionsEditorialCard.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-zinc-400">
                    {solutionsEditorialCard.description}
                  </p>
                </div>

                <Link
                  to={solutionsEditorialCard.href}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-white/20 px-5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#00AEEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] sm:w-auto"
                >
                  Explorer l'offre
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </Container>
    </section>
  );
};
