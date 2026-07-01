import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ApproachSection } from "@/components/home/ApproachSection";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { FeaturedCaseStudy } from "@/components/home/FeaturedCaseStudy";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { MetricsRow } from "@/components/home/MetricsRow";
import { ServicesPriorityGrid } from "@/components/home/ServicesPriorityGrid";

const HomePage = () => (
  <div className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] transition-colors duration-500">
    <Navbar />
    <main>
      <HeroSection />
      <MetricsRow />
      <ExpertiseSection />
      <ServicesPriorityGrid />
      <ApproachSection />
      <FeaturedCaseStudy />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);

export default HomePage;
