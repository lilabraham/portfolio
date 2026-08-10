import type { IconType } from "react-icons";
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFlutter,
  SiPhp, SiCodeigniter, SiFirebase,
  SiPython, SiPandas, SiNumpy, SiMysql, SiPostgresql,
  SiGit, SiGithub, SiFigma, SiDiagramsdotnet,
} from "react-icons/si";
import type { TechCategory } from "@/lib/types";

export const TECH_ICON_MAP: Record<string, IconType[]> = {
  "Next.js": [SiNextdotjs],
  "React": [SiReact],
  "TypeScript": [SiTypescript],
  "Tailwind CSS": [SiTailwindcss],
  "Flutter": [SiFlutter],
  "PHP / CodeIgniter 4": [SiPhp, SiCodeigniter],
  "Firebase": [SiFirebase],
  "Python (Pandas/NumPy)": [SiPython, SiPandas, SiNumpy],
  "SQL (MySQL/PostgreSQL)": [SiMysql, SiPostgresql],
  "Git / GitHub": [SiGit, SiGithub],
  "Figma": [SiFigma],
  "Draw.io": [SiDiagramsdotnet],
};

export const CATEGORY_COLOR: Record<TechCategory, string> = {
  Frontend: "var(--color-info)",
  Backend: "var(--color-success)",
  Data: "var(--color-warning)",
  Tools: "var(--color-special)",
};