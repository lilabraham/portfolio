// src/components/projects/ProjectStatusBadge.tsx
import Badge from "@/components/ui/Badge";
import type { ProjectStatus } from "@/lib/types";

const STATUS_CONFIG: Record<ProjectStatus, { label: string; tone: "accent" | "muted" | "success" | "warning" | "info" }> = {
  live: { label: "Live", tone: "success" },
  "in-dev": { label: "Case Study", tone: "info" },
  "repo-only": { label: "Repo Only", tone: "muted" },
  internal: { label: "Internal", tone: "warning" },
};

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

export default function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const { label, tone } = STATUS_CONFIG[status];
  return <Badge tone={tone}>{label}</Badge>;
}