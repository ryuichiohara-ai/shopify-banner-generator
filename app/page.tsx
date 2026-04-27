"use client";

import { useRef, useState } from "react";
import type { BannerData, TemplateId } from "@/lib/types";
import { INITIAL_DATA, TEMPLATE_PRESETS } from "@/lib/types";
import InputForm from "@/components/InputForm";
import PreviewArea from "@/components/PreviewArea";
import DownloadArea from "@/components/DownloadArea";

export default function Home() {
  const [data, setData] = useState<BannerData>(INITIAL_DATA);
  const [template, setTemplate] = useState<TemplateId>("simple");
  const pcRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  function handleTemplateChange(next: TemplateId) {
    setTemplate(next);
    // テンプレート切り替え時：テキスト系フィールドをプリセットで上書き
    // backgroundImageUrl / imageUrl / ctaSize / customBgPreset は引き継ぐ
    const preset = TEMPLATE_PRESETS[next];
    setData((prev) => ({
      ...prev,
      ...preset,
    }));
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-5">
          <h1 className="text-xl font-bold tracking-tight">
            Shopify ポップアップバナー ジェネレーター
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            商品 URL を入力するだけで、PC / スマホ用のバナー画像を作成できます。
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 左：入力 */}
          <div>
            <InputForm
              data={data}
              onChange={setData}
              template={template}
              onTemplateChange={handleTemplateChange}
            />
          </div>

          {/* 右：プレビュー + ダウンロード */}
          <div className="flex flex-col gap-6">
            <PreviewArea
              data={data}
              template={template}
              pcRef={pcRef}
              mobileRef={mobileRef}
            />
            <DownloadArea pcRef={pcRef} mobileRef={mobileRef} template={template} />
          </div>
        </div>
      </main>
    </div>
  );
}
