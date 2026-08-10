// src/components/ui/Container.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "nav" | "ul";
}

export default function Container({ children, className, as = "div" }: ContainerProps) {
  const Tag = as;
  return <Tag className={cn("mx-auto w-full max-w-5xl px-6", className)}>{children}</Tag>;
}