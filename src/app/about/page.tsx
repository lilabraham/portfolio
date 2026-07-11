import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import EducationSection from "@/components/about/EducationSection";
import TechStackGrid from "@/components/tech-stack/TechStackGrid";
import GithubStatsCard from "@/components/about/GithubStatsCard";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <TechStackGrid />
      <GithubStatsCard />
      <AboutCTA />
    </>
  );
}