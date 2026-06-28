/**
 * Download catalog product images into apps/web/public/uploads for Amplify static hosting.
 * WordPress is retired and S3/CloudFront bucket is empty (403) — this fixes images on deploy.
 *
 * Sources tried per file:
 *  1. Already on disk under public/uploads
 *  2. Amazon m.media-amazon.com (imgi_* filenames from WooCommerce imports)
 *  3. WORDPRESS_ORIGIN or WP_HOST + Host header (legacy LiteSpeed server)
 *  4. Generic Halloween placeholder (Unsplash) for remaining files
 *
 * Usage:
 *   npm run sync:public-uploads
 *   WORDPRESS_ORIGIN=http://157.66.191.12 npm run sync:public-uploads
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "fs";
import { dirname, join, basename } from "path";
import {
  amazonImageIdFromFilename,
  amazonMediaUrl,
  uploadsRelativePath,
} from "@halloweenready/shared";

const CATALOG_PATH = join(process.cwd(), "scripts/data/halloweenready-catalog.json");
const PUBLIC_ROOT = join(process.cwd(), "apps/web/public/uploads");
const PLACEHOLDER_PATH = join(PUBLIC_ROOT, "_placeholder.jpg");

const WP_ORIGIN = process.env.WORDPRESS_ORIGIN?.replace(/\/$/, "") ?? "http://157.66.191.12";
const WP_HOST = process.env.WORDPRESS_HOST ?? "halloweenready.com";

async function fetchBuffer(url: string, headers?: Record<string, string>): Promise<Buffer | null> {
  try {
    const res = await fetch(url, { headers, redirect: "follow" });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "";
    if (!type.startsWith("image/")) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function downloadPlaceholder(): Promise<void> {
  if (existsSync(PLACEHOLDER_PATH)) return;
  mkdirSync(dirname(PLACEHOLDER_PATH), { recursive: true });
  const sources = [
    "https://images.unsplash.com/photo-1509555859105-59ef3736c1c3?w=800&h=800&fit=crop",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Pumpkin_%28cropped%29.jpg/800px-Pumpkin_%28cropped%29.jpg",
  ];
  for (const url of sources) {
    const buf = await fetchBuffer(url);
    if (buf) {
      writeFileSync(PLACEHOLDER_PATH, buf);
      console.log("  ✓ placeholder saved");
      return;
    }
  }
  // 1×1 orange PNG fallback
  const minimal = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64"
  );
  writeFileSync(PLACEHOLDER_PATH, minimal);
  console.log("  ✓ minimal placeholder saved");
}

async function resolveImageBytes(relativePath: string): Promise<{ buf: Buffer; source: string } | null> {
  const dest = join(PUBLIC_ROOT, relativePath);
  if (existsSync(dest)) return { buf: readFileSync(dest), source: "existing" };

  const filename = basename(relativePath);
  const amazonId = amazonImageIdFromFilename(filename);
  if (amazonId) {
    for (const size of ["SL1500", "SL1000", "SX679", "AC_SL1001"]) {
      const buf = await fetchBuffer(amazonMediaUrl(amazonId, size));
      if (buf) return { buf, source: `amazon:${amazonId}` };
    }
  }

  const wpUrl = `${WP_ORIGIN}/wp-content/uploads/${relativePath}`;
  let buf = await fetchBuffer(wpUrl, { Host: WP_HOST });
  if (buf) return { buf, source: "wordpress" };

  if (existsSync(PLACEHOLDER_PATH)) {
    return { buf: readFileSync(PLACEHOLDER_PATH), source: "placeholder" };
  }

  const minimal = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64"
  );
  return { buf: minimal, source: "placeholder-minimal" };
}

async function main() {
  if (!existsSync(CATALOG_PATH)) {
    console.error(`Missing ${CATALOG_PATH}`);
    process.exit(1);
  }

  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf-8")) as {
    products: { slug: string; images?: string[] }[];
  };

  const paths = new Set<string>();
  for (const p of catalog.products) {
    for (const img of p.images ?? []) {
      const rel = uploadsRelativePath(img);
      if (rel) paths.add(rel);
    }
  }

  console.log(`Syncing ${paths.size} product images → ${PUBLIC_ROOT}`);
  await downloadPlaceholder();

  let ok = 0;
  let failed = 0;
  const bySource: Record<string, number> = {};

  for (const rel of paths) {
    const dest = join(PUBLIC_ROOT, rel);
    mkdirSync(dirname(dest), { recursive: true });

    const result = await resolveImageBytes(rel);
    if (!result) {
      console.warn(`  ✗ ${rel}`);
      failed++;
      continue;
    }

    if (result.source !== "existing") {
      writeFileSync(dest, result.buf);
    }
    bySource[result.source.startsWith("amazon") ? "amazon" : result.source] =
      (bySource[result.source.startsWith("amazon") ? "amazon" : result.source] ?? 0) + 1;
    ok++;
  }

  console.log("\nDone.");
  console.log(`  OK: ${ok}, failed: ${failed}`);
  console.log("  Sources:", bySource);
  console.log("\nCommit apps/web/public/uploads/ and redeploy Amplify.");
  console.log("Keep NEXT_PUBLIC_IMAGE_MODE=static (default) until S3 is populated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
