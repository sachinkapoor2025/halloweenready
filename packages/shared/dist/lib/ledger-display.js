"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayNameFromEmail = displayNameFromEmail;
exports.recordedByLabel = recordedByLabel;
/** Display name from email local-part, e.g. order@halloweenready.com → "Order". */
function displayNameFromEmail(email) {
    const local = (email ?? "").trim().split("@")[0] ?? "";
    if (!local)
        return "Someone";
    const cleaned = local.replace(/[._-]+/g, " ").trim();
    return cleaned
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
}
function recordedByLabel(email, noun = "settlement") {
    const name = displayNameFromEmail(email);
    if (noun === "expense")
        return `${name} logged this expense`;
    return `${name} recorded this settlement`;
}
