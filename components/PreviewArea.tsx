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

const PC_PREVIEW_SCALE = 0.4;
const MOBILE_PREVIEW_SCALE = 0.4;

/**
 * プレビュー表示用とキャプチャ用でバナーを 2 つ描画する。
 * 表示用：CSS transform: scale() で縮小
 * キャプチャ用：実寸で画面外に固定 → html2canvas はこちらを撮る
 */
export default function PreviewArea({ data, template, pcRef, mobileRef, update }: Props) {
  // UI 表示用 state（ボタンのハイライト）
  const [dragTargetUI, setDragTargetUI] = useState<DragTarget>("main");

  // ドラッグ処理用 ref（クロージャの古い値問題を防ぐ）
  const dragTargetRef = useRef<DragTarget>("main");
  const isDraggingRef = useRef(false);

  const pcPreviewRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);

  function selectTarget(t: DragTarget) {
    setDragTargetUI(t);
    dragTargetRef.current = t;
  }

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

    const t = dragTargetRef.current;
    if (t === "main") {
      update("customMainX", pctX);
      update("customMainY", pctY);
    } else if (t === "sub") {
      update("customSubX", pctX);
      update("customSubY", pctY);
    } else {
      update("customCtaX", pctX);
      update("customCtaY", pctY);
    }
  }

  const isCustom = template === "custom";

  const dragTargetButtons: { id: DragTarget; label: string }[] = [
    { id: "main", label: "メインコピー" },
    { id: "sub", label: "サブコピー" },
    { id: "cta", label: "CTA" },
  ];

  function makePCHandlers() {
    return {
      onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isCustom) return;
        e.preventDefault();
        isDraggingRef.current = true;
        applyDrag(e, pcPreviewRef, PC_PREVIEW_SCALE, PC_SIZE.width, PC_SIZE.height);
      },
      onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current || !isCustom) return;
        applyDrag(e, pcPreviewRef, PC_PREVIEW_SCALE, PC_SIZE.width, PC_SIZE.height);
      },
      onMouseUp: () => { isDraggingRef.current = false; },
      onMouseLeave: () => { isDraggingRef.current = false; },
    };
  }

  function makeMobileHandlers() {
    return {
      onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isCustom) return;
        e.preventDefault();
        isDraggingRef.current = true;
        applyDrag(e, mobilePreviewRef, MOBILE_PREVIEW_SCALE, MOBILE_SIZE.width, MOBILE_SIZE.height);
      },
      onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current || !isCustom) return;
        applyDrag(e, mobilePreviewRef, MOBILE_PREVIEW_SCALE, MOBILE_SIZE.width, MOBILE_SIZE.height);
      },
      onMouseUp: () => { isDraggingRef.current = false; },
      onMouseLeave: () => { isDraggingRef.current = false; },
    };
  }

  return (
    <div className="flex flex-col gap-6">
      {/* キャプチャ用：実寸 / 画面外 */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", left: "-100000px", top: 0, pointerEvents: "none" }}
      >
        <PCBanner ref={pcRef} data={data} template={template} />
        <MobileBanner ref={mobileRef} data={data} template={template} />
      </div>

      {/* カスタムテンプレート：移動対象選択 */}
      {isCustom && (
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5">
          <span className="text-xs font-medium text-neutral-500 shrink-0">移動する要素：</span>
          <div className="flex gap-1.5">
            {dragTargetButtons.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectTarget(id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  dragTargetUI === id
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

      {/* PC プレビュー */}
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
          cursor={isCustom ? "crosshair" : "default"}
          {...makePCHandlers()}
        >
          <PCBanner data={data} template={template} />
        </ScaledFrame>
      </section>

      {/* スマホ プレビュー */}
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
          cursor={isCustom ? "crosshair" : "default"}
          {...makeMobileHandlers()}
        >
          <MobileBanner data={data} template={template} />
        </ScaledFrame>
      </section>
    </div>
  );
}

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
