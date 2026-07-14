import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Video, ShieldCheck, Network, Terminal, BarChart3, Package, ArrowRight,
  ClipboardCheck, Compass, Rocket, Headphones,
} from "lucide-react";
import ServiceModal from "@/components/ServiceModal";
import { getServiceCategory } from "@/data/servicesData";

const methodology = [
  {
    icon: ClipboardCheck,
    title: "1. Audit terrain",
    desc: "Analyse approfondie de votre infrastructure existante et identification des points de vulnérabilité.",
  },
  {
    icon: Compass,
    title: "2. Architecture cible",
    desc: "Conception d'une solution sur mesure alignée avec vos objectifs de croissance et de sécurité.",
  },
  {
    icon: Rocket,
    title: "3. Déploiement",
    desc: "Mise en œuvre maîtrisée par nos experts, garantissant une transition fluide et sans interruption.",
  },
  {
    icon: Headphones,
    title: "4. Support continu",
    desc: "Accompagnement 24/7 et maintenance préventive pour assurer la pérennité de votre outil de travail.",
  },
];

const ServicesPage = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeService = activeId ? getServiceCategory(activeId) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        {/* Hero */}
        <header className="relative pt-20 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-cyan text-sm font-medium mb-6"
            >
              Expertise &amp; Excellence
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl lg:text-6xl font-bold mb-6 tracking-tight text-white"
            >
              Nos <span className="bg-gradient-to-r from-cyan to-cyan-light bg-clip-text text-transparent">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed"
            >
              Des solutions sur mesure pour sécuriser, connecter et propulser votre entreprise vers une infrastructure numérique de classe mondiale.
            </motion.p>
          </div>
        </header>

        {/* Bento Grid des services */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              {/* 1. Sécurité électronique */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-500 flex flex-col md:flex-row"
              >
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80"
                    alt="Sécurité électronique"
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
                  <Video className="w-9 h-9 text-cyan mb-6" />
                  <h3 className="font-display text-2xl font-bold text-white mb-4">Sécurité électronique</h3>
                  <p className="text-white/60 mb-8 leading-relaxed">
                    Protégez vos actifs physiques avec nos solutions de contrôle d'accès intelligent et de vidéosurveillance haute définition pilotée par IA.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveId("securite-electronique")}
                    className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all w-fit"
                  >
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* 2. Cybersécurité */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="lg:col-span-2 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-between group hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-500"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center mb-8 border border-cyan/20">
                    <ShieldCheck className="w-7 h-7 text-cyan" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-4">Cybersécurité</h3>
                  <p className="text-white/60 text-sm mb-6">
                    Pare-feu nouvelle génération, SOC 24/7 et détection d'intrusion pour une résilience totale face aux menaces numériques.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveId("cybersecurite")}
                    className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all"
                  >
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
                  alt="Cybersécurité"
                  className="w-full h-32 object-cover rounded-lg opacity-50 group-hover:opacity-100 transition-opacity mt-6"
                />
              </motion.div>

              {/* 3. Réseaux & Systèmes */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-3 relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 group hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-500"
              >
                <div className="relative z-10">
                  <Network className="w-9 h-9 text-cyan mb-6" />
                  <h3 className="font-display text-2xl font-bold text-white mb-4">Réseaux &amp; Systèmes</h3>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    Architecture réseau haute disponibilité, WiFi haute performance et virtualisation serveur pour une agilité maximale.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveId("infrastructures-reseaux")}
                    className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all"
                  >
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan/5 rounded-full blur-3xl group-hover:bg-cyan/10 transition-all" />
              </motion.div>

              {/* 4. Gestion de parc IT */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="lg:col-span-3 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 group hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-500"
              >
                <Terminal className="w-9 h-9 text-cyan mb-6" />
                <h3 className="font-display text-2xl font-bold text-white mb-4">Gestion de parc IT</h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Maintenance préventive, Helpdesk réactif et inventaire automatisé pour une tranquillité opérationnelle complète.
                </p>
                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 border border-white/10">Audit</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 border border-white/10">Support</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 border border-white/10">Monitoring</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId("gestion-parc")}
                  className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all"
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* 5. ERP, CRM & Logiciels */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 group hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <BarChart3 className="w-9 h-9 text-cyan" />
                  <span className="text-[10px] uppercase tracking-widest text-cyan font-bold bg-cyan/10 px-2 py-1 rounded">
                    Custom Dev
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-4">ERP, CRM &amp; Logiciels</h3>
                <p className="text-white/60 mb-6 text-sm">
                  Développement d'applications web métier et intégration d'ERP sur mesure pour optimiser vos flux de travail.
                </p>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-cyan w-3/4 group-hover:w-full transition-all duration-1000" />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId("developpement")}
                  className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all"
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* 6. Matériel professionnel */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="lg:col-span-3 bg-white/[0.03] backdrop-blur-md border border-white/10 border-l-4 border-l-cyan rounded-2xl p-8 group hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-500"
              >
                <Package className="w-9 h-9 text-cyan mb-6" />
                <h3 className="font-display text-xl font-bold text-white mb-4">Matériel professionnel</h3>
                <p className="text-white/60 mb-6 text-sm">
                  Sourcing et installation de serveurs, stations de travail et périphériques critiques auprès des meilleurs constructeurs mondiaux.
                </p>
                <div className="flex -space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-white">DELL</div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-white">HP</div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-white">CISCO</div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId("distribution")}
                  className="inline-flex items-center gap-2 text-cyan text-sm font-semibold hover:gap-4 transition-all"
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 lg:mb-20"
            >
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6">Notre Méthodologie</h2>
              <div className="w-24 h-1 bg-cyan mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {methodology.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="mb-8 relative">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan group-hover:bg-cyan/10 group-hover:border-cyan/50 transition-all duration-300">
                      <step.icon className="w-7 h-7" />
                    </div>
                    {i < methodology.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent -translate-y-1/2" />
                    )}
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-4">{step.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan/10 rounded-full blur-[80px]" />
              <span className="relative z-10 text-cyan text-sm font-semibold uppercase tracking-[0.2em] mb-8 block">
                Audit &amp; Conseil
              </span>
              <h2 className="relative z-10 font-display text-3xl lg:text-5xl font-bold text-white mb-10 leading-tight">
                Prêt à digitaliser et sécuriser <br className="hidden md:block" /> votre entreprise ?
              </h2>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6">
                <Link
                  to="/contact"
                  className="bg-cyan hover:bg-cyan/90 text-navy-dark font-bold px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,174,239,0.4)]"
                >
                  Demander un devis
                </Link>
                <Link
                  to="/contact"
                  className="border border-white/20 hover:bg-white/5 text-white px-10 py-4 rounded-xl transition-all duration-300"
                >
                  Nous contacter
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />

      <ServiceModal service={activeService ?? null} onClose={() => setActiveId(null)} />
    </div>
  );
};

export default ServicesPage;
