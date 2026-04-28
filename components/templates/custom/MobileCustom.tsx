import type { BannerData } from "@/lib/types";
import {
  CUSTOM_BG_PRESETS,
  CUSTOM_FONT_PRESETS,
  CTA_SIZE_MAP_MOBILE,
} from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function MobileCustom({ data }: Props) {
  const cta = data.cta || "詳しく見る";
  const ctaStyle = CTA_SIZE_MAP_MOBILE[data.ctaSize];
  const hasBg = !!data.backgroundImageUrl;
  const showImg = data.showProductImage !== false && !!data.imageUrl;
  const textAlign = data.customTextAlign ?? "left";

  const bgPreset =
    CUSTOM_BG_PRESETS.find((p) => p.id === data.customBgPreset) ??
    CUSTOM_BG_PRESETS.find((p) => p.id === "navy")!;
  const textColor = hasBg ? "#ffffff" : bgPreset.textColor;
  const isDark = textColor === "#ffffff";

  const fontPreset =
    CUSTOM_FONT_PRESETS.find((p) => p.id === data.customFontPreset) ??
    CUSTOM_FONT_PRESETS.find((p) => p.id === "mixed")!;

  const alignItems =
    textAlign === "left" ? "flex-start" : textAlign === "right" ? "flex-end" : "center";
  const ctaBgColor = isDark
    ? bgPreset.background.startsWith("linear")
      ? "#1a1a2e"
      : bgPreset.background
    : "#ffffff";

  // テキストブロックの絶対位置
  const textX = data.customTextX ?? 4;
  const textY = data.customTextY ?? 50;

  return (
    <div
      style={{
        width: 1280,
        height: 320,
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 40,
        padding: "0 56px",
        background: bgPreset.background,
        fontFamily: fontPreset.bodyFamily,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 装飾円（背景画像なしのとき） */}
      {!hasBg && (
        <>
          <div
            style={{
              position: "absolute",
              top: -80,
              right: 200,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: 320,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
            }}
          />
        </>
      )}

      {/* 商品画像（あれば左端に固定） */}
      {showImg && (
        <div
          style={{
            position: "absolute",
            left: 56,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            width: 220,
            height: 220,
            flexShrink: 0,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
            border: isDark ? "3px solid rgba(255,255,255,0.15)" : "3px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.imageUrl}
            alt={data.productName || ""}
            crossOrigin="anonymous"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* テキストブロック（絶対配置でドラッグ可能） */}
      <div
        style={{
          position: "absolute",
          left: `${textX}%`,
          top: `${textY}%`,
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems,
          textAlign,
          gap: 8,
          maxWidth: "60%",
        }}
      >
        {data.productName && (
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.45)",
              textTransform: "uppercase" as const,
              fontFamily: fontPreset.bodyFamily,
            }}
          >
            {data.productName}
          </div>
        )}
        {data.mainCopy && (
          <div
            style={{
              fontSize: data.mainCopyFontSize || 50,
              fontWeight: 800,
              lineHeight: 1.1,
              color: data.mainCopyColor || textColor,
              fontFamily: fontPreset.titleFamily,
              letterSpacing: "-0.01em",
            }}
          >
            {data.mainCopy}
          </div>
        )}
        {data.subCopy && (
          <div
            style={{
              fontSize: data.subCopyFontSize || 22,
              lineHeight: 1.4,
              color: data.subCopyColor || (isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.6)"),
              fontFamily: fontPreset.bodyFamily,
            }}
          >
            {data.subCopy}
          </div>
        )}
        {data.price && (
          <div
            style={{
              alignSelf: alignItems,
              backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
              color: textColor,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"}`,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "4px 18px",
              borderRadius: 9999,
            }}
          >
            {data.price}
          </div>
        )}
      </div>

      {/* 右：CTAボタン（右端に固定） */}
      <div
        style={{
          position: "absolute",
          right: 56,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: textColor,
            color: data.ctaColor || ctaBgColor,
            fontSize: data.ctaFontSize || ctaStyle.fontSize,
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap" as const,
          }}
        >
          {cta}
        </div>
      </div>
    </div>
  );
}
