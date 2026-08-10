// src/components/ui/Badge.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "accent" | "muted" | "success" | "warning" | "info";

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

const toneClass: Record<Tone, string> = {
  accent: "border-accent/40 text-accent",
  muted: "border-border text-muted",
  success: "border-success/40 text-success",
  warning: "border-warning/40 text-warning",
  info: "border-info/40 text-info",
};

export default function Badge({ children, tone = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-body text-xs font-medium",
        toneClass[tone],
        className
      )}
    >
      {children}
    </span>
  );
}