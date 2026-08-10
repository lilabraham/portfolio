"use client";

import dynamic from "next/dynamic";

export const CommandPalette = dynamic(() => import("@/components/layout/CommandPalette"), { ssr: false });
export const KonamiEasterEgg = dynamic(() => import("@/components/layout/KonamiEasterEgg"), { ssr: false });
export const PixelPet = dynamic(() => import("@/components/layout/PixelPet"), { ssr: false });
export const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
