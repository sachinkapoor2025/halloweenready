import { createHash, createHmac } from "node:crypto";

export type EproloSignAlgorithm = "md5-key-secret-timestamp" | "hmac-sha256-key-timestamp";

/**
 * Eprolo partner Open API signing.
 * Default: uppercase MD5(openApiKey + openApiSecret + timestampMs).
 * Kept in the API package so Next.js never bundles node:crypto.
 */
export function eproloSign(
  openApiKey: string,
  openApiSecret: string,
  timestampMs: string,
  algorithm: EproloSignAlgorithm = "md5-key-secret-timestamp"
): string {
  if (algorithm === "hmac-sha256-key-timestamp") {
    return createHmac("sha256", openApiSecret).update(`${openApiKey}${timestampMs}`).digest("hex");
  }
  return createHash("md5")
    .update(`${openApiKey}${openApiSecret}${timestampMs}`)
    .digest("hex")
    .toUpperCase();
}

export function eproloAuth(
  openApiKey: string,
  openApiSecret: string,
  algorithm: EproloSignAlgorithm = "md5-key-secret-timestamp",
  nowMs = Date.now()
): {
  timestamp: string;
  sign: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: Record<string, string>;
} {
  const timestamp = String(nowMs);
  const sign = eproloSign(openApiKey, openApiSecret, timestamp, algorithm);
  const headers = {
    apiKey: openApiKey,
    openApiKey,
    timestamp,
    sign,
    signature: sign,
    "Content-Type": "application/json",
  };
  const query = {
    apiKey: openApiKey,
    openApiKey,
    timestamp,
    sign,
    signature: sign,
  };
  const body = { ...query };
  return { timestamp, sign, headers, query, body };
}

/** @deprecated use eproloAuth */
export function eproloAuthHeaders(
  openApiKey: string,
  openApiSecret: string,
  algorithm: EproloSignAlgorithm = "md5-key-secret-timestamp",
  nowMs = Date.now()
): Record<string, string> {
  return eproloAuth(openApiKey, openApiSecret, algorithm, nowMs).headers;
}

export function withEproloQuery(url: string, query: Record<string, string>): string {
  const next = new URL(url);
  for (const [key, value] of Object.entries(query)) {
    next.searchParams.set(key, value);
  }
  return next.toString();
}
