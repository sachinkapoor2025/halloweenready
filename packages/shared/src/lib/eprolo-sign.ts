import { createHash, createHmac } from "node:crypto";

/** Default Open API host; override with EPROLO_API_BASE if the partner PDF differs. */
export const EPROLO_DEFAULT_API_BASE = "https://openapi.eprolo.com";

export type EproloSignAlgorithm = "md5-key-secret-timestamp" | "hmac-sha256-key-timestamp";

/**
 * Eprolo partner Open API signing.
 * Default matches the usual Chinese open-API pattern for openApiKey + openApiSecret:
 * uppercase MD5(openApiKey + openApiSecret + timestampMs).
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
