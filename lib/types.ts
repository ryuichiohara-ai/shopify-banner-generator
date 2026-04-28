export type TemplateId = "simple" | "sale" | "gift" | "member" | "newsletter" | "line" | "custom";

export type CtaSize = "sm" | "md" | "lg";

export type CustomTextAlign = "left" | "center" | "right";

export type BannerData = {
  productName: string;
  price: string;
  imageUrl: string;
  mainCopy: string;
  subCopy: string;
  cta: string;
  ctaSize: CtaSize;
  /** ユーザーがアップロードした背景画像（blob URL）。空なら未設定。 */
  backgroundImageUrl: string;
  /** カスタムテンプレートで使う背景プリセット ID */
  customBgPreset: string;
  /** 商品画像を表示するか（デフォルト: true） */
  showProductImage: boolean;
  /** カスタムテンプレートのテキスト位置揃え */
  customTextAlign: CustomTextAlign;
  /** カスタムテンプレートのフォントプリセット ID */
  customFontPreset: string;
  /** LINE テンプレートのメインテキスト色 */
  lineTextColor: string;
  /** LINE テンプレートのアクセント（価格）テキスト色 */
  lineAccentColor: string;
  /** LINE テンプレートのバブル内アイコン色 */
  lineIconColor: string;
  /** メインコピーのテキスト色（空文字=テンプレートデフォルト色を使用） */
  mainCopyColor: string;
  /** サブコピーのテキスト色（空文字=テンプレートデフォルト色を使用） */
  subCopyColor: string;
  /** CTA文言のテキスト色（空文字=テンプレートデフォルト色を使用） */
  ctaColor: string;
  /** メインコピーのフォントサイズ倍率（1.0 = 100%）*/
  mainCopySizeScale: number;
  /** サブコピーのフォントサイズ倍率（1.0 = 100%）*/
  subCopySizeScale: number;
  /** CTA文言のフォントサイズ倍率（1.0 = 100%）*/
  ctaSizeScale: number;
  /** カスタムテンプレートのテキストブロック X 位置（%単位）*/
  customTextX: number;
  /** カスタムテンプレートのテキストブロック Y 位置（%単位）*/
  customTextY: number;
  /** LINE テンプレートのブランドロゴ URL（空文字=HandshakeBubble SVG を表示）*/
  lineBrandLogoUrl: string;
};

export const INITIAL_DATA: BannerData = {
  productName: "季節限定フラワーギフト",
  price: "¥5,500",
  imageUrl: "",
  mainCopy: "今だけの特別ギフト",
  subCopy: "大切な人へ、季節の花を贈りませんか？",
  cta: "詳しく見る",
  ctaSize: "md",
  backgroundImageUrl: "",
  customBgPreset: "navy",
  showProductImage: true,
  customTextAlign: "center",
  customFontPreset: "mixed",
  lineTextColor: "#ffffff",
  lineAccentColor: "#fff59d",
  lineIconColor: "#06C755",
  mainCopyColor: "",
  subCopyColor: "",
  ctaColor: "",
  mainCopySizeScale: 1.0,
  subCopySizeScale: 1.0,
  ctaSizeScale: 1.0,
  customTextX: 4,
  customTextY: 50,
  lineBrandLogoUrl: "",
};

export const PLACEHOLDER = {
  productName: "商品名サンプル",
  cta: "詳しく見る",
  imageUrl: "/placeholder.svg",
} as const;

export const TEMPLATES: { id: TemplateId; label: string; description: string }[] = [
  { id: "simple", label: "シンプル", description: "白背景・万能" },
  { id: "sale", label: "セール訴求", description: "割引・期間限定向け" },
  { id: "gift", label: "ギフト訴求", description: "プレゼント感の演出" },
  { id: "member", label: "会員登録", description: "ポイント特典訴求" },
  { id: "newsletter", label: "メルマガ登録", description: "情報配信の訴求" },
  { id: "line", label: "LINEお友達", description: "LINE 友だち追加の訴求" },
  { id: "custom", label: "カスタム", description: "自由にデザイン" },
];

/** 商品画像を使わない獲得系テンプレ */
export const LEAD_GEN_TEMPLATES: TemplateId[] = ["member", "newsletter", "line"];

/** カスタムテンプレートの背景プリセット */
export const CUSTOM_BG_PRESETS: {
  id: string;
  label: string;
  background: string;
  textColor: string;
}[] = [
  { id: "white", label: "ホワイト", background: "#ffffff", textColor: "#1a1a2e" },
  { id: "black", label: "ブラック", background: "#0f0f0f", textColor: "#ffffff" },
  { id: "navy", label: "ネイビー", background: "#1e3a5f", textColor: "#ffffff" },
  {
    id: "rose",
    label: "ローズ",
    background: "linear-gradient(135deg,#ff6b6b 0%,#feca57 100%)",
    textColor: "#ffffff",
  },
  {
    id: "sky",
    label: "スカイ",
    background: "linear-gradient(135deg,#74b9ff 0%,#0984e3 100%)",
    textColor: "#ffffff",
  },
  {
    id: "mint",
    label: "ミント",
    background: "linear-gradient(135deg,#00b894 0%,#00cec9 100%)",
    textColor: "#ffffff",
  },
  {
    id: "sunset",
    label: "サンセット",
    background: "linear-gradient(135deg,#fd79a8 0%,#e17055 100%)",
    textColor: "#ffffff",
  },
  {
    id: "gold",
    label: "ゴールド",
    background: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
    textColor: "#1a1a2e",
  },
  {
    id: "purple",
    label: "パープル",
    background: "linear-gradient(135deg,#a29bfe 0%,#6c5ce7 100%)",
    textColor: "#ffffff",
  },
  {
    id: "forest",
    label: "フォレスト",
    background: "linear-gradient(135deg,#2d3436 0%,#00b894 100%)",
    textColor: "#ffffff",
  },
];

/** テンプレート切り替え時に適用するサンプルデータ */
export const TEMPLATE_PRESETS: Record<TemplateId, Partial<BannerData>> = {
  simple: {
    productName: "季節限定フラワーギフト",
    price: "¥5,500",
    mainCopy: "今だけの特別ギフト",
    subCopy: "大切な人へ、季節の花を贈りませんか？",
    cta: "詳しく見る",
  },
  sale: {
    productName: "夏の人気アイテム",
    price: "¥3,980（税込）",
    mainCopy: "今だけ 30% OFF",
    subCopy: "期間限定セール実施中！お見逃しなく",
    cta: "今すぐ購入",
  },
  gift: {
    productName: "プレミアムギフトセット",
    price: "¥8,800",
    mainCopy: "贈り物に最適な一品",
    subCopy: "大切な方への特別なギフト",
    cta: "詳しく見る",
  },
  member: {
    productName: "公式メンバーズクラブ",
    price: "+500P",
    mainCopy: "会員登録で 500 ポイントプレゼント",
    subCopy: "今すぐ登録してお得な特典をゲット！",
    cta: "無料で登録する",
  },
  newsletter: {
    productName: "公式メールマガジン",
    price: "10% OFF",
    mainCopy: "メルマガ登録で 10% OFF クーポン配布中",
    subCopy: "週 1 回、お得な情報をお届けします",
    cta: "無料で登録する",
  },
  line: {
    productName: "公式 LINE アカウント",
    price: "500円OFF",
    mainCopy: "友だち追加で 500 円 OFF クーポン",
    subCopy: "今すぐ追加してクーポンをゲット！",
    cta: "友だち追加する",
  },
  custom: {
    productName: "",
    price: "",
    mainCopy: "あなたのメッセージをここに",
    subCopy: "サブテキストを入力してください",
    cta: "詳しく見る",
  },
};

/** カスタムテンプレートのフォントプリセット */
export const CUSTOM_FONT_PRESETS: {
  id: string;
  label: string;
  titleFamily: string;
  bodyFamily: string;
}[] = [
  {
    id: "gothic",
    label: "ゴシック",
    titleFamily:
      '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
    bodyFamily:
      '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
  },
  {
    id: "serif",
    label: "明朝体",
    titleFamily: '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
    bodyFamily: '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
  },
  {
    id: "mixed",
    label: "タイトル明朝",
    titleFamily: '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
    bodyFamily:
      '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
  },
];

export const CTA_SIZES: { id: CtaSize; label: string }[] = [
  { id: "sm", label: "S（小）" },
  { id: "md", label: "M（中）" },
  { id: "lg", label: "L（大）" },
];

export const PC_SIZE = { width: 1080, height: 1080 } as const;
export const MOBILE_SIZE = { width: 1280, height: 320 } as const;

/** PC バナー用 CTA サイズマップ */
export const CTA_SIZE_MAP_PC: Record<
  CtaSize,
  { fontSize: number; paddingX: number; paddingY: number }
> = {
  sm: { fontSize: 28, paddingX: 32, paddingY: 14 },
  md: { fontSize: 36, paddingX: 48, paddingY: 20 },
  lg: { fontSize: 48, paddingX: 64, paddingY: 28 },
};

/** スマホバナー用 CTA サイズマップ */
export const CTA_SIZE_MAP_MOBILE: Record<
  CtaSize,
  { fontSize: number; paddingX: number; paddingY: number }
> = {
  sm: { fontSize: 22, paddingX: 24, paddingY: 12 },
  md: { fontSize: 28, paddingX: 32, paddingY: 16 },
  lg: { fontSize: 36, paddingX: 44, paddingY: 22 },
};

/** バナー描画用の共通フォントスタック（日本語が崩れないようシステムフォント優先） */
export const BANNER_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif';
export const BANNER_SERIF_FAMILY =
  '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';
