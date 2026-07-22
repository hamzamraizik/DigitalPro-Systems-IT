import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  Code, 
  Puzzle, 
  Headphones, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Linkedin 
} from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Users, value: t('about.partner.stats.0.value'), label: t('about.partner.stats.0.label') },
    { icon: Briefcase, value: t('about.partner.stats.1.value'), label: t('about.partner.stats.1.label') },
    { icon: Award, value: t('about.partner.stats.2.value'), label: t('about.partner.stats.2.label') },
  ];

  const services = [
    { icon: ShieldCheck, title: t('about.whatWeDo.services.0.title'), desc: t('about.whatWeDo.services.0.desc') },
    { icon: Code, title: t('about.whatWeDo.services.1.title'), desc: t('about.whatWeDo.services.1.desc') },
    { icon: Puzzle, title: t('about.whatWeDo.services.2.title'), desc: t('about.whatWeDo.services.2.desc') },
    { icon: Headphones, title: t('about.whatWeDo.services.3.title'), desc: t('about.whatWeDo.services.3.desc') },
  ];

  const projects = [
    { 
      title: t('about.ourWork.projects.0.title'), 
      desc: t('about.ourWork.projects.0.desc'),
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
    },
    { 
      title: t('about.ourWork.projects.1.title'), 
      desc: t('about.ourWork.projects.1.desc'),
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
    },
    { 
      title: t('about.ourWork.projects.2.title'), 
      desc: t('about.ourWork.projects.2.desc'),
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
    }
  ];

  const team = [
    { name: t('about.team.members.0.name'), role: t('about.team.members.0.role'), image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
    { name: t('about.team.members.1.name'), role: t('about.team.members.1.role'), image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
    { name: t('about.team.members.2.name'), role: t('about.team.members.2.role'), image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
    { name: t('about.team.members.3.name'), role: t('about.team.members.3.role'), image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
    { name: t('about.team.members.4.name'), role: t('about.team.members.4.role'), image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 lg:pt-32 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-accent font-semibold mb-4 tracking-wider uppercase">{t('about.hero.badge')}</p>
              <h1 
                className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight"
                dangerouslySetInnerHTML={{ __html: t('about.hero.title') }}
              />
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {t('about.hero.desc1')}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('about.hero.desc2')}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80" 
                alt="DigitalPro Systems IT Team" 
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-accent font-semibold mb-4 tracking-wider uppercase">{t('about.partner.badge')}</p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  {t('about.partner.title')}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t('about.partner.desc')}
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <stat.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-display text-4xl font-bold text-foreground mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-accent font-semibold mb-4 tracking-wider uppercase">{t('about.whatWeDo.badge')}</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {t('about.whatWeDo.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('about.whatWeDo.desc')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => (
                <motion.div 
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Work */}
        <section className="bg-navy-dark py-24 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-accent font-semibold mb-4 tracking-wider uppercase">{t('about.ourWork.badge')}</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
                {t('about.ourWork.title')}
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {t('about.ourWork.desc')}
              </p>
            </div>

            <div className="relative mb-12">
              <div className="grid md:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                  <motion.div 
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-navy rounded-xl border border-white/10 overflow-hidden group"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button className="hidden lg:flex absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 rounded-full bg-navy border border-white/20 items-center justify-center hover:bg-white/10 transition-colors z-10">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-navy border border-white/20 items-center justify-center hover:bg-white/10 transition-colors z-10">
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="text-center">
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-colors">
                {t('about.ourWork.seeAll')} <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="bg-gradient-to-r from-navy-dark to-navy rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent via-navy-dark to-navy-dark"></div>
              
              <div className="relative z-10">
                <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6">
                  {t('about.cta.title')}
                </h2>
                <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-10">
                  {t('about.cta.desc')}
                </p>
                <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-lg font-medium text-lg hover:bg-accent/90 transition-colors">
                  {t('about.cta.button')} <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-accent font-semibold mb-4 tracking-wider uppercase">{t('about.team.badge')}</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {t('about.team.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('about.team.desc')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {team.map((member, i) => (
                <motion.div 
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl overflow-hidden text-center group shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-48 md:h-56 bg-muted overflow-hidden relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-foreground mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                    <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-accent hover:bg-accent hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;