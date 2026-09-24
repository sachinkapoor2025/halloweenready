/**
 * Location-aware storefront URLs.
 * Canonical SEO paths stay unchanged (`/products/slug`, `/categories/slug`, `/about`).
 * Shoppers see a location suffix (`/about-to-uk`) or the hamper alias (`/hamper-to-usa`).
 * Home (`/`) and city pages (`/cities/*`, `/halloween/:c/:r/:city`) are never rewritten.
 */

export const LOCATION_SLUGS = [
  "australia",
  "belgium",
  "canada",
  "france",
  "germany",
  "india",
  "ireland",
  "italy",
  "netherlands",
  "spain",
  "uae",
  "uk",
  "usa",
] as const;

export type LocationSlug = (typeof LOCATION_SLUGS)[number];

const SLUG_PATTERN = LOCATION_SLUGS.join("|");
const SUFFIX_RE = new RegExp(`-to-(${SLUG_PATTERN})$`);
const HAMPER_RE = new RegExp(`^/hamper-to-(${SLUG_PATTERN})$`);

/** ISO country → public location slug used in URLs (`usa`, `uk`, `canada`, `uae`). */
const CODE_TO_LOCATION: Record<string, LocationSlug> = {
  US: "usa",
  GB: "uk",
  CA: "canada",
  AE: "uae",
  AU: "australia",
  IN: "india",
  DE: "germany",
  FR: "france",
  ES: "spain",
  IT: "italy",
  NL: "netherlands",
  IE: "ireland",
  BE: "belgium",
};

/** ISO country → existing `/countries/:slug` SEO slug. */
const CODE_TO_COUNTRY_PAGE: Record<string, string> = {
  US: "us",
  GB: "uk",
  CA: "ca",
  AE: "ae",
  AU: "au",
  IN: "in",
  DE: "de",
  FR: "fr",
  ES: "es",
  IT: "it",
  NL: "nl",
  IE: "ie",
  BE: "be",
};

const LOCATION_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(CODE_TO_LOCATION).map(([code, slug]) => [slug, code])
);

const COUNTRY_PAGE_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(CODE_TO_COUNTRY_PAGE).map(([code, slug]) => [slug, code])
);

const SKIP_PREFIXES = [
  "/admin",
  "/api",
  "/checkout",
  "/account",
  "/orders",
  "/ses-email",
  "/unsubscribe",
  "/email",
  "/_next",
];

export function locationSlugForCountry(countryCode: string): LocationSlug {
  return CODE_TO_LOCATION[countryCode.trim().toUpperCase()] ?? "usa";
}

export function countryCodeForLocationSlug(slug: string): string | undefined {
  return LOCATION_TO_CODE[slug.trim().toLowerCase()];
}

function splitPath(input: string): { path: string; suffix: string } {
  const hashIndex = input.indexOf("#");
  const hash = hashIndex >= 0 ? input.slice(hashIndex) : "";
  const beforeHash = hashIndex >= 0 ? input.slice(0, hashIndex) : input;
  const qIndex = beforeHash.indexOf("?");
  const path = qIndex >= 0 ? beforeHash.slice(0, qIndex) : beforeHash;
  const query = qIndex >= 0 ? beforeHash.slice(qIndex) : "";
  return { path: path || "/", suffix: `${query}${hash}` };
}

/** Home, city pages, and transactional/admin routes keep their existing URLs. */
export function isLocationExemptPath(pathname: string): boolean {
  const { path } = splitPath(pathname);
  if (path === "/") return true;
  if (path === "/cities" || path.startsWith("/cities/")) return true;
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "halloween" && parts.length >= 4) return true;
  if (SKIP_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return true;
  if (/\.[a-z0-9]+$/i.test(path)) return true;
  return false;
}

function stripKnownSuffix(path: string): string {
  const segs = path.split("/");
  const last = segs[segs.length - 1] ?? "";
  const match = last.match(SUFFIX_RE);
  if (!match) return path;
  const base = last.slice(0, -match[0].length);
  if (!base) return path;
  segs[segs.length - 1] = base;
  return segs.join("/") || "/";
}

/** Map a location URL back to the existing page route. */
export function canonicalStorePath(pathname: string): string {
  const { path } = splitPath(pathname);
  if (HAMPER_RE.test(path)) return "/categories/halloween-hampers";
  return stripKnownSuffix(path);
}

/**
 * Country encoded in the URL, if any.
 * City pages return undefined so they never overwrite the selected country.
 */
export function countryCodeFromPath(pathname: string): string | undefined {
  const { path } = splitPath(pathname);
  if (isLocationExemptPath(path)) return undefined;

  const hamper = path.match(HAMPER_RE);
  if (hamper?.[1]) return countryCodeForLocationSlug(hamper[1]);

  const segs = path.split("/");
  const last = segs[segs.length - 1] ?? "";
  const suffix = last.match(SUFFIX_RE);
  if (suffix?.[1]) return countryCodeForLocationSlug(suffix[1]);

  if (path.startsWith("/countries/")) {
    const slug = path.split("/")[2];
    if (slug && COUNTRY_PAGE_TO_CODE[slug]) return COUNTRY_PAGE_TO_CODE[slug];
  }

  if (path.startsWith("/halloween/")) {
    const slug = path.split("/")[2];
    if (slug && LOCATION_TO_CODE[slug]) return LOCATION_TO_CODE[slug];
  }

  return undefined;
}

/** True when the href already names a place and should not gain another suffix. */
export function isLocationNativeHref(href: string): boolean {
  const { path } = splitPath(href);
  if (path === "/" || path.startsWith("/cities")) return true;
  if (path.startsWith("/countries/")) return true;
  if (path.startsWith("/halloween/")) return true;
  if (HAMPER_RE.test(path)) return true;
  if (countryCodeFromPath(path)) return true;
  return false;
}

/** Public URL for the current page and selected country. */
export function toLocationPath(input: string, countryCode: string): string {
  const { path, suffix } = splitPath(input);
  if (isLocationExemptPath(path)) return `${path}${suffix}`;

  const location = locationSlugForCountry(countryCode);
  const canonical = canonicalStorePath(path);

  if (canonical === "/categories/halloween-hampers") {
    return `/hamper-to-${location}${suffix}`;
  }

  if (canonical.startsWith("/countries/")) {
    const pageSlug = CODE_TO_COUNTRY_PAGE[countryCode.trim().toUpperCase()] ?? "us";
    return `/countries/${pageSlug}${suffix}`;
  }

  const parts = canonical.split("/").filter(Boolean);
  if (parts[0] === "halloween") {
    if (parts.length >= 4) return `${path}${suffix}`;
    if (parts.length >= 2) return `/halloween/${location}${suffix}`;
    return `/halloween-to-${location}${suffix}`;
  }

  const segs = canonical.split("/");
  const last = segs[segs.length - 1] ?? "";
  segs[segs.length - 1] = `${last}-to-${location}`;
  return `${segs.join("/")}${suffix}`;
}

/** Href to use when a shopper follows an in-site link. */
export function hrefForLocation(href: string, countryCode: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (isLocationExemptPath(href) || isLocationNativeHref(href)) return href;
  return toLocationPath(href, countryCode);
}
