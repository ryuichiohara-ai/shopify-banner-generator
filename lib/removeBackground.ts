"use client";

import { removeBackground } from "@imgly/background-removal";

/**
 * 画像 URL の背景を透過にして blob URL を返す。
 * - 外部 URL の場合は /api/image-proxy 経由で取得して CORS 問題を回避
 * - 内部処理：fetch → Blob → @imgly/background-removal → Blob → URL.createObjectURL
 *
 * 初回実行時に ONNX モデル（数十 MB）が CDN からダウンロードされ、
 * IndexedDB にキャッシュされる。次回以降は早い。
 *
 * @returns blob URL（プレビュー / html2canvas どちらでも安全に利用できる）
 */
export async function removeImageBackground(srcUrl: string): Promise<string> {
  if (!srcUrl) throw new Error("画像 URL が空です");

  // 同一オリジンや blob: / data: ならそのまま fetch、それ以外は image-proxy 経由
  const fetchUrl =
    srcUrl.startsWith("blob:") ||
    srcUrl.startsWith("data:") ||
    srcUrl.startsWith("/")
      ? srcUrl
      : `/api/image-proxy?url=${encodeURIComponent(srcUrl)}`;

  const res = await fetch(fetchUrl);
  if (!res.ok) {
    throw new Error(`画像取得に失敗しました（HTTP ${res.status}）`);
  }
  const inputBlob = await res.blob();

  const outputBlob = await removeBackground(inputBlob);
  return URL.createObjectURL(outputBlob);
}
