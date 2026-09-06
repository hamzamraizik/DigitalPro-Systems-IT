import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

// readTime reste une valeur numérique : le suffixe ("min" / "min read") est traduit
const articles = [
  { slug: "cybersecurite-pme-maroc", readTime: 5 },
  { slug: "transformation-digitale-2026", readTime: 7 },
  { slug: "erp-cloud-avantages", readTime: 6 },
  { slug: "infrastructure-reseau-securise", readTime: 8 },
  { slug: "ia-innovation-it", readTime: 5 },
  { slug: "videosurveillance-ip", readTime: 6 },
];

const BlogPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <div className="pt-24 lg:pt-28">
        <section className="bg-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
<h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {t("blogPage.hero.title")}
              </h1>
              <p className="text-primary-foreground/70 text-lg">{t("blogPage.hero.subtitle")}</p>            </motion.div>
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
                      {t(`blogPage.articles.${article.slug}.category`)}
                    </span>
                    <h2 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {t(`blogPage.articles.${article.slug}.title`)}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {t(`blogPage.articles.${article.slug}.excerpt`)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {t(`blogPage.articles.${article.slug}.date`)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime} {t("blogPage.readTimeSuffix")}
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
