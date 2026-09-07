"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPROLO_DEFAULT_API_BASE = void 0;
exports.eproloSign = eproloSign;
exports.eproloAuthHeaders = eproloAuthHeaders;
const node_crypto_1 = require("node:crypto");
/** Default Open API host; override with EPROLO_API_BASE if the partner PDF differs. */
exports.EPROLO_DEFAULT_API_BASE = "https://openapi.eprolo.com";
/**
 * Eprolo partner Open API signing.
 * Default matches the usual Chinese open-API pattern for openApiKey + openApiSecret:
 * uppercase MD5(openApiKey + openApiSecret + timestampMs).
 */
function eproloSign(openApiKey, openApiSecret, timestampMs, algorithm = "md5-key-secret-timestamp") {
    if (algorithm === "hmac-sha256-key-timestamp") {
        return (0, node_crypto_1.createHmac)("sha256", openApiSecret).update(`${openApiKey}${timestampMs}`).digest("hex");
    }
    return (0, node_crypto_1.createHash)("md5")
        .update(`${openApiKey}${openApiSecret}${timestampMs}`)
        .digest("hex")
        .toUpperCase();
}
function eproloAuthHeaders(openApiKey, openApiSecret, algorithm = "md5-key-secret-timestamp", nowMs = Date.now()) {
    const timestamp = String(nowMs);
    const sign = eproloSign(openApiKey, openApiSecret, timestamp, algorithm);
    return {
        openApiKey,
        timestamp,
        sign,
        "Content-Type": "application/json",
    };
}
