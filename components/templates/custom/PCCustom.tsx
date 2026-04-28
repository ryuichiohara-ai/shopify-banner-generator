import type { BannerData } from "@/lib/types";
import {
  CUSTOM_BG_PRESETS,
  CUSTOM_FONT_PRESETS,
  CTA_SIZE_MAP_PC,
} from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function PCCustom({ data }: Props) {
  const cta = data.cta || "詳しく見る";
  const ctaStyle = CTA_SIZE_MAP_PC[data.ctaSize];
  const hasBg = !!data.backgroundImageUrl;
  const showImg = data.showProductImage !== false && !!data.imageUrl;
  const textAlign = data.customTextAlign ?? "center";

  // 背景プリセット
  const bgPreset =
    CUSTOM_BG_PRESETS.find((p) => p.id === data.customBgPreset) ??
    CUSTOM_BG_PRESETS.find((p) => p.id === "navy")!;
  const textColor = hasBg ? "#ffffff" : bgPreset.textColor;
  const isDark = textColor === "#ffffff";

  // フォントプリセット
  const fontPreset =
    CUSTOM_FONT_PRESETS.find((p) => p.id === data.customFontPreset) ??
    CUSTOM_FONT_PRESETS.find((p) => p.id === "mixed")!;

  // テキスト揃えに対応した CSS 値
  const alignItems =
    textAlign === "left" ? "flex-start" : textAlign === "right" ? "flex-end" : "center";
  const ctaBgColor = isDark
    ? bgPreset.background.startsWith("linear")
      ? "#1a1a2e"
      : bgPreset.background
    : "#ffffff";

  // バッジ・ガラス調スタイル
  const badgeStyle = {
    backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
    color: textColor,
    border: `1px solid ${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"}`,
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: "0.1em",
    padding: "8px 28px",
    borderRadius: 9999,
  } as const;

  // テキストブロックの絶対位置
  const textX = data.customTextX ?? 4;
  const textY = data.customTextY ?? 50;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
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
              top: -120,
              right: -120,
              width: 480,
              height: 480,
              borderRadius: "50%",
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -80,
              left: -80,
              width: 360,
              height: 360,
              borderRadius: "50%",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
            }}
          />
        </>
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
          gap: 12,
          maxWidth: "70%",
        }}
      >
        {data.price && <div style={badgeStyle}>{data.price}</div>}
        {data.productName && (
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)",
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
              fontSize: 72 * (data.mainCopySizeScale ?? 1.0),
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
              fontSize: 32 * (data.subCopySizeScale ?? 1.0),
              lineHeight: 1.5,
              color: data.subCopyColor || (isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.65)"),
              fontFamily: fontPreset.bodyFamily,
            }}
          >
            {data.subCopy}
          </div>
        )}
        <div
          style={{
            marginTop: 12,
            alignSelf: alignItems,
            backgroundColor: textColor,
            color: data.ctaColor || ctaBgColor,
            fontSize: ctaStyle.fontSize * (data.ctaSizeScale ?? 1.0),
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          {cta}
        </div>
      </div>

      {/* 商品画像（あれば右端に固定） */}
      {showImg && (
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            width: 380,
            height: 380,
            flexShrink: 0,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
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
    </div>
  );
}
