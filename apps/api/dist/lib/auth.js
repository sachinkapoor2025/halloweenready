"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth = getAuth;
exports.getSessionId = getSessionId;
exports.getUserOrSessionKey = getUserOrSessionKey;
exports.requireAdmin = requireAdmin;
const DEV_AUTH_ENABLED = process.env.DEV_AUTH_ENABLED === "true" || process.env.ENVIRONMENT === "local";
/** Decode JWT payload or dev token for local testing. */
function getAuth(event) {
    const authHeader = event.headers?.authorization ?? event.headers?.Authorization;
    if (!authHeader?.startsWith("Bearer "))
        return null;
    const token = authHeader.slice(7);
    if (token.startsWith("dev:") && DEV_AUTH_ENABLED) {
        const [, email, role] = token.split(":");
        if (!email)
            return null;
        return {
            userId: `dev-${email}`,
            email,
            isAdmin: role === "admin",
        };
    }
    try {
        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
        const groups = payload["cognito:groups"] ?? [];
        return {
            userId: payload.sub,
            email: payload.email ?? "",
            isAdmin: groups.includes("admin"),
        };
    }
    catch {
        return null;
    }
}
function getSessionId(event) {
    return event.headers?.["x-session-id"] ?? event.headers?.["X-Session-Id"];
}
function getUserOrSessionKey(event) {
    const auth = getAuth(event);
    if (auth)
        return auth.userId;
    const sessionId = getSessionId(event);
    return sessionId ?? null;
}
function requireAdmin(event) {
    const auth = getAuth(event);
    if (!auth?.isAdmin)
        return null;
    return auth;
}
