import type {
  BannerData,
} from "@/lib/types";
import {
  PLACEHOLDER,
  CTA_SIZE_MAP_PC,
  BANNER_FONT_FAMILY,
  BANNER_SERIF_FAMILY,
} from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function PCGift({ data }: Props) {
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
        background: "linear-gradient(160deg, #fef6ee 0%, #fde7d3 60%, #f7d6c1 100%)",
        color: "#3f2d23",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 装飾：柔らかい円（背景画像があるときは非表示） */}
      {!hasBg && (
        <>
          <div
            style={{
              position: "absolute",
              left: -96,
              top: 80,
              width: 280,
              height: 280,
              borderRadius: "50%",
              backgroundColor: "#fecdd3",
              opacity: 0.5,
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -80,
              bottom: 128,
              width: 320,
              height: 320,
              borderRadius: "50%",
              backgroundColor: "#fde68a",
              opacity: 0.5,
              filter: "blur(40px)",
            }}
          />
        </>
      )}

      {/* 上部：GIFT バッジ + サブコピー + メインコピー */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#9f1239",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.4em",
            padding: "8px 32px",
            borderRadius: 9999,
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          ✦ GIFT ✦
        </div>
        {data.subCopy && (
          <span style={{ fontSize: 26, letterSpacing: "0.08em", color: "#57534e" }}>
            {data.subCopy}
          </span>
        )}
        {data.mainCopy && (
          <h1
            style={{
              margin: "8px 0 0 0",
              fontSize: 68,
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "0.06em",
              fontFamily: BANNER_SERIF_FAMILY,
            }}
          >
            {data.mainCopy}
          </h1>
        )}
      </div>

      {/* 中央：商品画像（リボン枠風） */}
      {data.showProductImage !== false && <div style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            width: 500,
            height: 500,
            border: "14px solid #ffffff",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
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
        <div
          style={{
            position: "absolute",
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#9f1239",
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.2em",
            padding: "8px 24px",
            borderRadius: 8,
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.2)",
          }}
        >
          for you
        </div>
      </div>}

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
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            fontFamily: BANNER_SERIF_FAMILY,
          }}
        >
          {productName}
        </div>
        {data.price && (
          <div style={{ fontSize: 40, fontWeight: 700, color: "#9f1239" }}>{data.price}</div>
        )}
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#9f1239",
            border: "2px solid #9f1239",
            fontSize: ctaStyle.fontSize,
            fontWeight: 600,
            letterSpacing: "0.16em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          }}
        >
          {cta}
        </div>
      </div>
    </div>
  );
}
