import type { Product } from "@halloweenready/shared";
import { looksLikeHtml, stripHtml } from "./html-text";

type ProductLike = Pick<Product, "name" | "description" | "categorySlug" | "tags"> & {
  slug?: string;
};

function hasChocolateSignal(text: string): boolean {
  return /chocolate|ferrero|hershey|lindor|lindt|kitkat|dairy\s*milk|snicker|candy|treat/i.test(
    text
  );
}

/** Parse explicit chocolate / candy includes from name/description. */
export function parseChocolateInclude(text: string): string | null {
  const patterns: { re: RegExp; label: (n: string) => string }[] = [
    {
      re: /includes\s+(\d+)\s+ferrero\s*rocher\s+chocolates?/i,
      label: (n) => `${n} Ferrero Rocher Chocolates`,
    },
    {
      re: /includes\s+(\d+)\s+(?:small\s+)?hershey'?s?\s+chocolates?/i,
      label: (n) => `${n} small Hershey's chocolates`,
    },
    {
      re: /includes\s+(\d+)\s+lind(?:or|t(?:\s+lindor)?)\s+chocolates?/i,
      label: (n) => `${n} Lindor Chocolates`,
    },
    {
      re: /includes\s+\d+\s+assorted\s+chocolates?/i,
      label: () => "Assorted Chocolates",
    },
    {
      re: /includes\s+\d+\s+chocolates?/i,
      label: () => "Assorted Chocolates",
    },
    {
      re: /with\s+(\d+)\s+(?:small\s+)?hershey'?s?\s+chocolates?/i,
      label: (n) => `${n} small Hershey's chocolates`,
    },
    {
      re: /with\s+(\d+)\s+ferrero\s*rocher\s+chocolates?/i,
      label: (n) => `${n} Ferrero Rocher Chocolates`,
    },
    {
      re: /with\s+(\d+)\s+lind(?:or|t)\s+chocolates?/i,
      label: (n) => `${n} Lindor Chocolates`,
    },
    {
      re: /with\s+\d+\s+assorted\s+chocolates?/i,
      label: () => "Assorted Chocolates",
    },
    {
      re: /with\s+\d+\s+chocolates?/i,
      label: () => "Assorted Chocolates",
    },
  ];

  for (const { re, label } of patterns) {
    const m = text.match(re);
    if (m) return label(m[1] ?? "");
  }

  if (!hasChocolateSignal(text)) return null;

  if (/ferrero/i.test(text)) return "3 Ferrero Rocher Chocolates";
  if (/hershey/i.test(text)) return "2 small Hershey's chocolates";
  if (/lindor|lindt/i.test(text)) return "5 Lindor Chocolates";
  return "Assorted Halloween treats";
}

function categoryIncludeLines(categorySlug: string): string[] {
  switch (categorySlug) {
    case "costumesandaccessories":
      return ["1 Halloween costume or accessory as pictured"];
    case "home-decoration":
      return ["1 Halloween decoration as pictured"];
    case "partysupplier":
      return ["Party supply pack as pictured"];
    case "toysandnovelty":
      return ["1 toy or novelty item as pictured"];
    case "candlesandfragrance":
      return ["1 candle or fragrance item as pictured"];
    case "jewellryandaccessories":
      return ["1 jewelry or accessory item as pictured"];
    case "lifestyleandwearable":
      return ["1 lifestyle / wearable item as pictured"];
    case "printedandpapercrafts":
      return ["1 printed or paper craft item as pictured"];
    default:
      return ["1 Halloween product as pictured"];
  }
}

/** Shown on every product's What's included checklist. */
function shippingIncludeLines(): string[] {
  return [
    "Ships from our USA warehouse",
    "Domestic delivery across all 50 states",
    "Best quality at competitive rates",
  ];
}

function fromHtmlList(description: string): string[] {
  return [...description.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((m) => stripHtml(m[1]!))
    .filter(Boolean);
}

function isMarketingLine(line: string): boolean {
  return /clear what'?s-included|domestic usa shipping|festive packaging|secure checkout|no international customs|stripe|razorpay/i.test(
    line
  );
}

/** Normalize include checklist lines (shared platform helper). */
export function normalizeHamperIncludeLine(line: string): string[] {
  const t = line.replace(/\.$/, "").replace(/\s+/g, " ").trim();
  if (!t || isMarketingLine(t)) return [];
  return [t];
}

/**
 * Customer-facing "What's included" lines for HalloweenReady product detail pages.
 */
export function getProductIncludes(product: ProductLike): string[] {
  const { description, name, categorySlug, tags } = product;

  if (looksLikeHtml(description) && /<li[\s>]/i.test(description)) {
    const fromHtml = fromHtmlList(description).flatMap(normalizeHamperIncludeLine);
    if (fromHtml.length > 0) return [...fromHtml, ...shippingIncludeLines()];
  }

  const blob = [name, description, ...(tags ?? [])].join(" ");
  const plain = looksLikeHtml(blob) ? stripHtml(blob) : blob;

  const items = [...categoryIncludeLines(categorySlug)];
  const chocolate = parseChocolateInclude(plain);
  if (chocolate) items.push(chocolate);

  return [...items, ...shippingIncludeLines()];
}
