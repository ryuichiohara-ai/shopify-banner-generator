import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_PC, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function PCSimple({ data }: Props) {
  const productName = data.productName || PLACEHOLDER.productName;
  const cta = data.cta || PLACEHOLDER.cta;
  const imageUrl = data.imageUrl || PLACEHOLDER.imageUrl;
  const ctaStyle = CTA_SIZE_MAP_PC[data.ctaSize];
  const hasBg = !!data.backgroundImageUrl;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 80,
        backgroundColor: "#ffffff",
        color: hasBg ? "#ffffff" : "#171717",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 上部：サブコピー + メインコピー */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          width: "100%",
        }}
      >
        {data.subCopy && (
          <span
            style={{
              fontSize: data.subCopyFontSize || 26,
              letterSpacing: "0.08em",
              color: data.subCopyColor || (hasBg ? "#f5f5f5" : "#737373"),
            }}
          >
            {data.subCopy}
          </span>
        )}
        {data.mainCopy && (
          <h1
            style={{
              fontSize: data.mainCopyFontSize || 76,
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "0.02em",
              margin: 0,
              color: data.mainCopyColor || (hasBg ? "#ffffff" : "#171717"),
            }}
          >
            {data.mainCopy}
          </h1>
        )}
      </div>

      {/* 中央：商品画像 */}
      {data.showProductImage !== false && (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: 560,
            height: 560,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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

      {/* 下部：商品名・価格・CTA */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: "100%",
        }}
      >
        <div style={{ fontSize: data.subCopyFontSize || 32, fontWeight: 500, textAlign: "center" }}>{productName}</div>
        {data.price && <div style={{ fontSize: 44, fontWeight: 700 }}>{data.price}</div>}
        <div
          style={{
            backgroundColor: hasBg ? "#ffffff" : "#171717",
            color: data.ctaColor || (hasBg ? "#171717" : "#ffffff"),
            fontSize: data.ctaFontSize || ctaStyle.fontSize,
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
