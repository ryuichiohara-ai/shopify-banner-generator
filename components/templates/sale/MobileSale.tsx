import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_MOBILE, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function MobileSale({ data }: Props) {
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
        gap: 32,
        padding: "0 40px",
        background: "linear-gradient(135deg, #ff3b30 0%, #ff8a00 100%)",
        color: "#ffffff",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 装飾（背景画像があるときは非表示） */}
      {!hasBg && (
        <div
          style={{
            position: "absolute",
            right: -64,
            top: -64,
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: "#fde047",
            opacity: 0.2,
          }}
        />
      )}

      {/* 左：商品画像 */}
      {data.showProductImage !== false && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: 240,
            height: 240,
            flexShrink: 0,
            border: "4px solid #ffffff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
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

      {/* 中央：SALE バッジ + メインコピー */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span
          style={{
            alignSelf: "flex-start",
            backgroundColor: "#fde047",
            color: "#b91c1c",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "0.2em",
            padding: "4px 16px",
            borderRadius: 6,
          }}
        >
          SALE
        </span>
        {data.mainCopy && (
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              lineHeight: 1.1,
              textShadow: "0 4px 6px rgba(0,0,0,0.3)",
              color: data.mainCopyColor || "#ffffff",
            }}
          >
            {data.mainCopy}
          </div>
        )}
        <div style={{ fontSize: 22, opacity: 0.9 }}>{productName}</div>
      </div>

      {/* 右：CTA */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#fde047",
            color: data.ctaColor || "#b91c1c",
            fontSize: ctaStyle.fontSize,
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
