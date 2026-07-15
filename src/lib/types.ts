export type ProjectStatus = 'live' | 'in-dev' | 'repo-only' | 'internal';

export interface Project {
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  featured: boolean;
  weight: number;
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  imagePosition?: string;
  techStack: string[];
}

export interface ProfileData {
  name: string;
  tagline: string;
  email: string;
  whatsapp?: string;
  linkedinUrl: string;
  githubUrl: string;
  location: string;
  instagramUrl: string;
}

export type TechCategory = "Frontend" | "Backend" | "Data" | "Tools";

export interface TechItem {
  name: string;
  category: TechCategory;
}