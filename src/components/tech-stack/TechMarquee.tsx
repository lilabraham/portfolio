"use client";

import type { IconType } from "react-icons";
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFlutter,
  SiPhp, SiCodeigniter, SiFirebase,
  SiPython, SiPandas, SiNumpy, SiMysql, SiPostgresql,
  SiGit, SiGithub, SiFigma, SiDiagramsdotnet,
} from "react-icons/si";
import type { TechCategory } from "@/lib/types";

interface MarqueeIcon {
  Icon: IconType;
  label: string;
  category: TechCategory;
}

const CATEGORY_COLOR: Record<TechCategory, string> = {
  Frontend: "var(--color-info)",
  Backend: "var(--color-success)",
  Data: "var(--color-warning)",
  Tools: "var(--color-special)",
};

const MARQUEE_ICONS: MarqueeIcon[] = [
  { Icon: SiNextdotjs, label: "Next.js", category: "Frontend" },
  { Icon: SiReact, label: "React", category: "Frontend" },
  { Icon: SiTypescript, label: "TypeScript", category: "Frontend" },
  { Icon: SiTailwindcss, label: "Tailwind CSS", category: "Frontend" },
  { Icon: SiFlutter, label: "Flutter", category: "Frontend" },
  { Icon: SiPhp, label: "PHP", category: "Backend" },
  { Icon: SiCodeigniter, label: "CodeIgniter 4", category: "Backend" },
  { Icon: SiFirebase, label: "Firebase", category: "Backend" },
  { Icon: SiPython, label: "Python", category: "Data" },
  { Icon: SiPandas, label: "Pandas", category: "Data" },
  { Icon: SiNumpy, label: "NumPy", category: "Data" },
  { Icon: SiMysql, label: "MySQL", category: "Data" },
  { Icon: SiPostgresql, label: "PostgreSQL", category: "Data" },
  { Icon: SiGit, label: "Git", category: "Tools" },
  { Icon: SiGithub, label: "GitHub", category: "Tools" },
  { Icon: SiFigma, label: "Figma", category: "Tools" },
  { Icon: SiDiagramsdotnet, label: "Draw.io", category: "Tools" },
];

const LOOP_ICONS = [...MARQUEE_ICONS, ...MARQUEE_ICONS];

export default function TechMarquee() {
  return (
    <div
      className="relative overflow-hidden py-8"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {LOOP_ICONS.map(({ Icon, label, category }, index) => (
          <div
            key={`${label}-${index}`}
            title={label}
            className="flex flex-col items-center gap-2"
            style={{ color: CATEGORY_COLOR[category] }}
          >
            <Icon className="h-8 w-8" />
            <span className="font-body text-[10px] uppercase tracking-widest text-muted">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}