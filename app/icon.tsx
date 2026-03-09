import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "#1B2E4B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#C9A84C",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "serif",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          HTL
        </span>
      </div>
    ),
    { ...size }
  );
}
