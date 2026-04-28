import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_MOBILE, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function MobileMember({ data }: Props) {
  const cta = data.cta || PLACEHOLDER.cta;
  const ctaStyle = CTA_SIZE_MAP_MOBILE[data.ctaSize];

  return (
    <div
      style={{
        width: 1280,
        height: 320,
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 32,
        padding: "0 48px",
        background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
        color: "#ffffff",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 左：ギフトボックス（小） */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: 200,
          height: 200,
          flexShrink: 0,
        }}
      >
        <GiftBoxMini />
      </div>

      {/* 中央：バッジ + メインコピー */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span
          style={{
            alignSelf: "flex-start",
            backgroundColor: "#fbbf24",
            color: "#1e3a8a",
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.3em",
            padding: "4px 14px",
            borderRadius: 9999,
          }}
        >
          ★ MEMBERS
        </span>
        {data.mainCopy && (
          <div
            style={{
              fontSize: 52 * (data.mainCopySizeScale ?? 1.0),
              fontWeight: 900,
              lineHeight: 1.1,
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
              color: data.mainCopyColor || "#ffffff",
            }}
          >
            {data.mainCopy}
          </div>
        )}
        {data.price && (
          <div style={{ fontSize: 28 * (data.subCopySizeScale ?? 1.0), fontWeight: 900, color: "#fbbf24" }}>{data.price}</div>
        )}
      </div>

      {/* 右：CTA */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#fbbf24",
            color: data.ctaColor || "#1e3a8a",
            fontSize: ctaStyle.fontSize * (data.ctaSizeScale ?? 1.0),
            fontWeight: 900,
            letterSpacing: "0.12em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
          }}
        >
          {cta} ▶
        </div>
      </div>
    </div>
  );
}

function GiftBoxMini() {
  return (
    <div style={{ position: "relative", width: 200, height: 200 }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: 26,
          height: "100%",
          backgroundColor: "#fbbf24",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#ffffff",
          borderRadius: 12,
          boxShadow: "0 14px 30px rgba(0,0,0,0.3)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          height: 26,
          backgroundColor: "#fbbf24",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 44,
          height: 44,
          backgroundColor: "#f59e0b",
          borderRadius: "50%",
          zIndex: 3,
        }}
      />
    </div>
  );
}
