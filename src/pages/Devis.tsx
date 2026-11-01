import Footer from "@/components/Footer";
import { NetworkBackground } from "@/components/NetworkBackground";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { COMPANY } from "@/constants/company";

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || COMPANY.email;

const DevisPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [clientType, setClientType] = useState("company");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

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
          services: selectedServices.join(", "),
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
        setSelectedServices([]);
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
    <div className="min-h-screen">
      <div className="pt-24 lg:pt-28">
        <section className="bg-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {t("devisPage.hero.title")}
              </h1>
              <p className="text-primary-foreground/70 text-lg">{t("devisPage.hero.subtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-background py-16 lg:py-24">
          <NetworkBackground />
          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <form
                onSubmit={handleSubmit}
                className="rounded-xl p-8 space-y-5 shadow-card"
                style={{ background: "var(--gradient-hero)" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-primary-foreground mb-1.5 block">{t("devisPage.form.nameLabel")}</label>
                    <Input
                      name="name"
                      placeholder={t("devisPage.form.namePlaceholder")}
                      className="bg-navy-dark/40 border-cyan/30 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-cyan"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary-foreground mb-1.5 block">{t("devisPage.form.companyLabel")}</label>
                    <Input
                      name="company"
                      placeholder={t("devisPage.form.companyPlaceholder")}
                      className="bg-navy-dark/40 border-cyan/30 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-cyan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-primary-foreground mb-1.5 block">{t("devisPage.form.emailLabel")}</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder={t("devisPage.form.emailPlaceholder")}
                      className="bg-navy-dark/40 border-cyan/30 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-cyan"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary-foreground mb-1.5 block">{t("devisPage.form.phoneLabel")}</label>
                    <Input
                      name="phone"
                      placeholder={t("devisPage.form.phonePlaceholder")}
                      className="bg-navy-dark/40 border-cyan/30 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-cyan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-primary-foreground mb-1.5 block">{t("devisPage.form.cityLabel")}</label>
                    <Input
                      name="city"
                      placeholder={t("devisPage.form.cityPlaceholder")}
                      className="bg-navy-dark/40 border-cyan/30 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-cyan"
                    />
                    {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary-foreground mb-1.5 block">{t("devisPage.form.clientTypeLabel")}</label>
                    <input type="hidden" name="clientType" value={clientType} />
                    <Select value={clientType} onValueChange={setClientType}>
                      <SelectTrigger className="bg-navy-dark/40 border-cyan/30 text-primary-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">{t("devisPage.form.clientTypeCompany")}</SelectItem>
                        <SelectItem value="individual">{t("devisPage.form.clientTypeIndividual")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-foreground mb-1.5 block">{t("devisPage.form.servicesLabel")}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl border border-cyan/20 bg-navy-dark/20 p-4">
                    {(t("devisPage.form.services", { returnObjects: true }) as string[]).map((service) => (
                      <label key={service} className="flex items-center gap-2 text-sm text-primary-foreground cursor-pointer">
                        <Checkbox
                          checked={selectedServices.includes(service)}
                          onCheckedChange={() => toggleService(service)}
                          className="border-cyan/40 data-[state=checked]:bg-cyan data-[state=checked]:text-primary-foreground"
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary-foreground mb-1.5 block">{t("devisPage.form.messageLabel")}</label>
                  <Textarea
                    name="message"
                    placeholder={t("devisPage.form.messagePlaceholder")}
                    rows={5}
                    className="bg-navy-dark/40 border-cyan/30 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-cyan"
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto bg-cyan hover:bg-cyan-light text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {loading ? t("devisPage.form.submitting") : t("devisPage.form.submit")}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DevisPage;