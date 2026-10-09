
import Footer from "@/components/Footer";
import { ApproachSection } from "@/components/home/ApproachSection";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { FeaturedCaseStudy } from "@/components/home/FeaturedCaseStudy";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPriorityGrid } from "@/components/home/ServicesPriorityGrid";

const HomePage = () => (
  <>
    <main>
      <HeroSection />
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
