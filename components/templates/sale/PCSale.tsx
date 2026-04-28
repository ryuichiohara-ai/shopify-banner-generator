import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_PC, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function PCSale({ data }: Props) {
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
        padding: 64,
        background: "linear-gradient(135deg, #ff3b30 0%, #ff8a00 100%)",
        color: "#ffffff",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 装飾：右上の円（背景画像があるときは非表示） */}
      {!hasBg && (
        <>
          <div
            style={{
              position: "absolute",
              right: -128,
              top: -128,
              width: 420,
              height: 420,
              borderRadius: "50%",
              backgroundColor: "#fde047",
              opacity: 0.2,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -96,
              bottom: 160,
              width: 260,
              height: 260,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              opacity: 0.1,
            }}
          />
        </>
      )}

      {/* 上部：SALE バッジ + 期間限定 */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              backgroundColor: "#fde047",
              color: "#b91c1c",
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: "0.2em",
              padding: "8px 24px",
              borderRadius: 8,
              alignSelf: "flex-start",
            }}
          >
            SALE
          </span>
          {data.subCopy && (
            <span
              style={{
                marginTop: 12,
                fontSize: 26,
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: data.subCopyColor || "#ffffff",
              }}
            >
              {data.subCopy}
            </span>
          )}
        </div>
        <span
          style={{
            border: "4px solid #ffffff",
            borderRadius: 9999,
            padding: "12px 32px",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          期間限定
        </span>
      </div>

      {/* 中央：商品画像 + メインコピー */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {data.showProductImage !== false && (
          <div
            style={{
              width: 440,
              height: 440,
              border: "8px solid #ffffff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
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
        {data.mainCopy && (
          <h1
            style={{
              margin: 0,
              fontSize: data.mainCopyFontSize || 80,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "0.02em",
              textShadow: "0 4px 6px rgba(0,0,0,0.3)",
              color: data.mainCopyColor || "#ffffff",
            }}
          >
            {data.mainCopy}
          </h1>
        )}
      </div>

      {/* 下部：商品名・価格・CTA */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          width: "100%",
        }}
      >
        <div style={{ fontSize: data.subCopyFontSize || 26, opacity: 0.9 }}>{productName}</div>
        {data.price && (
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              textShadow: "0 4px 6px rgba(0,0,0,0.3)",
            }}
          >
            {data.price}
          </div>
        )}
        <div
          style={{
            marginTop: 8,
            backgroundColor: "#fde047",
            color: data.ctaColor || "#b91c1c",
            fontSize: data.ctaFontSize || ctaStyle.fontSize,
            fontWeight: 900,
            letterSpacing: "0.16em",
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
