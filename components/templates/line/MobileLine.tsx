import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_MOBILE, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function MobileLine({ data }: Props) {
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
        background: "linear-gradient(135deg, #06C755 0%, #04a043 100%)",
        color: "#ffffff",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 左：握手アイコン（小） */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <HandshakeBubbleMini />
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
            backgroundColor: "#ffffff",
            color: "#06C755",
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.3em",
            padding: "4px 14px",
            borderRadius: 9999,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          公式アカウント
        </span>
        {data.mainCopy && (
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1.1,
              textShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            {data.mainCopy}
          </div>
        )}
        {data.price && (
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff59d" }}>{data.price}</div>
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
            backgroundColor: "#ffffff",
            color: "#06C755",
            fontSize: ctaStyle.fontSize,
            fontWeight: 900,
            letterSpacing: "0.12em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
          }}
        >
          {cta} ＞
        </div>
      </div>
    </div>
  );
}

function HandshakeBubbleMini() {
  return (
    <div
      style={{
        position: "relative",
        width: 220,
        height: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#ffffff",
          borderRadius: 40,
          boxShadow: "0 14px 24px rgba(0,0,0,0.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 36,
          bottom: -16,
          width: 0,
          height: 0,
          borderLeft: "0 solid transparent",
          borderRight: "40px solid transparent",
          borderTop: "40px solid #ffffff",
          filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.1))",
        }}
      />
      <svg
        width="160"
        height="100"
        viewBox="0 0 160 100"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* 左の人：頭 */}
        <circle cx="22" cy="17" r="15" fill="#06C755" />
        {/* 左の人：胴体 */}
        <rect x="15" y="36" width="15" height="38" rx="5" fill="#06C755" />
        {/* 左の人：腕 */}
        <rect x="28" y="46" width="54" height="13" rx="6" fill="#06C755" transform="rotate(-5 28 52)" />

        {/* 右の人：頭 */}
        <circle cx="138" cy="17" r="15" fill="#06C755" />
        {/* 右の人：胴体 */}
        <rect x="130" y="36" width="15" height="38" rx="5" fill="#06C755" />
        {/* 右の人：腕 */}
        <rect x="78" y="49" width="54" height="13" rx="6" fill="#06C755" transform="rotate(5 132 55)" />

        {/* 握手部分 */}
        <ellipse cx="80" cy="55" rx="18" ry="13" fill="#04a043" />
        <ellipse cx="76" cy="51" rx="6" ry="4" fill="#05b34e" opacity="0.6" />
      </svg>
    </div>
  );
}
