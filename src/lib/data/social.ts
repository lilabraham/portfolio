export type SocialIconName = "email" | "github" | "linkedin" | "instagram";

export interface SocialLink {
  label: string;
  href: string;
  external: boolean;
  icon: SocialIconName;
}

export const socialLinks: SocialLink[] = [
  { label: "Email", href: "mailto:iqroace@gmail.com", external: false, icon: "email" },
  { label: "GitHub", href: "https://github.com/lilabraham", external: true, icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/iqra-manaqibal-atqiya-5b21881a0/",
    external: true,
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/iqro46/",
    external: true,
    icon: "instagram",
  },
];