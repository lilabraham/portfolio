import Hero from "@/components/hero/Hero";
import TechMarquee from "@/components/tech-stack/TechMarquee";
import FeaturedWork from "@/components/projects/FeaturedWork";
import StatsBar from "@/components/home/StatsBar";
import ContactSection from "@/components/contact/ContactSection";
import ParticleField from "@/components/home/ParticleField";

export default function Home() {
  return (
    <div className="relative">
      <ParticleField />
      <div className="relative z-10">
        <Hero />
        <TechMarquee />
        <FeaturedWork />
        <StatsBar />
        <ContactSection />
      </div>
    </div>
  );
}