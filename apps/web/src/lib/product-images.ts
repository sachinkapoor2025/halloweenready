/**
 * Detect pumpkin / logo placeholders that were used when a product had no real photos.
 * These must never appear in galleries once real admin uploads exist.
 */
export function isPlaceholderProductImage(url: string | undefined | null): boolean {
  if (!url?.trim()) return true;
  const u = url.trim().toLowerCase();
  return (
    u.includes("product-fallback") ||
    u.includes("_placeholder") ||
    u.endsWith("/logo.png") ||
    u.includes("/logo-options/") ||
    u.includes("logo-option-") ||
    u.includes("placeholder.jpg") ||
    u.includes("placeholder.svg")
  );
}

export function filterDisplayableProductImages(urls: string[] | undefined | null): string[] {
  if (!urls?.length) return [];
  return urls.filter((url) => !isPlaceholderProductImage(url));
}
