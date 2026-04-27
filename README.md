# Shopify ポップアップバナー ジェネレーター

Shopify の商品 URL を入力するだけで、ポップアップ用バナー画像（PC / スマホ）を自動生成できる Web アプリです。

- **PC 用**：1080 × 1080 px
- **スマホ用**：1280 × 320 px

3 種類のテンプレート（シンプル / セール訴求 / ギフト訴求）を切り替えて、PNG でダウンロードできます。

## 使用技術

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS v4
- [html2canvas-pro](https://www.npmjs.com/package/html2canvas-pro)（モダン CSS 対応の html2canvas フォーク）
- [@imgly/background-removal](https://www.npmjs.com/package/@imgly/background-removal)（ブラウザ内で動く背景透過ライブラリ）

## ローカル起動方法

```bash
cd shopify-banner-generator
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

本番ビルドする場合：

```bash
npm run build
npm run start
```

## 使い方

1. **商品 URL の入力**
   - Shopify の商品ページ URL（例：`https://example-store.com/products/sample-product`）を入力して「商品情報を取得」を押す
   - 内部では URL の末尾に `.json` を付けてサーバーサイドで取得（`/api/product`）
   - 取得できると 商品名・価格・商品画像 URL が自動入力される
   - 取得失敗時もエラーにせず、手動入力に切り替え可能

2. **手動入力**
   - 商品名 / 商品画像 URL / 商品価格 / メインコピー / サブコピー / CTA 文言を入力
   - 入力すると右側のプレビューが即時更新される

3. **背景透過（任意）**
   - 商品画像 URL の右にある「✂︎ 背景透過」ボタンを押すと、ブラウザ内で AI モデル（ONNX）が走り、商品画像の背景を切り抜きます
   - **初回のみ数十 MB のモデルファイルを CDN からダウンロード**します（IndexedDB にキャッシュされるので 2 回目以降は早い）
   - 透過画像は `blob:` URL として `imageUrl` に置き換わり、プレビューと PNG にそのまま反映されます

4. **背景画像アップロード（任意）**
   - 「背景画像」セクションでローカルファイルを選択するとバナー全体の背景に敷かれます
   - 文字可読性のため自動で **10% の黒オーバーレイ**が乗ります
   - 「解除」ボタンで元のテンプレ背景に戻せます
   - ファイルはブラウザ内のみで処理されサーバーには送られません（`URL.createObjectURL` で blob 化）

5. **CTA サイズの調整**
   - 「CTA サイズ」セクションで S / M / L を切替
   - PC バナー / スマホバナーそれぞれで適切なサイズマップが当たります

6. **テンプレートの切り替え（全 6 種）**
   - **商品プロモ系**
     - シンプル：白背景・万能
     - セール訴求：赤系・期間限定向け
     - ギフト訴求：パステル・プレゼント向け
   - **獲得系（リード獲得）** — 商品画像は使わず、CSS で描いたアイコン + 装飾で構成
     - 会員登録：ネイビー × ゴールド + ギフトボックス
     - メルマガ登録：ライトブルー + 封筒アイコン
     - LINEお友達：LINE グリーン + 吹き出しアイコン

6. **PNG ダウンロード**
   - 「PC 用 PNG」または「スマホ用 PNG」ボタンを押すと、実寸サイズの PNG が保存される
   - ファイル名：`banner-{pc|mobile}-{template}-{yyyymmdd-hhmmss}.png`
   - キャプチャ前に `document.fonts.ready` を待つので、Web フォント未ロード時の Times フォールバック事故は起きません

## ファイル構成

```
shopify-banner-generator/
├── app/
│   ├── api/
│   │   ├── product/route.ts        Shopify .json 取得プロキシ
│   │   └── image-proxy/route.ts    画像 CORS 回避プロキシ
│   ├── page.tsx                    1ページ完結のメイン UI
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── InputForm.tsx
│   ├── PreviewArea.tsx
│   ├── DownloadArea.tsx
│   ├── PCBanner.tsx                1080×1080 ラッパー
│   ├── MobileBanner.tsx            1280×320 ラッパー
│   └── templates/
│       ├── BackgroundLayer.tsx        全テンプレ共通の背景画像 + 10% オーバーレイ
│       ├── simple/{PCSimple,MobileSimple}.tsx
│       ├── sale/{PCSale,MobileSale}.tsx
│       ├── gift/{PCGift,MobileGift}.tsx
│       ├── member/{PCMember,MobileMember}.tsx
│       ├── newsletter/{PCNewsletter,MobileNewsletter}.tsx
│       └── line/{PCLine,MobileLine}.tsx
├── lib/
│   ├── types.ts                    型定義 + 初期値 + サイズ定数 + CTA サイズマップ
│   ├── fetchProduct.ts             /api/product 呼び出し
│   ├── downloadBanner.ts           html2canvas-pro ラッパー
│   └── removeBackground.ts         @imgly/background-removal の薄いラッパー
└── public/
    └── placeholder.svg             商品画像未指定時のプレースホルダ
```

## 注意点

### Shopify `.json` 取得について

- 多くの Shopify ストアではデフォルトで有効ですが、ストアオーナーが無効化している場合や非公開商品では取得できません
- 取得失敗時はエラーにせず、ユーザーが手動入力できる UI に倒しています

### 画像 CORS について

- html2canvas は外部画像をキャプチャする際に CORS が必要
- Shopify CDN（`cdn.shopify.com`）は通常 `Access-Control-Allow-Origin: *` を返すため動作する想定
- もし CORS エラーが出る場合は、`/api/image-proxy?url=...` 経由で読み込む退避路を用意しています

### バナー描画について

- バナーテンプレ本体は **インラインスタイルのみ**で組んでいます（Tailwind を使わない）
- 理由：Tailwind v4 の `@layer utilities` 経由のスタイルが html2canvas-pro のキャプチャ時に拾われずレイアウトが崩れるケースがあるため
- フォームや UI 周りは Tailwind のままで、バナー本体だけ別ルートにしています

### 背景透過について

- 完全クライアントサイド処理（API キー不要）。プライバシー上の懸念なし
- 初回のみ ONNX モデル（〜数十 MB）が CDN から DL されます
- 1 枚あたりの処理時間：5〜15 秒（端末性能に依存）
- 透過後の画像は `blob:` URL なので、ブラウザを閉じると消えます

### セキュリティ

- API ルートでは入力 URL を `new URL()` でパース、http/https のみ許可、内部 IP（10.x / 127.x / 192.168.x など）を弾く簡易 SSRF 対策を実装

## テンプレートを増やす方法

1. `components/templates/<新テンプレ名>/` に `PC<NewTemplate>.tsx` と `Mobile<NewTemplate>.tsx` を作成
2. `lib/types.ts` の `TemplateId` と `TEMPLATES` 配列に追加
3. `components/PCBanner.tsx` と `components/MobileBanner.tsx` の switch に分岐を追加
