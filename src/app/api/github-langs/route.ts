import { NextResponse } from "next/server";

const GITHUB_USERNAME = "lilabraham";
const SOURCE_URL = `https://github-readme-stats-five-eosin-11.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=a855f7&text_color=fafafa`;

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
    console.error("[github-langs] fetch failed:", err);
    return new NextResponse(`Error: ${err instanceof Error ? err.message : "unknown"}`, { status: 502 });
  }
}