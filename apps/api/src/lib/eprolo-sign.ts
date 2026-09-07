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

export function eproloAuthHeaders(
  openApiKey: string,
  openApiSecret: string,
  algorithm: EproloSignAlgorithm = "md5-key-secret-timestamp",
  nowMs = Date.now()
): Record<string, string> {
  const timestamp = String(nowMs);
  const sign = eproloSign(openApiKey, openApiSecret, timestamp, algorithm);
  return {
    openApiKey,
    timestamp,
    sign,
    "Content-Type": "application/json",
  };
}
