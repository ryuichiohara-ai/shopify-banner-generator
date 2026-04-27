import { NextResponse } from "next/server";

/**
 * Shopify の商品 URL から商品情報を取得するプロキシ。
 * - URL の末尾に .json を付けて取得（既に付いていればそのまま）
 * - 取得できないときは ok: false を返す（クライアントは手動入力に倒す想定）
 */
export async function POST(request: Request) {
  let body: { url?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "リクエスト形式が不正です" });
  }

  const raw = (body.url ?? "").trim();
  if (!raw) {
    return NextResponse.json({ ok: false, reason: "URL が空です" });
  }

  // ホスト検証（http/https のみ、内部 IP を弾く簡易 SSRF 対策）
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return NextResponse.json({ ok: false, reason: "URL の形式が不正です" });
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return NextResponse.json({ ok: false, reason: "http/https 以外は許可されていません" });
  }
  if (isInternalHost(parsed.hostname)) {
    return NextResponse.json({ ok: false, reason: "内部ネットワークの URL は許可されていません" });
  }

  // .json を末尾に付加
  let jsonUrl = raw.split("?")[0].split("#")[0];
  if (!jsonUrl.endsWith(".json")) {
    jsonUrl = jsonUrl.replace(/\/$/, "") + ".json";
  }

  try {
    const res = await fetch(jsonUrl, {
      headers: { Accept: "application/json" },
      // Shopify の .json は public エンドポイント。Next の fetch はサーバー側なので CORS は無関係
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, reason: `Shopify から ${res.status} が返されました` });
    }
    const data = await res.json();
    const product = data?.product;
    if (!product) {
      return NextResponse.json({ ok: false, reason: "想定した形式の商品データではありません" });
    }

    const title: string = product.title ?? "";
    const rawPrice: string | undefined = product.variants?.[0]?.price;
    const imageUrl: string = product.images?.[0]?.src ?? product.image?.src ?? "";
    const description: string = stripHtml(product.body_html ?? "");

    return NextResponse.json({
      ok: true,
      product: {
        title,
        price: formatJpy(rawPrice),
        imageUrl,
        description,
      },
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      reason: e instanceof Error ? e.message : "fetch に失敗しました",
    });
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

function formatJpy(raw: string | undefined): string {
  if (!raw) return "";
  // Shopify の price は "5500.00" 形式の文字列が多い
  const num = Number(raw);
  if (Number.isFinite(num)) {
    return "¥" + Math.round(num).toLocaleString("ja-JP");
  }
  return raw;
}

function isInternalHost(host: string): boolean {
  if (!host) return true;
  const lower = host.toLowerCase();
  if (lower === "localhost" || lower === "0.0.0.0") return true;
  if (lower === "::1") return true;
  // IPv4
  const m = lower.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [, a, b] = m.map(Number);
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }
  return false;
}
