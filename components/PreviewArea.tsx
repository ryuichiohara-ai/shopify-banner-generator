"use client";

import { type RefObject, useRef, useState } from "react";
import type { BannerData, TemplateId } from "@/lib/types";
import { MOBILE_SIZE, PC_SIZE } from "@/lib/types";
import PCBanner from "./PCBanner";
import MobileBanner from "./MobileBanner";

type DragTarget = "main" | "sub" | "cta";

type Props = {
  data: BannerData;
  template: TemplateId;
  pcRef: RefObject<HTMLDivElement | null>;
  mobileRef: RefObject<HTMLDivElement | null>;
  update: (key: keyof BannerData, value: unknown) => void;
};

const PC_PREVIEW_SCALE = 0.4; // 1080 → 432 px
const MOBILE_PREVIEW_SCALE = 0.4; // 1280 → 512 px / 320 → 128 px

/**
 * プレビュー表示用とキャプチャ用でバナーを 2 つ描画する。
 *
 * - 表示用：CSS transform: scale() で縮小して画面に表示
 * - キャプチャ用：実寸（無変形）で画面外（left: -100000px）に固定配置 → html2canvas はこちらを撮る
 *
 * 表示用と同じ要素を transform 付きで html2canvas に渡すと、
 * 要素の getBoundingClientRect が transform 後のサイズになり、
 * キャプチャ結果がキャンバスの左上に小さく描画されて崩れる。
 * これを回避するために 2 描画に分離している。
 */
export default function PreviewArea({ data, template, pcRef, mobileRef, update }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState<DragTarget>("main");
  const pcPreviewRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);

  /** ドラッグ中の座標をBannerDataに反映する */
  function applyDrag(
    e: React.MouseEvent<HTMLDivElement>,
    containerRef: React.RefObject<HTMLDivElement | null>,
    scale: number,
    canvasW: number,
    canvasH: number,
  ) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rawX = (e.clientX - rect.left) / scale;
    const rawY = (e.clientY - rect.top) / scale;
    const pctX = Math.round(Math.max(0, Math.min(90, (rawX / canvasW) * 100)) * 10) / 10;
    const pctY = Math.round(Math.max(2, Math.min(95, (rawY / canvasH) * 100)) * 10) / 10;

    if (dragTarget === "main") {
      update("customMainX", pctX);
      update("customMainY", pctY);
    } else if (dragTarget === "sub") {
      update("customSubX", pctX);
      update("customSubY", pctY);
    } else {
      update("customCtaX", pctX);
      update("customCtaY", pctY);
    }
  }

  const isCustom = template === "custom";

  // ドラッグターゲット選択ボタンのラベル
  const dragTargetButtons: { id: DragTarget; label: string }[] = [
    { id: "main", label: "メインコピー" },
    { id: "sub", label: "サブコピー" },
    { id: "cta", label: "CTA" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* キャプチャ用：実寸 / 画面外 / refs はこっち */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "-100000px",
          top: 0,
          pointerEvents: "none",
        }}
      >
        <PCBanner ref={pcRef} data={data} template={template} />
        <MobileBanner ref={mobileRef} data={data} template={template} />
      </div>

      {/* カスタムテンプレート：ドラッグ対象選択ボタン */}
      {isCustom && (
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5">
          <span className="text-xs font-medium text-neutral-500 shrink-0">移動する要素：</span>
          <div className="flex gap-1.5">
            {dragTargetButtons.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setDragTarget(id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  dragTarget === id
                    ? "bg-neutral-800 text-white"
                    : "bg-white text-neutral-600 border border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="ml-2 text-xs text-neutral-400">← プレビューをドラッグして位置調整</span>
        </div>
      )}

      {/* 表示用：縮小プレビュー（refs は不要） */}
      <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <header className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-neutral-700">PC 用プレビュー</h2>
          <span className="text-xs text-neutral-500">
            実寸 {PC_SIZE.width}×{PC_SIZE.height} px / 表示は {Math.round(PC_PREVIEW_SCALE * 100)}%
          </span>
        </header>
        <ScaledFrame
          width={PC_SIZE.width}
          height={PC_SIZE.height}
          scale={PC_PREVIEW_SCALE}
          containerRef={pcPreviewRef}
          onMouseDown={(e) => {
            if (!isCustom) return;
            e.preventDefault();
            setIsDragging(true);
            applyDrag(e, pcPreviewRef, PC_PREVIEW_SCALE, PC_SIZE.width, PC_SIZE.height);
          }}
          onMouseMove={(e) => {
            if (!isDragging || !isCustom) return;
            applyDrag(e, pcPreviewRef, PC_PREVIEW_SCALE, PC_SIZE.width, PC_SIZE.height);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          cursor={isCustom ? (isDragging ? "grabbing" : "crosshair") : "default"}
        >
          <PCBanner data={data} template={template} />
        </ScaledFrame>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <header className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-neutral-700">スマホ用プレビュー</h2>
          <span className="text-xs text-neutral-500">
            実寸 {MOBILE_SIZE.width}×{MOBILE_SIZE.height} px / 表示は{" "}
            {Math.round(MOBILE_PREVIEW_SCALE * 100)}%
          </span>
        </header>
        <ScaledFrame
          width={MOBILE_SIZE.width}
          height={MOBILE_SIZE.height}
          scale={MOBILE_PREVIEW_SCALE}
          containerRef={mobilePreviewRef}
          onMouseDown={(e) => {
            if (!isCustom) return;
            e.preventDefault();
            setIsDragging(true);
            applyDrag(e, mobilePreviewRef, MOBILE_PREVIEW_SCALE, MOBILE_SIZE.width, MOBILE_SIZE.height);
          }}
          onMouseMove={(e) => {
            if (!isDragging || !isCustom) return;
            applyDrag(e, mobilePreviewRef, MOBILE_PREVIEW_SCALE, MOBILE_SIZE.width, MOBILE_SIZE.height);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          cursor={isCustom ? (isDragging ? "grabbing" : "crosshair") : "default"}
        >
          <MobileBanner data={data} template={template} />
        </ScaledFrame>
      </section>
    </div>
  );
}

/**
 * 子要素を実寸サイズで描画したまま、CSS transform でスケール表示するためのラッパ。
 * 表示用途のみ。html2canvas のキャプチャ対象には絶対に使わない（transform で
 * bounding rect が縮むため）。
 */
function ScaledFrame({
  width,
  height,
  scale,
  children,
  containerRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  cursor,
}: {
  width: number;
  height: number;
  scale: number;
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
  cursor?: string;
}) {
  return (
    <div
      className="overflow-auto rounded-md border border-dashed border-neutral-300 bg-neutral-50"
      style={{ width: "100%" }}
    >
      <div
        ref={containerRef}
        style={{
          width: width * scale,
          height: height * scale,
          position: "relative",
          margin: "0 auto",
          cursor: cursor ?? "default",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <div
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
