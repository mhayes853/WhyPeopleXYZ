import { buildRss, collectRssItems } from "#lib/server/rss.ts";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = () =>
  new Response(buildRss(collectRssItems()), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
