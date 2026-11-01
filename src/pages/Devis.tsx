import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Lock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { COMPANY } from "@/constants/company";
import { Eyebrow } from "@/components/ui/Eyebrow";

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || COMPANY.email;

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

const DevisPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const isDark = useIsDark();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [clientType, setClientType] = useState("company");

  const schema = z.object({
    name: z.string().trim().min(1, t("devisPage.form.errors.nameRequired")).max(100),
    company: z.string().trim().max(120).optional(),
    email: z.string().trim().email(t("devisPage.form.errors.emailInvalid")).max(255),
    phone: z.string().trim().max(20).optional(),
    city: z.string().trim().min(1, t("devisPage.form.errors.cityRequired")).max(80),
    clientType: z.string().trim().min(1),
    message: z.string().trim().min(1, t("devisPage.form.errors.messageRequired")).max(2000),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const result = schema.safeParse({ ...data, clientType });

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
          company: result.data.company ?? "",
          email: result.data.email,
          phone: result.data.phone ?? "",
          city: result.data.city,
          clientType: result.data.clientType === "company" ? t("devisPage.form.clientTypeCompany") : t("devisPage.form.clientTypeIndividual"),
          subject: `[DPS-IT Devis] ${result.data.name} - ${result.data.city}`,
          message: result.data.message,
        }),
      });

      const json = await response.json();

      if (json.success) {
        toast({
          title: t("devisPage.form.toastSuccessTitle"),
          description: t("devisPage.form.toastSuccessDesc"),
        });
        (e.target as HTMLFormElement).reset();
        setClientType("company");
      } else {
        throw new Error(json.message ?? "Erreur inconnue");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: t("devisPage.form.toastErrorTitle"),
        description: t("devisPage.form.toastErrorDesc"),
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
              <Eyebrow>{t("devisPage.hero.badge")}</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl font-bold tracking-tight text-foreground lg:text-6xl"
            >
              {t("devisPage.hero.titlePrefix")}
              <span className="text-cyan">{t("devisPage.hero.titleHighlight")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              {t("devisPage.hero.subtitle")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-sm text-muted-foreground/80"
            >
              {t("devisPage.hero.responseTime")}
            </motion.p>
          </div>
        </section>

        {/* Form */}
        <section className="px-4 pb-20 sm:px-6 lg:pb-28">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-black/10 bg-black/[0.02] p-8 shadow-card backdrop-blur-md transition-colors duration-500 sm:p-10 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("devisPage.form.nameLabel")}</label>
                    <Input name="name" placeholder={t("devisPage.form.namePlaceholder")} />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("devisPage.form.companyLabel")}</label>
                    <Input name="company" placeholder={t("devisPage.form.companyPlaceholder")} />
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("devisPage.form.emailLabel")}</label>
                    <Input name="email" type="email" placeholder={t("devisPage.form.emailPlaceholder")} />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("devisPage.form.phoneLabel")}</label>
                    <Input name="phone" placeholder={t("devisPage.form.phonePlaceholder")} />
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("devisPage.form.cityLabel")}</label>
                    <Input name="city" placeholder={t("devisPage.form.cityPlaceholder")} />
                    {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("devisPage.form.clientTypeLabel")}</label>
                    <input type="hidden" name="clientType" value={clientType} />
                    <Select value={clientType} onValueChange={setClientType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">{t("devisPage.form.clientTypeCompany")}</SelectItem>
                        <SelectItem value="individual">{t("devisPage.form.clientTypeIndividual")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">{t("devisPage.form.messageLabel")}</label>
                  <Textarea name="message" placeholder={t("devisPage.form.messagePlaceholder")} rows={5} />
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
                    {loading ? t("devisPage.form.submitting") : t("devisPage.form.submit")}
                  </Button>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />
                    {t("devisPage.form.trustNote")}
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DevisPage;