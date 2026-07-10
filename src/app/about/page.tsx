import type { Metadata } from "next";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import EducationSection from "@/components/about/EducationSection";
import TechStackGrid from "@/components/tech-stack/TechStackGrid";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience, and the tools I reach for.",
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <TechStackGrid />
      <AboutCTA />
    </>
  );
}