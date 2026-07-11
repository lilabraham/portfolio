import { NextResponse } from "next/server";

const GITHUB_USERNAME = "lilabraham";
const SOURCE_URL = `https://github-readme-stats-five-eosin-11.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=a855f7&text_color=fafafa&icon_color=38bdf8`;

export async function GET() {
  try {
    const res = await fetch(SOURCE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
    const svg = await res.text();

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[github-stats] fetch failed:", err);
    return new NextResponse(`Error: ${err instanceof Error ? err.message : "unknown"}`, { status: 502 });
  }
}