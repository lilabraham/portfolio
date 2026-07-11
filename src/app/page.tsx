import Hero from "@/components/hero/Hero";
import TechMarquee from "@/components/tech-stack/TechMarquee";
import FeaturedWork from "@/components/projects/FeaturedWork";
import StatsBar from "@/components/home/StatsBar";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <FeaturedWork />
      <StatsBar />
      <ContactSection />
    </>
  );
}