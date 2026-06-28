"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaDescription = metaDescription;
exports.isTruncatedMeta = isTruncatedMeta;
exports.productMetaDescription = productMetaDescription;
const DEFAULT_MAX = 155;
/** Collapse whitespace for meta tag text. */
function clean(text) {
    return text.replace(/\s+/g, " ").trim();
}
/**
 * Trim text to a SERP-safe length without cutting mid-word.
 * Prefers ending at a sentence boundary when one fits within the limit.
 */
function metaDescription(text, maxLength = DEFAULT_MAX) {
    const cleaned = clean(text);
    if (!cleaned)
        return "";
    if (cleaned.length <= maxLength)
        return cleaned;
    const slice = cleaned.slice(0, maxLength + 1);
    const sentenceEnd = slice.search(/[.!?](?:\s|$)/);
    if (sentenceEnd >= 50) {
        return cleaned.slice(0, sentenceEnd + 1).trim();
    }
    const truncated = cleaned.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace >= 50) {
        return `${truncated.slice(0, lastSpace).trim()}…`;
    }
    return `${truncated.trim()}…`;
}
/** Detect catalog/import descriptions cut at a fixed char limit mid-word. */
function isTruncatedMeta(text, maxLength = 160) {
    if (!text?.trim())
        return true;
    const t = text.trim();
    if (t.length < maxLength - 10)
        return false;
    if (/[.!?…]$/.test(t))
        return false;
    return /[a-zA-Z]$/.test(t);
}
/** Prefer complete seoDescription; fall back to smart-trimmed product description. */
function productMetaDescription(seoDescription, description) {
    if (seoDescription && !isTruncatedMeta(seoDescription)) {
        return metaDescription(seoDescription);
    }
    return metaDescription(description ?? seoDescription ?? "");
}
