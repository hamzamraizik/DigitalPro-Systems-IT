import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Loader2, Lock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { COMPANY } from "@/constants/company";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconTile } from "@/components/ui/IconTile";

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || COMPANY.email;

/** Suit le thème tant que le toggle du header bascule la classe `dark` sur <html>. */
const useIsDark = () => {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
};

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isDark = useIsDark();
  const mapLang = i18n.language?.toLowerCase().startsWith("en") ? "en" : "fr";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Recréé à chaque rendu pour que les messages suivent la langue active
  const contactSchema = z.object({
    name: z.string().trim().min(1, t("contactPage.form.errors.nameRequired")).max(100),
    email: z.string().trim().email(t("contactPage.form.errors.emailInvalid")).max(255),
    phone: z.string().trim().max(20).optional(),
    subject: z.string().trim().min(1, t("contactPage.form.errors.subjectRequired")).max(200),
    message: z.string().trim().min(1, t("contactPage.form.errors.messageRequired")).max(2000),
  });

  // Les valeurs brutes (adresse, téléphone, email) viennent de footer.* pour éviter la duplication
  const contactInfo = [
    { icon: MapPin, label: t("contactPage.info.labels.address"), value: t("footer.address") },
    { icon: Phone, label: t("contactPage.info.labels.phone"), value: t("footer.phone") },
    { icon: Mail, label: t("contactPage.info.labels.email"), value: t("footer.email") },
    { icon: Clock, label: t("contactPage.info.labels.hours"), value: t("contactPage.info.hoursValue") },
  ];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const result = contactSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _captcha: "false",
          _template: "table",
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone ?? "",
          subject: `[DPS-IT Contact] ${result.data.subject}`,
          message: result.data.message,
        }),
      });

      const json = await response.json();

      if (json.success) {
        toast({
          title: t("contactPage.form.toastSuccessTitle"),
          description: t("contactPage.form.toastSuccessDesc"),
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(json.message ?? "Erreur inconnue");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: t("contactPage.form.toastErrorTitle"),
        description: t("contactPage.form.toastErrorDesc"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page text-foreground transition-colors duration-500">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:pb-24 lg:pt-40">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-[130px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Eyebrow>{t("contactPage.hero.badge")}</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl font-bold tracking-tight text-foreground lg:text-6xl"
            >
              {t("contactPage.hero.titlePrefix")}
              <span className="text-cyan">{t("contactPage.hero.titleHighlight")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              {t("contactPage.hero.subtitle")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-sm text-muted-foreground/80"
            >
              {t("contactPage.hero.responseTime")}
            </motion.p>
          </div>
        </section>

        {/* Details + Form */}
        <section className="px-4 pb-20 sm:px-6 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-14">
              {/* Contact details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="h-fit"
              >
                <h2 className="mb-10 font-display text-2xl font-bold tracking-[-0.02em] text-foreground lg:text-3xl">
                  {t("contactPage.info.title")}
                </h2>
                <ul className="space-y-8">
                  {contactInfo.map((info) => (
                    <li key={info.label} className="flex items-start gap-4">
                      <IconTile size="md" className="h-12 w-12 shrink-0 rounded-2xl">
                        <info.icon className="h-5 w-5" />
                      </IconTile>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{info.label}</div>
                        {info.label === t("contactPage.info.labels.email") ? (
                          <a href={`mailto:${info.value}`} className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-[#0B6C92] dark:hover:text-cyan">
                            {info.value}
                          </a>
                        ) : info.label === t("contactPage.info.labels.phone") ? (
                          <a href={`tel:${COMPANY.phone}`} className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-[#0B6C92] dark:hover:text-cyan">
                            {info.value}
                          </a>
                        ) : (
                          <div className="mt-1 text-sm text-muted-foreground">{info.value}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-black/10 bg-black/[0.02] p-8 shadow-card backdrop-blur-md transition-colors duration-500 sm:p-10 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">{t("contactPage.form.nameLabel")}</label>
                      <Input
                        name="name"
                        placeholder={t("contactPage.form.namePlaceholder")}
                      />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">{t("contactPage.form.emailLabel")}</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder={t("contactPage.form.emailPlaceholder")}
                      />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">{t("contactPage.form.phoneLabel")}</label>
                      <Input
                        name="phone"
                        placeholder={t("contactPage.form.phonePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">{t("contactPage.form.subjectLabel")}</label>
                      <Input
                        name="subject"
                        placeholder={t("contactPage.form.subjectPlaceholder")}
                      />
                      {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("contactPage.form.messageLabel")}</label>
                    <Textarea
                      name="message"
                      placeholder={t("contactPage.form.messagePlaceholder")}
                      rows={5}
                    />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  </div>
                  <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <Button
                      type="submit"
                      size="lg"
                      variant="hero"
                      className="w-full sm:w-auto"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      {loading ? t("contactPage.form.submitting") : t("contactPage.form.submit")}
                    </Button>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Lock className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />
                      {t("contactPage.form.trustNote")}
                    </p>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section className="bg-muted/40 px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl border border-black/10 bg-card p-2.5 shadow-card transition-colors duration-500 dark:border-white/10"
            >
              <div className="overflow-hidden rounded-xl">
                <iframe
                  title={t("contactPage.map.iframeTitle")}
                  src={`https://maps.google.com/maps?q=Rue+Soumaya+Boulevard+Abdelmoumen+Palmier+Casablanca+Maroc&output=embed&z=16&hl=${mapLang}`}
                  className="block h-[420px] w-full"
                  style={{
                    border: 0,
                    filter: isDark ? "invert(0.92) hue-rotate(180deg) contrast(0.92)" : undefined,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {t("contactPage.map.caption")}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;