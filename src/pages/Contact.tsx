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
import { z } from "zod";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().min(1, "Le sujet est requis").max(200),
  message: z.string().trim().min(1, "Le message est requis").max(2000),
});

const contactInfo = [
  { icon: MapPin, label: "Adresse", value: "82, Angle Rue Soumaya et BD Abdelmoumen, Résidence Shéhérazade 1, 3ème étage N°13, Palmier, Casablanca" },
  { icon: Phone, label: "Téléphone", value: "06 63 46 31 89" },
  { icon: Mail, label: "Email", value: "contact@dps-it.ma" },
  { icon: Clock, label: "Horaires", value: "Lun-Ven : 8h30 - 17h30" },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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
          title: "Message envoyé !",
          description: "Nous vous répondrons dans les plus brefs délais.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(json.message ?? "Erreur inconnue");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer ou nous contacter par téléphone.",
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
              <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">Contactez-nous</h1>
              <p className="text-primary-foreground/70 text-lg">Discutons de votre projet. Notre équipe est à votre écoute.</p>
            </motion.div>
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
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Nos coordonnées</h2>
                <div className="space-y-5">
                {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <info.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{info.label}</div>
                        {info.label === "Email" ? (
                          <a href={`mailto:${info.value}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">{info.value}</a>
                        ) : info.label === "Téléphone" ? (
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
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Nom complet *</label>
                      <Input name="name" placeholder="Votre nom" />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                      <Input name="email" type="email" placeholder="votre@email.com" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Téléphone</label>
                      <Input name="phone" placeholder="+212 6 00 00 00 00" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Sujet *</label>
                      <Input name="subject" placeholder="Objet de votre message" />
                      {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                    <Textarea name="message" placeholder="Décrivez votre besoin..." rows={5} />
                    {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                    {loading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
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
                title="DigitalPro Systems IT - Localisation Casablanca"
                src="https://maps.google.com/maps?q=Rue+Soumaya+Boulevard+Abdelmoumen+Palmier+Casablanca+Maroc&output=embed&z=16"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              82, Angle Rue Soumaya et BD Abdelmoumen, Résidence Shéhérazade 1, 3ème étage N°13, Palmier, Casablanca
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
