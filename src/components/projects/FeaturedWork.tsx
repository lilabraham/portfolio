// src/components/projects/FeaturedWork.tsx
"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProjectGrid from "./ProjectGrid";
import { featuredProjects } from "@/lib/data/projects";

export default function FeaturedWork() {
  return (
    <section className="py-24">
      <Container className="flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <p className="font-body text-sm font-medium uppercase tracking-widest text-accent">
            Featured Work
          </p>
          <h2 className="font-display text-3xl italic text-foreground sm:text-4xl">
            A few things I&apos;ve built
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ProjectGrid projects={featuredProjects} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button href="/projects" variant="secondary">
            View All Projects
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}