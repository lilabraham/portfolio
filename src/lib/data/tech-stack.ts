// src/lib/data/tech-stack.ts
import type { TechItem, TechCategory } from "@/lib/types";

export const techStack: TechItem[] = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Flutter", category: "Frontend" },

  { name: "PHP / CodeIgniter 4", category: "Backend" },
  { name: "Firebase", category: "Backend" },

  { name: "Python (Pandas/NumPy)", category: "Data" },
  { name: "SQL (MySQL/PostgreSQL)", category: "Data" },

  { name: "Git / GitHub", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Draw.io", category: "Tools" },
];

export const CATEGORY_ORDER: TechCategory[] = ["Frontend", "Backend", "Data", "Tools"];

export function groupByCategory(items: TechItem[]): Record<TechCategory, TechItem[]> {
  return items.reduce(
    (acc, item) => {
      acc[item.category].push(item);
      return acc;
    },
    { Frontend: [], Backend: [], Data: [], Tools: [] } as Record<TechCategory, TechItem[]>
  );
}