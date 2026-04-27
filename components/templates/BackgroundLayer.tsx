type Props = {
  /** ユーザーがアップロードした背景画像（blob URL）。空なら何も描画しない */
  url?: string;
};

/**
 * 全テンプレ共通の「背景画像」レイヤー。
 * 各テンプレの最外殻 div の直下（z-index: 0）に配置する想定。
 * 背景画像が未設定なら null を返す。オーバーレイなし。
 */
export default function BackgroundLayer({ url }: Props) {
  if (!url) return null;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={url}
      alt=""
      crossOrigin="anonymous"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      }}
    />
  );
}
