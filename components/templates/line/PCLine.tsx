import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_PC, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function PCLine({ data }: Props) {
  const cta = data.cta || PLACEHOLDER.cta;
  const ctaStyle = CTA_SIZE_MAP_PC[data.ctaSize];

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
        background: "linear-gradient(160deg, #06C755 0%, #04a043 100%)",
        color: "#ffffff",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 上部：友だち追加バッジ */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#06C755",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "0.4em",
            padding: "8px 32px",
            borderRadius: 9999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          ★ 公式アカウント ★
        </div>
        {data.subCopy && (
          <span style={{ fontSize: 26, letterSpacing: "0.08em", opacity: 0.95 }}>
            {data.subCopy}
          </span>
        )}
        {data.mainCopy && (
          <h1
            style={{
              margin: 0,
              fontSize: 76,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "0.04em",
              textShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            {data.mainCopy}
          </h1>
        )}
      </div>

      {/* 中央：握手アイコン */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <HandshakeBubble />
        {data.price && (
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#fff59d",
              textShadow: "0 4px 12px rgba(0,0,0,0.25)",
              letterSpacing: "0.04em",
            }}
          >
            {data.price}
          </div>
        )}
        {data.productName && (
          <div style={{ fontSize: 28, opacity: 0.9 }}>{data.productName}</div>
        )}
      </div>

      {/* 下部：CTA + 補足 */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#06C755",
            fontSize: ctaStyle.fontSize,
            fontWeight: 900,
            letterSpacing: "0.16em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
          }}
        >
          {cta} ＞
        </div>
        <span style={{ fontSize: 18, opacity: 0.85, letterSpacing: "0.08em" }}>
          QR コードまたはボタンから簡単追加
        </span>
      </div>
    </div>
  );
}

/** 友達の握手イラストを吹き出しに入れたコンポーネント */
function HandshakeBubble() {
  return (
    <div
      style={{
        position: "relative",
        width: 360,
        height: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 吹き出し本体 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#ffffff",
          borderRadius: 60,
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        }}
      />
      {/* しっぽ（左下） */}
      <div
        style={{
          position: "absolute",
          left: 60,
          bottom: -24,
          width: 0,
          height: 0,
          borderLeft: "0 solid transparent",
          borderRight: "60px solid transparent",
          borderTop: "60px solid #ffffff",
          filter: "drop-shadow(0 12px 12px rgba(0,0,0,0.1))",
        }}
      />
      {/* 握手SVGイラスト */}
      <svg
        width="260"
        height="160"
        viewBox="0 0 260 160"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* 左の人：頭 */}
        <circle cx="36" cy="26" r="24" fill="#06C755" />
        {/* 左の人：胴体 */}
        <rect x="24" y="56" width="24" height="60" rx="8" fill="#06C755" />
        {/* 左の人：腕（右に伸びる） */}
        <rect x="46" y="72" width="88" height="20" rx="10" fill="#06C755" transform="rotate(-6 46 82)" />

        {/* 右の人：頭 */}
        <circle cx="224" cy="26" r="24" fill="#06C755" />
        {/* 右の人：胴体 */}
        <rect x="212" y="56" width="24" height="60" rx="8" fill="#06C755" />
        {/* 右の人：腕（左に伸びる） */}
        <rect x="126" y="76" width="88" height="20" rx="10" fill="#06C755" transform="rotate(6 214 86)" />

        {/* 握手部分 */}
        <ellipse cx="130" cy="89" rx="28" ry="20" fill="#04a043" />
        <ellipse cx="124" cy="83" rx="10" ry="6" fill="#05b34e" opacity="0.6" />
      </svg>
    </div>
  );
}
