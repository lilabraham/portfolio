// lib/data/projects.ts — FULL FILE
import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "cerita",
    title: "CERITA",
    description:
      "An HIV/AIDS education platform for Indonesian youth, built as a research instrument for Poltekkes Kemenkes Semarang. Features an interactive quiz engine, full dark mode, and a Neo-Brutalism design system built from scratch.",
    status: "live",
    featured: true,
    weight: 1,
    liveUrl: "https://cerita-skripsi.vercel.app/",
    repoUrl: "https://github.com/lilabraham/cerita-skripsi",
    image: "/images/projects/cerita.webp",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Zod"],
  },
  {
    slug: "abhati-logistics",
    title: "Abhati Logistics",
    description:
      "An enterprise desktop dashboard for shipment management, built during my IT Programmer internship at Abhati Group. Focused on a Linear-inspired design token system (AppColors, AppSpacing, AppTypography) for long-term visual consistency.",
    status: "in-dev",
    featured: true,
    weight: 2,
    repoUrl: "https://github.com/lilabraham/abhati-logistics-desktop",
    image: "/images/projects/abhati-logistics.webp",
    techStack: ["Flutter", "Dart", "Desktop"],
  },
  {
    slug: "abhati-inventory",
    title: "Abhati Inventory",
    description:
      "A laptop asset management system for Abhati Group, built during my IT Programmer internship there with full RBAC, audit trails, and a strict controller architecture following enterprise security standards.",
    status: "in-dev",
    featured: true,
    weight: 3,
    repoUrl: "https://github.com/lilabraham/abhati-inventory-system",
    image: "/images/projects/abhati-inventory.webp",
    techStack: ["CodeIgniter 4", "PHP", "MySQL", "Shield"],
  },
  {
    slug: "eternawed",
    title: "EternaWed",
    description:
      "An interactive digital wedding invitation platform with smooth motion animations and full cross-device compatibility.",
    status: "live",
    featured: false,
    weight: 4,
    liveUrl: "https://wedding-arin.netlify.app/",
    repoUrl: "https://github.com/lilabraham/eternawed-invitation-arin-",
    image: "/images/projects/eternawed.webp",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    slug: "si-umkm",
    title: "Si-UMKM",
    description:
      "A server-rendered data management dashboard for small and medium businesses, built with a fully type-safe approach to reduce runtime bugs on complex operational data.",
    status: "live",
    featured: false,
    weight: 5,
    liveUrl: "https://si-umkm-app.vercel.app/",
    repoUrl: "https://github.com/lilabraham/si-umkm-app",
    image: "/images/projects/si-umkm.webp",
    imagePosition: "left center",
    techStack: ["Next.js", "TypeScript", "Firebase"],
  },
  {
    slug: "pharmafusion",
    title: "PharmaFusion",
    description:
      "An AI-integrated pharmaceutical data management system built during a 900-hour AI Developer Internship (MSIB Batch 7 capstone). Covered cross-functional workflow mapping and progress reporting alongside development.",
    status: "repo-only",
    featured: false,
    weight: 8,
    repoUrl: "https://github.com/lilabraham/PharmaFusion",
    techStack: ["HTML", "CSS", "JavaScript", "Python"],
  },
  {
    slug: "purbalingga-idw",
    title: "Peta Kerawanan Kriminalitas Purbalingga",
    description:
      "A crime-risk mapping study for Purbalingga Regency (2024), using Inverse Distance Weighting (IDW) interpolation over 34 curated incidents across 28 villages. Includes interactive layer controls for risk surface, hotspots, village boundaries, and per-village tooltips.",
    status: "live",
    featured: false,
    weight: 6,
    liveUrl: "https://purbalingga-idw-app-pjqb84nrmznrfu4eqepmta.streamlit.app/",
    repoUrl: "https://github.com/lilabraham/purbalingga-idw-app",
    image: "/images/projects/purbalingga-idw.webp",
    techStack: ["Python", "Streamlit", "IDW Interpolation"],
  },
  {
    slug: "travel-agent-php",
    title: "Travel Agent Booking System",
    description:
      "A web-based travel ticket booking system built with native PHP using OOP principles and a simplified MVC pattern. Handles schedule search, ticket booking, and financial reporting workflows.",
    status: "repo-only",
    featured: false,
    weight: 9,
    repoUrl: "https://github.com/lilabraham/travel-agent-php",
    techStack: ["PHP", "OOP", "MVC"],
  },
  {
    slug: "eduhealth",
    title: "EduHealth",
    description:
      "An HIV/AIDS education platform built for a client, reimagining the same theme with entirely new content and design direction from an earlier iteration of the concept.",
    status: "live",
    featured: false,
    weight: 7,
    liveUrl: "https://steady-kitten-78e9c6.netlify.app",
    repoUrl: "https://github.com/lilabraham/skripsi-eduhealth",
    image: "/images/projects/eduhealth.webp",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.weight - b.weight);

export const allProjects = [...projects].sort((a, b) => a.weight - b.weight);