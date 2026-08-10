import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Iqra Manaqibal Atqiya — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 28, color: "#a855f7", letterSpacing: 2, textTransform: "uppercase" }}>
          Software Engineer
        </div>
        <div style={{ fontSize: 72, fontStyle: "italic", marginTop: 20, lineHeight: 1.1 }}>
          Iqra Manaqibal Atqiya
        </div>
        <div style={{ fontSize: 28, color: "#a3a3a3", marginTop: 24, maxWidth: 900 }}>
          I build software people actually use — not just deploy and forget.
        </div>
      </div>
    ),
    { ...size }
  );
}