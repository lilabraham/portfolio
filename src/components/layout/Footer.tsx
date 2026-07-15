import Link from "next/link";
import Container from "@/components/ui/Container";
import { profile } from "@/lib/data/profile";
import { NAV_LINKS } from "@/lib/data/nav";
import { socialLinks, type SocialIconName } from "@/lib/data/social";
import { EmailIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/icons";

const ICON_MAP: Record<SocialIconName, typeof EmailIcon> = {
  email: EmailIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
};

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm italic text-foreground">{profile.name}</p>
          <p className="mt-1 font-body text-sm text-muted">{profile.location}</p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = ICON_MAP[link.icon];
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </footer>
  );
}