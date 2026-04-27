"use client";

import html2canvas from "html2canvas-pro";

/**
 * バナー要素を実寸の PNG に変換してダウンロードする。
 * - el: 実寸サイズで描画されている要素（CSS transform で縮小されていても OK。html2canvas-pro は元の DOM サイズで描画する）
 * - filename: 保存ファイル名
 * - width/height: 出力したい実サイズ（px）
 */
export async function downloadBannerAsPng(
  el: HTMLElement,
  filename: string,
  width: number,
  height: number,
) {
  // フォントの読み込みが終わってからキャプチャしないと、Times にフォールバックされて崩れることがある
  if (typeof document !== "undefined" && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // 失敗しても続行
    }
  }

  const canvas = await html2canvas(el, {
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scale: 1,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });

  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * 商品画像 URL を /api/image-proxy 経由に書き換えるヘルパー。
 * 直リンクで CORS が効かない場合の保険。data URL や同一オリジンの場合はそのまま返す。
 */
export function toProxiedImageUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("data:") || url.startsWith("blob:") || url.startsWith("/")) return url;
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}
