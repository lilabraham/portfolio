// src/components/projects/ProjectCard.tsx
"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import Button from "@/components/ui/Button";
import ProjectStatusBadge from "./ProjectStatusBadge";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { title, description, status, image, techStack, liveUrl, repoUrl } = project;
  const primaryLabel = status === "live" ? "Live Demo" : null;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scale = useSpring(1, { stiffness: 300, damping: 25 });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 500 }}
      className="group/card flex flex-col overflow-hidden rounded-2xl border border-border"
    >
      {image ? (
        <div className="relative aspect-video w-full overflow-hidden bg-border/30">
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            priority={priority}
            style={{ objectPosition: project.imagePosition ?? "center" }}
            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl italic text-foreground">{title}</h3>
          <ProjectStatusBadge status={status} />
        </div>

        <p className="font-body text-sm leading-relaxed text-muted">{description}</p>

        <ul className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-3 py-1 font-body text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {status !== "internal" ? (
          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            {primaryLabel && liveUrl ? (
              <Button href={liveUrl} external variant="primary" size="sm">
                {primaryLabel}
              </Button>
            ) : null}
            {repoUrl ? (
              <Button href={repoUrl} external variant="secondary" size="sm">
                View Code
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}