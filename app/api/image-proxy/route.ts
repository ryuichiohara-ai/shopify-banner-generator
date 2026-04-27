import { NextResponse } from "next/server";

/**
 * 画像の CORS 回避用プロキシ。
 * /api/image-proxy?url=<画像URL> でストリーミングする。
 * html2canvas のキャプチャ時に直リンクで CORS エラーになる場合の保険。
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");
  if (!target) return new NextResponse("missing url", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new NextResponse("invalid url", { status: 400 });
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return new NextResponse("unsupported protocol", { status: 400 });
  }
  if (isInternalHost(parsed.hostname)) {
    return new NextResponse("internal host blocked", { status: 400 });
  }

  try {
    const upstream = await fetch(parsed.toString(), { cache: "no-store" });
    if (!upstream.ok || !upstream.body) {
      return new NextResponse("upstream error", { status: 502 });
    }
    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // 同一オリジン経由で返すので CORS ヘッダは不要だが、明示しておく
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (e) {
    return new NextResponse(
      "proxy failed: " + (e instanceof Error ? e.message : "unknown"),
      { status: 500 },
    );
  }
}

function isInternalHost(host: string): boolean {
  if (!host) return true;
  const lower = host.toLowerCase();
  if (lower === "localhost" || lower === "0.0.0.0" || lower === "::1") return true;
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
