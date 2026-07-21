import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParallaxSection } from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;
const ContactPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
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
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          to: "contact@dps-it.ma",
          subject: `[DPS-IT Contact] ${result.data.subject}`,
          from_name: result.data.name,
          email: result.data.email,
          phone: result.data.phone ?? "",
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
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <section className="bg-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
<h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {t("contactPage.hero.title")}
              </h1>
              <p className="text-primary-foreground/70 text-lg">{t("contactPage.hero.subtitle")}</p>            </motion.div>
          </div>
        </section>

        <ParallaxSection
          imageUrl="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80"
          overlayClass="bg-background/96"
          className="py-16 lg:py-24"
          speed={8}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Info */}
<motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-8 shadow-card h-fit" >               
<h2 className="font-display text-2xl font-bold text-foreground mb-6">{t("contactPage.info.title")}</h2>                <div className="space-y-5">
                {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <info.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{info.label}</div>
                       {info.label === t("contactPage.info.labels.email") ? (
                          <a href={`mailto:${info.value}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">{info.value}</a>
                        ) : info.label === t("contactPage.info.labels.phone") ? (
                          <a href={`tel:+212663463189`} className="text-sm text-muted-foreground hover:text-accent transition-colors">{info.value}</a>
                        ) : (
                          <div className="text-sm text-muted-foreground">{info.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Form */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-8 shadow-card space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
<label className="text-sm font-medium text-foreground mb-1.5 block">{t("contactPage.form.nameLabel")}</label>
                      <Input name="name" placeholder={t("contactPage.form.namePlaceholder")} />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contactPage.form.emailLabel")}</label>
                      <Input name="email" type="email" placeholder={t("contactPage.form.emailPlaceholder")} />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contactPage.form.phoneLabel")}</label>
                      <Input name="phone" placeholder={t("contactPage.form.phonePlaceholder")} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contactPage.form.subjectLabel")}</label>
                      <Input name="subject" placeholder={t("contactPage.form.subjectPlaceholder")} />
                      {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contactPage.form.messageLabel")}</label>
                    <Textarea name="message" placeholder={t("contactPage.form.messagePlaceholder")} rows={5} />                    {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                    {loading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
{loading ? t("contactPage.form.submitting") : t("contactPage.form.submit")}                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        {/* Google Maps */}
        <section className="bg-muted">
          <div className="container mx-auto px-4 lg:px-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-border shadow-card"
            >
              <iframe
title={t("contactPage.map.iframeTitle")}                src="https://maps.google.com/maps?q=Rue+Soumaya+Boulevard+Abdelmoumen+Palmier+Casablanca+Maroc&output=embed&z=16"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
            <p className="text-xs text-muted-foreground text-center mt-3">
{t("contactPage.map.caption")}            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
