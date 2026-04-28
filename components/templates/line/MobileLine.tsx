import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_MOBILE, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function MobileLine({ data }: Props) {
  const cta = data.cta || PLACEHOLDER.cta;
  const ctaStyle = CTA_SIZE_MAP_MOBILE[data.ctaSize];
  const textColor = data.lineTextColor || "#ffffff";
  const iconColor = data.lineIconColor || "#06C755";

  return (
    <div
      style={{
        width: 1280,
        height: 320,
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 32,
        padding: "0 48px",
        background: "linear-gradient(135deg, #06C755 0%, #04a043 100%)",
        color: "#ffffff",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 左：ブランドロゴ or HandshakeBubbleMini */}
      {data.lineBrandLogoUrl ? (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: 200,
            height: 200,
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
            style={{ width: 130, height: 130, objectFit: "contain", borderRadius: 16 }}
          />
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            flexShrink: 0,
          }}
        >
          <HandshakeBubbleMini iconColor={iconColor} />
        </div>
      )}

      {/* 中央：バッジ + メインコピー */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span
          style={{
            alignSelf: "flex-start",
            backgroundColor: "#ffffff",
            color: "#06C755",
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.3em",
            padding: "4px 14px",
            borderRadius: 9999,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          公式アカウント
        </span>
        {data.mainCopy && (
          <div
            style={{
              fontSize: 52 * (data.mainCopySizeScale ?? 1.0),
              fontWeight: 900,
              lineHeight: 1.1,
              textShadow: "0 4px 12px rgba(0,0,0,0.25)",
              color: data.mainCopyColor || textColor,
            }}
          >
            {data.mainCopy}
          </div>
        )}
        {data.price && (
          <div style={{ fontSize: 28, fontWeight: 900, color: data.lineAccentColor || "#fff59d" }}>{data.price}</div>
        )}
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
            backgroundColor: "#ffffff",
            color: data.ctaColor || "#06C755",
            fontSize: ctaStyle.fontSize * (data.ctaSizeScale ?? 1.0),
            fontWeight: 900,
            letterSpacing: "0.12em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
          }}
        >
          {cta} ＞
        </div>
      </div>
    </div>
  );
}

/** かわいいちびキャラ握手イラスト（モバイル用小サイズ） */
function HandshakeBubbleMini({ iconColor }: { iconColor: string }) {
  const darkColor = "#04a043";
  return (
    <div
      style={{
        position: "relative",
        width: 220,
        height: 188,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#ffffff",
          borderRadius: 40,
          boxShadow: "0 14px 24px rgba(0,0,0,0.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 36,
          bottom: -16,
          width: 0,
          height: 0,
          borderLeft: "0 solid transparent",
          borderRight: "40px solid transparent",
          borderTop: "40px solid #ffffff",
          filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.1))",
        }}
      />
      <svg
        width="170"
        height="115"
        viewBox="0 0 170 115"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* ===== 左のキャラ ===== */}
        {/* 体 */}
        <rect x="12" y="58" width="19" height="34" rx="9" fill={iconColor} />
        {/* 頭（大きめ） */}
        <circle cx="21" cy="36" r="23" fill={iconColor} />
        {/* 白目(左) */}
        <circle cx="14" cy="31" r="5.5" fill="#ffffff" />
        <circle cx="15.5" cy="32.5" r="2.5" fill="#1a1a1a" />
        {/* 白目(右) */}
        <circle cx="28" cy="31" r="5.5" fill="#ffffff" />
        <circle cx="29.5" cy="32.5" r="2.5" fill="#1a1a1a" />
        {/* ほっぺ */}
        <ellipse cx="8" cy="41" rx="5.5" ry="3.5" fill="#ff9eb5" opacity="0.75" />
        <ellipse cx="34" cy="41" rx="5.5" ry="3.5" fill="#ff9eb5" opacity="0.75" />
        {/* 笑顔 */}
        <path d="M14 46 Q21 53 28 46" stroke={darkColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* 腕 */}
        <rect x="29" y="64" width="53" height="14" rx="7" fill={iconColor} transform="rotate(-5 29 71)" />

        {/* ===== 右のキャラ ===== */}
        {/* 体 */}
        <rect x="139" y="58" width="19" height="34" rx="9" fill={iconColor} />
        {/* 頭 */}
        <circle cx="149" cy="36" r="23" fill={iconColor} />
        {/* 白目(左) */}
        <circle cx="142" cy="31" r="5.5" fill="#ffffff" />
        <circle cx="143.5" cy="32.5" r="2.5" fill="#1a1a1a" />
        {/* 白目(右) */}
        <circle cx="156" cy="31" r="5.5" fill="#ffffff" />
        <circle cx="157.5" cy="32.5" r="2.5" fill="#1a1a1a" />
        {/* ほっぺ */}
        <ellipse cx="136" cy="41" rx="5.5" ry="3.5" fill="#ff9eb5" opacity="0.75" />
        <ellipse cx="162" cy="41" rx="5.5" ry="3.5" fill="#ff9eb5" opacity="0.75" />
        {/* 笑顔 */}
        <path d="M142 46 Q149 53 156 46" stroke={darkColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* 腕 */}
        <rect x="88" y="67" width="53" height="14" rx="7" fill={iconColor} transform="rotate(5 141 74)" />

        {/* ===== 中央：握手 + ハート ===== */}
        <ellipse cx="85" cy="73" rx="20" ry="14" fill={darkColor} opacity="0.35" />
        <path
          d="M85 67 C85 59, 75 55, 75 63 C75 70, 85 79, 85 79 C85 79, 95 70, 95 63 C95 55, 85 59, 85 67 Z"
          fill="#ff6b9d"
        />

        {/* ===== キラキラ ===== */}
        <path d="M50,15 L51.5,20 L57,20 L52.5,23 L54,28 L50,25 L46,28 L47.5,23 L43,20 L48.5,20 Z" fill="#fff59d" />
        <path d="M120,10 L121.5,14 L126,14 L122.5,17 L124,21 L120,18.5 L116,21 L117.5,17 L114,14 L118.5,14 Z" fill="#fff59d" />
      </svg>
    </div>
  );
}
