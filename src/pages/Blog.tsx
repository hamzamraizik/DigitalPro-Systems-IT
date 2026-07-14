import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock } from "lucide-react";

const articles = [
  {
    slug: "cybersecurite-pme-maroc",
    title: "Cybersécurité : les 10 bonnes pratiques pour les PME marocaines",
    excerpt: "Découvrez les mesures essentielles pour protéger votre entreprise contre les cybermenaces croissantes au Maroc.",
    date: "15 Fév 2026",
    readTime: "5 min",
    category: "Cybersécurité",
  },
  {
    slug: "transformation-digitale-2026",
    title: "Transformation digitale : tendances clés pour 2026",
    excerpt: "Les technologies qui façonneront la digitalisation des entreprises marocaines cette année.",
    date: "10 Fév 2026",
    readTime: "7 min",
    category: "Transformation Digitale",
  },
  {
    slug: "erp-cloud-avantages",
    title: "ERP Cloud : pourquoi migrer votre gestion vers le cloud ?",
    excerpt: "Les avantages concrets d'une solution ERP hébergée dans le cloud pour votre entreprise.",
    date: "5 Fév 2026",
    readTime: "6 min",
    category: "ERP/CRM",
  },
  {
    slug: "infrastructure-reseau-securise",
    title: "Comment concevoir une infrastructure réseau sécurisée ?",
    excerpt: "Guide complet pour mettre en place un réseau d'entreprise performant et protégé.",
    date: "28 Jan 2026",
    readTime: "8 min",
    category: "Réseaux",
  },
  {
    slug: "ia-innovation-it",
    title: "L'intelligence artificielle au service de l'IT d'entreprise",
    excerpt: "Comment l'IA révolutionne la gestion des infrastructures et la maintenance prédictive.",
    date: "20 Jan 2026",
    readTime: "5 min",
    category: "Innovation",
  },
  {
    slug: "videosurveillance-ip",
    title: "Vidéosurveillance IP : guide d'achat pour entreprises",
    excerpt: "Critères de choix, technologies et bonnes pratiques pour votre système de vidéosurveillance.",
    date: "12 Jan 2026",
    readTime: "6 min",
    category: "Sécurité",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <section className="bg-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">Blog Tech</h1>
              <p className="text-primary-foreground/70 text-lg">Actualités, conseils et tendances du monde IT et de la cybersécurité.</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-xl border border-border shadow-card overflow-hidden group hover:shadow-elevated transition-all duration-300"
                >
                  <div className="h-2 bg-accent" />
                  <div className="p-6">
                    <span className="inline-block text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
                      {article.category}
                    </span>
                    <h2 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
