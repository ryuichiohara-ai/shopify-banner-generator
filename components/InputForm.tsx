"use client";

import { useRef, useState } from "react";
import type { BannerData, TemplateId, CtaSize, CustomTextAlign } from "@/lib/types";
import { TEMPLATES, CTA_SIZES, CUSTOM_BG_PRESETS, CUSTOM_FONT_PRESETS, LEAD_GEN_TEMPLATES } from "@/lib/types";
import { fetchProduct } from "@/lib/fetchProduct";
import { removeImageBackground } from "@/lib/removeBackground";

type Props = {
  data: BannerData;
  onChange: (next: BannerData) => void;
  template: TemplateId;
  onTemplateChange: (next: TemplateId) => void;
};

export default function InputForm({ data, onChange, template, onTemplateChange }: Props) {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [fetchInfo, setFetchInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bgRemoving, setBgRemoving] = useState(false);
  const [bgInfo, setBgInfo] = useState<string | null>(null);
  const [bgFileName, setBgFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function update<K extends keyof BannerData>(key: K, value: BannerData[K]) {
    onChange({ ...data, [key]: value });
  }

  async function handleFetch() {
    setUrlError(null);
    setFetchInfo(null);
    if (!url.trim()) {
      setUrlError("商品URLを入力してください");
      return;
    }
    setLoading(true);
    const result = await fetchProduct(url);
    setLoading(false);
    if (result.ok) {
      onChange({
        ...data,
        productName: result.product.title || data.productName,
        price: result.product.price || data.price,
        imageUrl: result.product.imageUrl || data.imageUrl,
      });
      setFetchInfo("商品情報を反映しました");
    } else {
      setFetchInfo(`自動取得できませんでした（${result.reason}）。手動で入力してください`);
    }
  }

  async function handleRemoveBackground() {
    setBgInfo(null);
    if (!data.imageUrl) {
      setBgInfo("先に商品画像 URL を設定してください");
      return;
    }
    setBgRemoving(true);
    try {
      const transparentUrl = await removeImageBackground(data.imageUrl);
      update("imageUrl", transparentUrl);
      setBgInfo("背景を透過しました ✨");
    } catch (e) {
      setBgInfo(
        "背景透過に失敗しました：" + (e instanceof Error ? e.message : "不明なエラー"),
      );
    } finally {
      setBgRemoving(false);
    }
  }

  function handleBgFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // 古い blob URL をメモリリークしないよう revoke
    if (data.backgroundImageUrl?.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(data.backgroundImageUrl);
      } catch {
        // ignore
      }
    }
    const blobUrl = URL.createObjectURL(file);
    setBgFileName(file.name);
    update("backgroundImageUrl", blobUrl);
    // 同じファイルを再選択できるように value をリセット
    e.target.value = "";
  }

  function handleBgClear() {
    if (data.backgroundImageUrl?.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(data.backgroundImageUrl);
      } catch {
        // ignore
      }
    }
    setBgFileName(null);
    update("backgroundImageUrl", "");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 商品 URL */}
      <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-neutral-700">Shopify 商品 URL</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example-store.com/products/sample-product"
            className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          />
          <button
            type="button"
            onClick={handleFetch}
            disabled={loading}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
          >
            {loading ? "取得中..." : "商品情報を取得"}
          </button>
        </div>
        {urlError && <p className="mt-2 text-sm text-red-600">{urlError}</p>}
        {fetchInfo && <p className="mt-2 text-sm text-neutral-600">{fetchInfo}</p>}
      </section>

      {/* テンプレート選択 */}
      <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-neutral-700">デザインテンプレート</h2>
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((t) => {
            const active = template === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onTemplateChange(t.id)}
                className={
                  "flex flex-col items-start rounded-md border px-3 py-2 text-left transition " +
                  (active
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500")
                }
              >
                <span className="text-sm font-semibold">{t.label}</span>
                <span className={"text-xs " + (active ? "text-neutral-200" : "text-neutral-500")}>
                  {t.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* カスタムテンプレート専用：デザイン設定 */}
      {template === "custom" && (
        <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">カスタム設定</h2>

          {/* 背景カラー */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium text-neutral-600">背景カラー</p>
            <div className="grid grid-cols-5 gap-2">
              {CUSTOM_BG_PRESETS.map((preset) => {
                const active = data.customBgPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    title={preset.label}
                    onClick={() => update("customBgPreset", preset.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <span
                      className={
                        "block h-10 w-full rounded-md transition " +
                        (active ? "ring-2 ring-neutral-900 ring-offset-2" : "hover:opacity-80")
                      }
                      style={{ background: preset.background }}
                    />
                    <span className={"text-xs " + (active ? "font-semibold text-neutral-900" : "text-neutral-500")}>
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-1 text-xs text-neutral-500">背景画像をアップロードすると画像が優先されます。</p>
          </div>

          {/* テキスト位置 */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium text-neutral-600">テキスト位置</p>
            <div className="grid grid-cols-3 gap-2">
              {(["left", "center", "right"] as CustomTextAlign[]).map((align) => {
                const labels: Record<CustomTextAlign, string> = { left: "← 左揃え", center: "中央揃え", right: "右揃え →" };
                const active = (data.customTextAlign ?? "center") === align;
                return (
                  <button
                    key={align}
                    type="button"
                    onClick={() => update("customTextAlign", align)}
                    className={
                      "rounded-md border px-3 py-2 text-sm font-medium transition " +
                      (active
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500")
                    }
                  >
                    {labels[align]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* フォント */}
          <div>
            <p className="mb-2 text-xs font-medium text-neutral-600">フォント</p>
            <div className="grid grid-cols-3 gap-2">
              {CUSTOM_FONT_PRESETS.map((fp) => {
                const active = (data.customFontPreset ?? "mixed") === fp.id;
                return (
                  <button
                    key={fp.id}
                    type="button"
                    onClick={() => update("customFontPreset", fp.id)}
                    className={
                      "rounded-md border px-3 py-2 text-sm font-medium transition " +
                      (active
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500")
                    }
                  >
                    {fp.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 各種入力 */}
      <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-neutral-700">バナー内容</h2>
        <div className="flex flex-col gap-4">
          <Field label="商品名">
            <input
              type="text"
              value={data.productName}
              onChange={(e) => update("productName", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
              placeholder="商品名サンプル"
            />
          </Field>

          <Field label="商品価格">
            <input
              type="text"
              value={data.price}
              onChange={(e) => update("price", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
              placeholder="¥5,500"
            />
          </Field>

          <Field label="商品画像 URL">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="url"
                value={data.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
                className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
                placeholder="https://cdn.shopify.com/.../image.jpg"
              />
              <button
                type="button"
                onClick={handleRemoveBackground}
                disabled={bgRemoving || !data.imageUrl}
                className="rounded-md border border-neutral-900 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 disabled:opacity-50"
                title="商品画像の背景を透過にします（初回はモデルダウンロードに少し時間がかかります）"
              >
                {bgRemoving ? "処理中..." : "✂︎ 背景透過"}
              </button>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              空のままだとプレースホルダーが表示されます。背景透過は商品画像をワンクリックで切り抜き
              （初回のみ ONNX モデルをブラウザに DL します）。
            </p>
            {bgInfo && (
              <p
                className={
                  "mt-1 text-xs " +
                  (bgInfo.includes("失敗") ? "text-red-600" : "text-emerald-700")
                }
              >
                {bgInfo}
              </p>
            )}
            {/* 商品画像の表示/非表示トグル（獲得系テンプレは画像を使わないので非表示） */}
            {!LEAD_GEN_TEMPLATES.includes(template) && (
              <label className="mt-2 flex cursor-pointer items-center gap-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={data.showProductImage !== false}
                    onChange={(e) => update("showProductImage", e.target.checked)}
                  />
                  <div
                    className={
                      "h-5 w-9 rounded-full transition-colors " +
                      (data.showProductImage !== false ? "bg-neutral-900" : "bg-neutral-300")
                    }
                  />
                  <div
                    className={
                      "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform " +
                      (data.showProductImage !== false ? "translate-x-4" : "translate-x-0.5")
                    }
                  />
                </div>
                <span className="text-xs font-medium text-neutral-700">商品画像を表示する</span>
              </label>
            )}
          </Field>

          {/* 背景画像アップロード */}
          <Field label="背景画像（任意）">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleBgFileSelected}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md border border-neutral-900 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100"
              >
                🖼 ファイルを選択
              </button>
              <button
                type="button"
                onClick={handleBgClear}
                disabled={!data.backgroundImageUrl}
                className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-50"
              >
                解除
              </button>
              <span className="self-center text-xs text-neutral-500 truncate">
                {data.backgroundImageUrl ? bgFileName ?? "（設定済み）" : "未設定"}
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              アップロード画像はバナー全体の背面に敷かれ、文字可読性のため 10% の黒オーバーレイが乗ります。ファイルはブラウザ内のみで処理されサーバーには送られません。
            </p>
          </Field>

          <Field label="メインコピー">
            <input
              type="text"
              value={data.mainCopy}
              onChange={(e) => update("mainCopy", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
              placeholder="今だけの特別ギフト"
            />
          </Field>

          <Field label="サブコピー">
            <input
              type="text"
              value={data.subCopy}
              onChange={(e) => update("subCopy", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
              placeholder="大切な人へ、季節の花を贈りませんか？"
            />
          </Field>

          <Field label="CTA 文言">
            <input
              type="text"
              value={data.cta}
              onChange={(e) => update("cta", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
              placeholder="詳しく見る"
            />
          </Field>

          <Field label="CTA サイズ">
            <div className="grid grid-cols-3 gap-2">
              {CTA_SIZES.map((s) => {
                const active = data.ctaSize === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => update("ctaSize", s.id as CtaSize)}
                    className={
                      "rounded-md border px-3 py-2 text-sm font-medium transition " +
                      (active
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500")
                    }
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-neutral-600">{label}</span>
      {children}
    </label>
  );
}
