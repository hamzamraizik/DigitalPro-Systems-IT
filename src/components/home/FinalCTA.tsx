import { Container } from "@/components/home/Container";
import { CTAButton } from "@/components/home/CTAButton";
import { useTranslation } from "react-i18next";

export const FinalCTA = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-zinc-50 dark:bg-[#111111] py-20 lg:py-24 transition-colors duration-500">
      <Container>
      <div className="grid gap-8 rounded-[8px] border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-[#0A0A0A] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10 transition-colors duration-500">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#00AEEF]">
            {t("cta.eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-[#111111] dark:text-white sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mt-4 text-base leading-8 text-[#555555] dark:text-zinc-400">
            {t("cta.description")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <CTAButton to="/contact" className="w-full sm:w-auto">
            {t("cta.btnDetails")}
          </CTAButton>
          <CTAButton
            to="/services"
            variant="secondary"
            className="w-full border-[#111111]/20 dark:border-white/20 text-[#111111] dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] sm:w-auto"
          >
            {t("cta.btnServices")}
          </CTAButton>
        </div>
      </div>
    </Container>
  </section>
  );
};
