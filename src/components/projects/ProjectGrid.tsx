"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="font-body text-sm text-muted">No projects to show yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
        >
          <ProjectCard project={project} priority={index === 0} />
        </motion.div>
      ))}
    </div>
  );
}