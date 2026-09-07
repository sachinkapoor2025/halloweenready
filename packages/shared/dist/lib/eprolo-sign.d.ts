/** Default Open API host; override with EPROLO_API_BASE if the partner PDF differs. */
export declare const EPROLO_DEFAULT_API_BASE = "https://openapi.eprolo.com";
export type EproloSignAlgorithm = "md5-key-secret-timestamp" | "hmac-sha256-key-timestamp";
/**
 * Eprolo partner Open API signing.
 * Default matches the usual Chinese open-API pattern for openApiKey + openApiSecret:
 * uppercase MD5(openApiKey + openApiSecret + timestampMs).
 */
export declare function eproloSign(openApiKey: string, openApiSecret: string, timestampMs: string, algorithm?: EproloSignAlgorithm): string;
export declare function eproloAuthHeaders(openApiKey: string, openApiSecret: string, algorithm?: EproloSignAlgorithm, nowMs?: number): Record<string, string>;
