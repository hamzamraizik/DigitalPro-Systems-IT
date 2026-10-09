import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/home/Container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const FinalCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-page py-20 transition-colors duration-500 sm:py-24 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="group relative overflow-hidden rounded-[2rem] bg-[#0B1020] px-8 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20"
        >
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#00AEEF]/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#0B6C92]/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(0,174,239,0.07) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/60 to-transparent"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full border border-[#00AEEF]/30 bg-[#00AEEF]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00AEEF]"
                aria-hidden="true"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {t("cta.eyebrow")}
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                {t("cta.title")}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400">
                {t("cta.description")}
              </p>

              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Button asChild variant="hero" size="lg" className="rounded-full">
                  <Link to="/contact">
                    {t("cta.btnDetails")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Link
                  to="/services"
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-[#00AEEF]"
                >
                  {t("cta.btnServices")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-md sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00AEEF]">
                {t("cta.pointsLabel")}
              </p>
              <ul className="mt-5 grid gap-4">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#00AEEF]/15 text-[#00AEEF] ring-1 ring-inset ring-[#00AEEF]/30"
                      aria-hidden="true"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="text-[15px] font-medium leading-6 text-white/85">
                      {t(`cta.points.p${n}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/[0.08] pt-7">
            {[1, 2, 3].map((n) => (
              <span key={n} className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00AEEF]" aria-hidden="true" />
                {t(`cta.trust.t${n}`)}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};