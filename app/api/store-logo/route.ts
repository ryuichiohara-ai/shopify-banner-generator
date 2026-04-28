import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  try {
    // ストアのトップページURLを正規化（/products/... などを除去）
    const storeUrl = url.replace(/\/(products|collections|pages|blogs)\/.+$/, "").replace(/\/$/, "");
    const origin = new URL(storeUrl).origin;

    const res = await fetch(storeUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BannerGenerator/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return NextResponse.json({ error: `fetch failed: ${res.status}` }, { status: 502 });

    const html = await res.text();

    // og:image を優先して抽出
    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1]) return NextResponse.json({ logoUrl: ogMatch[1] });

    // apple-touch-icon フォールバック
    const appleMatch = html.match(/<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["']([^"']+)["']/i);
    if (appleMatch?.[1]) {
      const iconUrl = appleMatch[1].startsWith("http")
        ? appleMatch[1]
        : `${origin}${appleMatch[1].startsWith("/") ? "" : "/"}${appleMatch[1]}`;
      return NextResponse.json({ logoUrl: iconUrl });
    }

    // Shopify CDN ロゴパターン検索
    const shopifyLogoMatch = html.match(/https?:\/\/cdn\.shopify\.com\/s\/files\/[^"'\s]+(?:logo|brand)[^"'\s]*\.(?:png|jpg|jpeg|svg|webp)/i);
    if (shopifyLogoMatch?.[0]) return NextResponse.json({ logoUrl: shopifyLogoMatch[0] });

    // favicon フォールバック
    const faviconMatch = html.match(/<link[^>]+rel=["'](?:icon|shortcut icon)["'][^>]+href=["']([^"']+)["']/i);
    if (faviconMatch?.[1]) {
      const iconUrl = faviconMatch[1].startsWith("http")
        ? faviconMatch[1]
        : `${origin}${faviconMatch[1].startsWith("/") ? "" : "/"}${faviconMatch[1]}`;
      return NextResponse.json({ logoUrl: iconUrl });
    }

    return NextResponse.json({ error: "logo not found" }, { status: 404 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
