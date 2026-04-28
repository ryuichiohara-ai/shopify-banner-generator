import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_MOBILE, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function MobileSimple({ data }: Props) {
  const productName = data.productName || PLACEHOLDER.productName;
  const cta = data.cta || PLACEHOLDER.cta;
  const imageUrl = data.imageUrl || PLACEHOLDER.imageUrl;
  const ctaStyle = CTA_SIZE_MAP_MOBILE[data.ctaSize];
  const hasBg = !!data.backgroundImageUrl;

  return (
    <div
      style={{
        width: 1280,
        height: 320,
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 40,
        padding: "0 48px",
        backgroundColor: "#ffffff",
        color: hasBg ? "#ffffff" : "#171717",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 左：商品画像 */}
      {data.showProductImage !== false && (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: 260,
            height: 260,
            flexShrink: 0,
            backgroundColor: "#f5f5f5",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={productName}
            crossOrigin="anonymous"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* 中央：テキスト */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {data.mainCopy && (
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15, color: data.mainCopyColor || (hasBg ? "#ffffff" : "#171717") }}>{data.mainCopy}</div>
        )}
        <div
          style={{
            fontSize: 26,
            color: hasBg ? "#e5e5e5" : "#404040",
          }}
        >
          {productName}
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
            backgroundColor: hasBg ? "#ffffff" : "#171717",
            color: data.ctaColor || (hasBg ? "#171717" : "#ffffff"),
            fontSize: ctaStyle.fontSize,
            fontWeight: 600,
            letterSpacing: "0.08em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
          }}
        >
          {cta}
        </div>
      </div>
    </div>
  );
}
