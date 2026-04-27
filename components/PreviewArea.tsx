"use client";

import { type RefObject } from "react";
import type { BannerData, TemplateId } from "@/lib/types";
import { MOBILE_SIZE, PC_SIZE } from "@/lib/types";
import PCBanner from "./PCBanner";
import MobileBanner from "./MobileBanner";

type Props = {
  data: BannerData;
  template: TemplateId;
  pcRef: RefObject<HTMLDivElement | null>;
  mobileRef: RefObject<HTMLDivElement | null>;
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
export default function PreviewArea({ data, template, pcRef, mobileRef }: Props) {
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

      {/* 表示用：縮小プレビュー（refs は不要） */}
      <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <header className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-neutral-700">PC 用プレビュー</h2>
          <span className="text-xs text-neutral-500">
            実寸 {PC_SIZE.width}×{PC_SIZE.height} px / 表示は {Math.round(PC_PREVIEW_SCALE * 100)}%
          </span>
        </header>
        <ScaledFrame width={PC_SIZE.width} height={PC_SIZE.height} scale={PC_PREVIEW_SCALE}>
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
}: {
  width: number;
  height: number;
  scale: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="overflow-auto rounded-md border border-dashed border-neutral-300 bg-neutral-50"
      style={{ width: "100%" }}
    >
      <div
        style={{
          width: width * scale,
          height: height * scale,
          position: "relative",
          margin: "0 auto",
        }}
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
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
