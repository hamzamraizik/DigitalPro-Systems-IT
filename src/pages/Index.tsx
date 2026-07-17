
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ApproachSection } from "@/components/home/ApproachSection";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { FeaturedCaseStudy } from "@/components/home/FeaturedCaseStudy";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { MetricsRow } from "@/components/home/MetricsRow";
import { ServicesPriorityGrid } from "@/components/home/ServicesPriorityGrid";
<div className="min-h-screen bg-page transition-colors duration-500"></div>
const HomePage = () => (
  <>
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
</>
);

export default HomePage;
