"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { allProjects } from "@/lib/data/projects";
import { techStack } from "@/lib/data/tech-stack";

const STATS = [
  { label: "Projects Shipped", value: allProjects.length },
  { label: "Live in Production", value: allProjects.filter((p) => p.status === "live").length },
  { label: "Tech Stack", value: techStack.length },
];

export default function StatsBar() {
  return (
    <section className="py-16">
      <Container className="grid grid-cols-3 gap-6 border-y border-border py-10">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <span className="font-display text-3xl italic text-accent sm:text-4xl">
              {stat.value}
            </span>
            <span className="font-body text-xs uppercase tracking-widest text-muted">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}