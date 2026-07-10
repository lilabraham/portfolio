// src/app/projects/page.tsx
// AFTER
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProjectGrid from "@/components/projects/ProjectGrid";
import AboutCTA from "@/components/about/AboutCTA";
import { allProjects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects — Iqra Manaqibal Atqiya",
  description: "Every product I've built, from live deployments to in-progress case studies.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="py-24">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <p className="font-body text-sm font-medium uppercase tracking-widest text-accent">
              All Projects
            </p>
            <h1 className="font-display text-3xl italic text-foreground sm:text-4xl">
              Everything I&apos;ve shipped and built
            </h1>
          </div>

          <ProjectGrid projects={allProjects} />
        </Container>
      </section>
      <AboutCTA />
    </>
  );
}