import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_PC, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function PCNewsletter({ data }: Props) {
  const cta = data.cta || PLACEHOLDER.cta;
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
        background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
        color: "#0c4a6e",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 点線フレーム（背景画像があると邪魔なので非表示） */}
      {!hasBg && (
        <div
          style={{
            position: "absolute",
            inset: 32,
            border: "3px dashed #0ea5e9",
            borderRadius: 16,
            zIndex: 0,
          }}
        />
      )}

      {/* 上部：タイトル */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          color: hasBg ? "#ffffff" : "#0c4a6e",
        }}
      >
        <div
          style={{
            backgroundColor: "#0ea5e9",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.4em",
            padding: "8px 32px",
            borderRadius: 9999,
          }}
        >
          NEWSLETTER
        </div>
        {data.subCopy && (
          <span
            style={{
              fontSize: 26,
              letterSpacing: "0.08em",
              color: data.subCopyColor || (hasBg ? "#ffffff" : "#0369a1"),
            }}
          >
            {data.subCopy}
          </span>
        )}
        {data.mainCopy && (
          <h1
            style={{
              margin: "8px 0 0 0",
              fontSize: 64,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: "0.04em",
              textShadow: hasBg ? "0 4px 12px rgba(0,0,0,0.4)" : "none",
              color: data.mainCopyColor || (hasBg ? "#ffffff" : "#0c4a6e"),
            }}
          >
            {data.mainCopy}
          </h1>
        )}
      </div>

      {/* 中央：封筒アイコン */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Envelope />
      </div>

      {/* 下部：特典リスト + CTA */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          color: hasBg ? "#ffffff" : "#0c4a6e",
        }}
      >
        {/* 特典リスト（subCopy 以外の固定特典） */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 32,
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          <span>✓ 限定クーポン</span>
          <span>✓ 新商品先行</span>
          <span>✓ 週1回配信</span>
        </div>
        {data.price && (
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: hasBg ? "#fbbf24" : "#0ea5e9",
            }}
          >
            {data.price}
          </div>
        )}
        <div
          style={{
            backgroundColor: "#0ea5e9",
            color: data.ctaColor || "#ffffff",
            fontSize: ctaStyle.fontSize,
            fontWeight: 700,
            letterSpacing: "0.16em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 14px 24px -8px rgba(14,165,233,0.5)",
          }}
        >
          {cta} ✉
        </div>
      </div>
    </div>
  );
}

/** CSS で描いた封筒 */
function Envelope() {
  return (
    <div
      style={{
        position: "relative",
        width: 360,
        height: 240,
        backgroundColor: "#ffffff",
        border: "8px solid #0ea5e9",
        borderRadius: 12,
        boxShadow: "0 20px 40px rgba(14,165,233,0.25)",
      }}
    >
      {/* 折り返しの三角（フタ） */}
      <div
        style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 0,
          height: 0,
          borderLeft: "180px solid transparent",
          borderRight: "180px solid transparent",
          borderTop: "120px solid #0ea5e9",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          borderLeft: "172px solid transparent",
          borderRight: "172px solid transparent",
          borderTop: "108px solid #ffffff",
        }}
      />
      {/* @ アイコン */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "62%",
          transform: "translate(-50%, -50%)",
          fontSize: 64,
          fontWeight: 900,
          color: "#0ea5e9",
        }}
      >
        @
      </div>
    </div>
  );
}
