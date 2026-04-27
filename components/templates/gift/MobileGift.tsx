import type { BannerData } from "@/lib/types";
import {
  PLACEHOLDER,
  CTA_SIZE_MAP_MOBILE,
  BANNER_FONT_FAMILY,
  BANNER_SERIF_FAMILY,
} from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function MobileGift({ data }: Props) {
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
        background: "linear-gradient(135deg, #fef6ee 0%, #fde7d3 60%, #f7d6c1 100%)",
        color: "#3f2d23",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 装飾（背景画像があるときは非表示） */}
      {!hasBg && (
        <>
          <div
            style={{
              position: "absolute",
              left: -40,
              top: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              backgroundColor: "#fecdd3",
              opacity: 0.5,
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -40,
              bottom: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "#fde68a",
              opacity: 0.5,
              filter: "blur(40px)",
            }}
          />
        </>
      )}

      {/* 中央：テキスト */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            backgroundColor: "#ffffff",
            color: "#9f1239",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.4em",
            padding: "4px 20px",
            borderRadius: 9999,
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          ✦ GIFT ✦
        </div>
        {data.mainCopy && (
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "0.04em",
              fontFamily: BANNER_SERIF_FAMILY,
            }}
          >
            {data.mainCopy}
          </div>
        )}
        <div
          style={{
            fontSize: 22,
            color: "#57534e",
            fontFamily: BANNER_SERIF_FAMILY,
          }}
        >
          {productName}
        </div>
      </div>

      {/* 右：商品画像 */}
      {data.showProductImage !== false && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: 240,
            height: 240,
            flexShrink: 0,
            border: "8px solid #ffffff",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)",
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

      {/* CTA */}
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
