import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";// AFTER
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CommandPalette from "@/components/layout/CommandPalette";
import { CommandPaletteProvider } from "@/components/layout/CommandPaletteContext";
import { ToastProvider } from "@/components/layout/ToastContext";
import { ThemeProvider } from "@/components/layout/ThemeContext";
import ThemeScript from "@/components/layout/ThemeScript";
import KonamiEasterEgg from "@/components/layout/KonamiEasterEgg";
import PixelPet from "@/components/layout/PixelPet";
import DynamicTabTitle from "@/components/layout/DynamicTabTitle";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const SITE_URL = "https://liliqra.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Iqra Manaqibal Atqiya — Software Engineer",
    template: "%s — Iqra Manaqibal Atqiya",
  },
  description:
    "I build software people actually use — not just deploy and forget.",
  openGraph: {
    title: "Iqra Manaqibal Atqiya — Software Engineer",
    description:
      "I build software people actually use — not just deploy and forget.",
    url: SITE_URL,
    siteName: "Iqra Manaqibal Atqiya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iqra Manaqibal Atqiya — Software Engineer",
    description:
      "I build software people actually use — not just deploy and forget.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full`}>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <ToastProvider>
            <CommandPaletteProvider>
              <PageTransition>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <ScrollToTopButton />
                <CustomCursor />
                <CommandPalette />
              </PageTransition>
            </CommandPaletteProvider>
            <PixelPet />
          </ToastProvider>
          <KonamiEasterEgg />
          <DynamicTabTitle />
        </ThemeProvider>
      </body>
    </html>
  );
}