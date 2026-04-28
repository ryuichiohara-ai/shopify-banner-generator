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

  // テキスト揃え
  const alignItems =
    textAlign === "left" ? "flex-start" : textAlign === "right" ? "flex-end" : "center";
  const ctaBgColor = isDark
    ? bgPreset.background.startsWith("linear")
      ? "#1a1a2e"
      : bgPreset.background
    : "#ffffff";

  // 各要素の位置
  const mainX = data.customMainX ?? 8;
  const mainY = data.customMainY ?? 32;
  const subX = data.customSubX ?? 8;
  const subY = data.customSubY ?? 55;
  const ctaX = data.customCtaX ?? 8;
  const ctaY = data.customCtaY ?? 72;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
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

      {/* 商品画像 */}
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

      {/* ① メインコピー（productName・price・mainCopy をまとめて移動） */}
      <div
        data-drag="main"
        style={{
          position: "absolute",
          left: `${mainX}%`,
          top: `${mainY}%`,
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems,
          textAlign,
          gap: 10,
          maxWidth: "75%",
        }}
      >
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
        {data.price && (
          <div
            style={{
              alignSelf: alignItems,
              backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
              color: textColor,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"}`,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "8px 28px",
              borderRadius: 9999,
            }}
          >
            {data.price}
          </div>
        )}
        {data.mainCopy && (
          <div
            style={{
              fontSize: data.mainCopyFontSize || 72,
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
      </div>

      {/* ② サブコピー（独立して移動） */}
      {data.subCopy && (
        <div
          data-drag="sub"
          style={{
            position: "absolute",
            left: `${subX}%`,
            top: `${subY}%`,
            transform: "translateY(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems,
            textAlign,
            maxWidth: "75%",
          }}
        >
          <div
            style={{
              fontSize: data.subCopyFontSize || 32,
              lineHeight: 1.5,
              color: data.subCopyColor || (isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.65)"),
              fontFamily: fontPreset.bodyFamily,
            }}
          >
            {data.subCopy}
          </div>
        </div>
      )}

      {/* ③ CTAボタン（独立して移動） */}
      <div
        data-drag="cta"
        style={{
          position: "absolute",
          left: `${ctaX}%`,
          top: `${ctaY}%`,
          transform: "translateY(-50%)",
          zIndex: 10,
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
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap" as const,
          }}
        >
          {cta}
        </div>
      </div>
    </div>
  );
}
