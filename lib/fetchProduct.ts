export type FetchProductResult =
  | {
      ok: true;
      product: {
        title: string;
        price: string; // 整形済み（"¥5,500" など）
        imageUrl: string;
        description: string;
      };
    }
  | { ok: false; reason: string };

/**
 * /api/product 経由で Shopify の商品情報を取得する。
 * サーバー側で .json エンドポイントを叩くので CORS 制約を回避できる。
 */
export async function fetchProduct(url: string): Promise<FetchProductResult> {
  const trimmed = url.trim();
  if (!trimmed) return { ok: false, reason: "URL が空です" };

  try {
    const res = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: trimmed }),
    });
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    const json = (await res.json()) as FetchProductResult;
    return json;
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "通信エラー" };
  }
}
