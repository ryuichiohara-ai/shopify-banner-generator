import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_PC, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function PCLine({ data }: Props) {
  const cta = data.cta || PLACEHOLDER.cta;
  const ctaStyle = CTA_SIZE_MAP_PC[data.ctaSize];
  const textColor = data.lineTextColor || "#ffffff";
  const accentColor = data.lineAccentColor || "#fff59d";
  const iconColor = data.lineIconColor || "#06C755";

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
          <span style={{ fontSize: data.subCopyFontSize || 26, letterSpacing: "0.08em", opacity: 0.95, color: data.subCopyColor || textColor }}>
            {data.subCopy}
          </span>
        )}
        {data.mainCopy && (
          <h1
            style={{
              margin: 0,
              fontSize: data.mainCopyFontSize || 76,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "0.04em",
              textShadow: "0 4px 12px rgba(0,0,0,0.25)",
              color: data.mainCopyColor || textColor,
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
        {/* 左：ブランドロゴ or HandshakeBubble */}
        {data.lineBrandLogoUrl ? (
          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: 320,
              height: 320,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "50%",
              border: "4px solid rgba(255,255,255,0.3)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.lineBrandLogoUrl}
              alt="ブランドロゴ"
              crossOrigin="anonymous"
              style={{ width: 220, height: 220, objectFit: "contain", borderRadius: 16 }}
            />
          </div>
        ) : (
          <div style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
            <HandshakeBubble iconColor={iconColor} />
          </div>
        )}
        {data.price && (
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: accentColor,
              textShadow: "0 4px 12px rgba(0,0,0,0.25)",
              letterSpacing: "0.04em",
            }}
          >
            {data.price}
          </div>
        )}
        {data.productName && (
          <div style={{ fontSize: 28, opacity: 0.9, color: textColor }}>{data.productName}</div>
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
            color: data.ctaColor || "#06C755",
            fontSize: data.ctaFontSize || ctaStyle.fontSize,
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

/** 友達の握手イラストを吹き出しに入れたコンポーネント（かわいいちびキャラ版） */
function HandshakeBubble({ iconColor }: { iconColor: string }) {
  const darkColor = "#04a043";
  return (
    <div
      style={{
        position: "relative",
        width: 360,
        height: 290,
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
      {/* かわいい握手SVGイラスト */}
      <svg
        width="280"
        height="180"
        viewBox="0 0 280 180"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* ===== 左のキャラ ===== */}
        {/* 体 */}
        <rect x="22" y="90" width="30" height="52" rx="15" fill={iconColor} />
        {/* 頭（大きめ・ちびキャラ） */}
        <circle cx="37" cy="58" r="36" fill={iconColor} />
        {/* 白目(左) */}
        <circle cx="27" cy="52" r="9" fill="#ffffff" />
        <circle cx="29" cy="54" r="4.5" fill="#1a1a1a" />
        {/* 白目(右) */}
        <circle cx="47" cy="52" r="9" fill="#ffffff" />
        <circle cx="49" cy="54" r="4.5" fill="#1a1a1a" />
        {/* ほっぺ */}
        <ellipse cx="18" cy="65" rx="9" ry="5.5" fill="#ff9eb5" opacity="0.75" />
        <ellipse cx="56" cy="65" rx="9" ry="5.5" fill="#ff9eb5" opacity="0.75" />
        {/* 笑顔 */}
        <path d="M28 72 Q37 81 46 72" stroke={darkColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* 腕（右に伸びる） */}
        <rect x="50" y="98" width="84" height="22" rx="11" fill={iconColor} transform="rotate(-6 50 109)" />

        {/* ===== 右のキャラ ===== */}
        {/* 体 */}
        <rect x="228" y="90" width="30" height="52" rx="15" fill={iconColor} />
        {/* 頭 */}
        <circle cx="243" cy="58" r="36" fill={iconColor} />
        {/* 白目(左) */}
        <circle cx="233" cy="52" r="9" fill="#ffffff" />
        <circle cx="235" cy="54" r="4.5" fill="#1a1a1a" />
        {/* 白目(右) */}
        <circle cx="253" cy="52" r="9" fill="#ffffff" />
        <circle cx="255" cy="54" r="4.5" fill="#1a1a1a" />
        {/* ほっぺ */}
        <ellipse cx="224" cy="65" rx="9" ry="5.5" fill="#ff9eb5" opacity="0.75" />
        <ellipse cx="262" cy="65" rx="9" ry="5.5" fill="#ff9eb5" opacity="0.75" />
        {/* 笑顔 */}
        <path d="M234 72 Q243 81 252 72" stroke={darkColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* 腕（左に伸びる） */}
        <rect x="146" y="101" width="84" height="22" rx="11" fill={iconColor} transform="rotate(6 230 112)" />

        {/* ===== 中央：握手 + ハート ===== */}
        {/* 握手グロー */}
        <ellipse cx="140" cy="113" rx="32" ry="22" fill={darkColor} opacity="0.35" />
        {/* ハート */}
        <path
          d="M140 106 C140 95, 125 89, 125 101 C125 110, 140 122, 140 122 C140 122, 155 110, 155 101 C155 89, 140 95, 140 106 Z"
          fill="#ff6b9d"
        />

        {/* ===== キラキラ装飾 ===== */}
        {/* 左上スター */}
        <path d="M84,22 L86,29 L93,29 L88,33 L90,40 L84,36 L78,40 L80,33 L75,29 L82,29 Z" fill="#fff59d" />
        {/* 右上スター（小） */}
        <path d="M196,16 L198,21 L203,21 L199,24 L201,29 L196,26 L191,29 L193,24 L189,21 L194,21 Z" fill="#fff59d" />
        {/* 右スター（極小） */}
        <path d="M218,46 L219.5,50 L224,50 L220.5,52.5 L222,57 L218,54 L214,57 L215.5,52.5 L212,50 L216.5,50 Z" fill="#ffffff" opacity="0.85" />
      </svg>
    </div>
  );
}
