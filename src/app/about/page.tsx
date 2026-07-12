import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import EducationSection from "@/components/about/EducationSection";
import TechStackGrid from "@/components/tech-stack/TechStackGrid";
import SetupCard from "@/components/about/SetupCard";
import AboutCTA from "@/components/about/AboutCTA";
import PullQuote from "@/components/about/PullQuote";

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <TechStackGrid />
      <PullQuote />
      <SetupCard />
      <AboutCTA />
    </>
  );
}