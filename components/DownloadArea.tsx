"use client";

import { useState, type RefObject } from "react";
import type { TemplateId } from "@/lib/types";
import { MOBILE_SIZE, PC_SIZE } from "@/lib/types";
import { downloadBannerAsPng } from "@/lib/downloadBanner";

type Props = {
  pcRef: RefObject<HTMLDivElement | null>;
  mobileRef: RefObject<HTMLDivElement | null>;
  template: TemplateId;
};

export default function DownloadArea({ pcRef, mobileRef, template }: Props) {
  const [busy, setBusy] = useState<"pc" | "mobile" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePc() {
    if (!pcRef.current) return;
    setBusy("pc");
    setError(null);
    try {
      await downloadBannerAsPng(
        pcRef.current,
        `banner-pc-${template}-${timestamp()}.png`,
        PC_SIZE.width,
        PC_SIZE.height,
      );
    } catch (e) {
      setError(toMessage(e));
    } finally {
      setBusy(null);
    }
  }

  async function handleMobile() {
    if (!mobileRef.current) return;
    setBusy("mobile");
    setError(null);
    try {
      await downloadBannerAsPng(
        mobileRef.current,
        `banner-mobile-${template}-${timestamp()}.png`,
        MOBILE_SIZE.width,
        MOBILE_SIZE.height,
      );
    } catch (e) {
      setError(toMessage(e));
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-neutral-700">PNG ダウンロード</h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handlePc}
          disabled={busy !== null}
          className="flex-1 rounded-md bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
        >
          {busy === "pc" ? "生成中..." : `PC 用 PNG（${PC_SIZE.width}×${PC_SIZE.height}）`}
        </button>
        <button
          type="button"
          onClick={handleMobile}
          disabled={busy !== null}
          className="flex-1 rounded-md bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
        >
          {busy === "mobile"
            ? "生成中..."
            : `スマホ用 PNG（${MOBILE_SIZE.width}×${MOBILE_SIZE.height}）`}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-600">
          ダウンロードに失敗しました：{error}
          <br />
          画像 URL の CORS が原因の場合があります。商品画像 URL を変更するか、別のテンプレートでお試しください。
        </p>
      )}
    </section>
  );
}

function timestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    "-" +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function toMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
