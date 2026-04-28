import type { BannerData } from "@/lib/types";
import { PLACEHOLDER, CTA_SIZE_MAP_PC, BANNER_FONT_FAMILY } from "@/lib/types";
import BackgroundLayer from "../BackgroundLayer";

type Props = { data: BannerData };

export default function PCMember({ data }: Props) {
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
        background: "linear-gradient(160deg, #1e3a8a 0%, #3b82f6 100%)",
        color: "#ffffff",
        fontFamily: BANNER_FONT_FAMILY,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <BackgroundLayer url={data.backgroundImageUrl} />

      {/* 装飾：星キラキラ（背景画像があるときは控えめに） */}
      {!hasBg && (
        <>
          <div
            style={{
              position: "absolute",
              left: 80,
              top: 200,
              fontSize: 36,
              color: "#fbbf24",
              opacity: 0.7,
            }}
          >
            ✦
          </div>
          <div
            style={{
              position: "absolute",
              right: 100,
              top: 280,
              fontSize: 28,
              color: "#fbbf24",
              opacity: 0.5,
            }}
          >
            ✦
          </div>
          <div
            style={{
              position: "absolute",
              right: 160,
              bottom: 280,
              fontSize: 32,
              color: "#fbbf24",
              opacity: 0.6,
            }}
          >
            ✦
          </div>
        </>
      )}

      {/* 上部：MEMBERS ONLY バッジ + 訴求コピー */}
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
            backgroundColor: "#fbbf24",
            color: "#1e3a8a",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "0.4em",
            padding: "8px 32px",
            borderRadius: 9999,
          }}
        >
          ★ MEMBERS ONLY ★
        </div>
        {data.subCopy && (
          <span style={{ fontSize: 26, letterSpacing: "0.08em", opacity: 0.95, color: data.subCopyColor || "#ffffff" }}>
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
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
              color: data.mainCopyColor || "#ffffff",
            }}
          >
            {data.mainCopy}
          </h1>
        )}
      </div>

      {/* 中央：ギフトボックス（CSS 描画） */}
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
        <GiftBox />
        {data.price && (
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#fbbf24",
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            {data.price}
          </div>
        )}
        {data.productName && (
          <div style={{ fontSize: 28, opacity: 0.85 }}>{data.productName}</div>
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
            backgroundColor: "#fbbf24",
            color: data.ctaColor || "#1e3a8a",
            fontSize: ctaStyle.fontSize,
            fontWeight: 900,
            letterSpacing: "0.16em",
            padding: `${ctaStyle.paddingY}px ${ctaStyle.paddingX}px`,
            borderRadius: 9999,
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.4)",
          }}
        >
          {cta} ▶
        </div>
        <span style={{ fontSize: 18, opacity: 0.8, letterSpacing: "0.08em" }}>
          登録無料・1分で完了
        </span>
      </div>
    </div>
  );
}

/** CSS で描いたギフトボックス */
function GiftBox() {
  return (
    <div style={{ position: "relative", width: 280, height: 280 }}>
      {/* リボン縦 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: 36,
          height: "100%",
          backgroundColor: "#fbbf24",
          zIndex: 2,
        }}
      />
      {/* 箱本体 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          zIndex: 1,
        }}
      />
      {/* リボン横 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          height: 36,
          backgroundColor: "#fbbf24",
          zIndex: 2,
        }}
      />
      {/* リボンの結び目（中心） */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 60,
          height: 60,
          backgroundColor: "#f59e0b",
          borderRadius: 30,
          zIndex: 3,
        }}
      />
    </div>
  );
}
