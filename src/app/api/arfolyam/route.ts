import { fetchMnbEur } from "@/lib/mnb";
import type { EurQuote } from "@/lib/money";

const TTL_MS = 60 * 60 * 1000;

let cache: { at: number; quote: EurQuote } | null = null;

export async function GET(): Promise<Response> {
  if (cache && Date.now() - cache.at < TTL_MS) {
    return Response.json(cache.quote, { headers: { "Cache-Control": "public, max-age=3600" } });
  }
  const quote = await fetchMnbEur();
  if (!quote) {
    if (cache) return Response.json(cache.quote);
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
  cache = { at: Date.now(), quote };
  return Response.json(quote, { headers: { "Cache-Control": "public, max-age=3600" } });
}
