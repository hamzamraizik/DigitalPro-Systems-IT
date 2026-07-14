import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Shield, Globe, Monitor, Code, Server 
} from "lucide-react";
import { ParallaxSection } from "@/components/ParallaxSection";
import ServiceModal from "@/components/ServiceModal";
import { getServiceCategory } from "@/data/servicesData";

const mainCategories = [
  {
    id: "securite-electronique",
    title: "Sécurité Électronique",
    desc: "Contrôle d'accès, vidéosurveillance, alarmes et protection incendie.",
    bg: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
    icon: ShieldCheck,
  },
  {
    id: "cybersecurite",
    title: "Cybersécurité",
    desc: "Firewalls, audit, détection d'intrusion et plan de reprise d'activité.",
    bg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    icon: Shield,
  },
  {
    id: "infrastructures-reseaux",
    title: "Infrastructures Réseaux & Systèmes",
    desc: "Réseaux LAN/WAN, WiFi d'entreprise, virtualisation et cloud hybride.",
    bg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    icon: Globe,
  },
  {
    id: "gestion-parc",
    title: "Gestion de Parc Informatique",
    desc: "Maintenance préventive, helpdesk n1/n2/n3, supervision proactive et inventaire.",
    bg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    icon: Monitor,
  },
  {
    id: "developpement",
    title: "Développement Logiciel & ERP/CRM",
    desc: "Applications web et mobiles, API, implémentation ERP et Business Intelligence.",
    bg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    icon: Code,
  },
  {
    id: "distribution",
    title: "Vente & Distribution de Matériel",
    desc: "Serveurs de stockage, postes de travail, équipements réseau et licences logicielles.",
    bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    icon: Server,
  },
];

const ServicesSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeService = activeId ? getServiceCategory(activeId) : null;

  return (
    <ParallaxSection
      imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
      overlayClass="bg-navy-dark/90"
      className="py-20 lg:py-28"
      speed={8}
    >
      <div className="absolute inset-0 bg-white/[0.02]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">
              Nos Domaines d'Expertise
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-white uppercase tracking-wide">
              Solutions Technologiques à 360°
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mainCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <button
                type="button"
                onClick={() => setActiveId(cat.id)}
                className="group relative block w-full text-left h-80 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,180,255,0.25)] bg-navy-dark/60 backdrop-blur-sm border border-white/10 hover:border-accent/50"
              >
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0 z-0">
                  <img src={cat.bg} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/60 to-[#0a1628]/20" />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 mix-blend-overlay" />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center mb-5 border border-white/10 group-hover:scale-110 group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(0,180,255,0.3)] transition-all duration-500">
                    <cat.icon className="w-7 h-7 text-white/90 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent group-hover:drop-shadow-[0_0_8px_rgba(0,180,255,0.5)] transition-all duration-300">{cat.title}</h3>
                  <p className="text-white/70 text-sm mb-5 line-clamp-2 h-10 transition-opacity duration-300">
                    {cat.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all duration-300">
                    Découvrir les services <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <ServiceModal service={activeService ?? null} onClose={() => setActiveId(null)} />
    </ParallaxSection>
  );
};

export default ServicesSection;
