import { buildHalloweenCollectionEmailHtml } from "@halloweenready/shared";

/** Browser preview of the reusable Halloween collection mailer (noindex). */
export function GET() {
  return new Response(buildHalloweenCollectionEmailHtml(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=60",
    },
  });
}
