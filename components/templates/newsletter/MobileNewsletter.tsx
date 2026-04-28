import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_MOBILE, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function MobileNewsletter({ data }: Props) {
  const cta = data.cta || PLACEHOLDER.cta;
  const ctaStyle = CTA_SIZE_MAP_MOBILE[data.ctaSize];
  const hasBg = !!data.backgroundImageUrl;
  const textColor = hasBg ? "#ffffff" : "#0c4a6e";

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
        background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
        color: textColor,
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 左：封筒（小） */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <EnvelopeMini />
      </div>

      {/* 中央：バッジ + メインコピー + 特典 */}
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
            backgroundColor: "#0ea5e9",
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.3em",
            padding: "4px 14px",
            borderRadius: 9999,
          }}
        >
          NEWSLETTER
        </span>
        {data.mainCopy && (
          <div
            style={{
              fontSize: data.mainCopyFontSize || 44,
              fontWeight: 900,
              lineHeight: 1.1,
              textShadow: hasBg ? "0 4px 12px rgba(0,0,0,0.4)" : "none",
              color: data.mainCopyColor || textColor,
            }}
          >
            {data.mainCopy}
          </div>
        )}
        <div style={{ fontSize: 18, fontWeight: 600, opacity: 0.95 }}>
          ✓ 限定クーポン　✓ 新商品先行　✓ 週1配信
        </div>
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
            backgroundColor: "#0ea5e9",
            color: data.ctaColor || "#ffffff",
            fontSize: data.ctaFontSize || ctaStyle.fontSize,
            fontWeight: 700,
            letterSpacing: "0.12em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 14px 24px -8px rgba(14,165,233,0.4)",
          }}
        >
          {cta} ✉
        </div>
      </div>
    </div>
  );
}

function EnvelopeMini() {
  return (
    <div
      style={{
        position: "relative",
        width: 220,
        height: 150,
        backgroundColor: "#ffffff",
        border: "6px solid #0ea5e9",
        borderRadius: 8,
        boxShadow: "0 14px 24px rgba(14,165,233,0.25)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -6,
          top: -6,
          width: 0,
          height: 0,
          borderLeft: "110px solid transparent",
          borderRight: "110px solid transparent",
          borderTop: "75px solid #0ea5e9",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          borderLeft: "104px solid transparent",
          borderRight: "104px solid transparent",
          borderTop: "66px solid #ffffff",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "62%",
          transform: "translate(-50%, -50%)",
          fontSize: 40,
          fontWeight: 900,
          color: "#0ea5e9",
        }}
      >
        @
      </div>
    </div>
  );
}
