"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseClientDevice = parseClientDevice;
function detectDevice(ua) {
    if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua))
        return "Tablet";
    if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(ua))
        return "Mobile";
    if (/windows|macintosh|linux|cros/i.test(ua))
        return "Desktop";
    return "Unknown";
}
function detectBrowser(ua) {
    if (/edg\//i.test(ua))
        return "Edge";
    if (/opr\//i.test(ua) || /opera/i.test(ua))
        return "Opera";
    if (/chrome\//i.test(ua) && !/edg\//i.test(ua))
        return "Chrome";
    if (/safari\//i.test(ua) && !/chrome\//i.test(ua))
        return "Safari";
    if (/firefox\//i.test(ua))
        return "Firefox";
    if (/msie|trident/i.test(ua))
        return "IE";
    return "Other";
}
function detectOs(ua) {
    if (/windows nt/i.test(ua))
        return "Windows";
    if (/mac os x/i.test(ua) && !/iphone|ipad/i.test(ua))
        return "macOS";
    if (/iphone|ipad|ipod/i.test(ua))
        return "iOS";
    if (/android/i.test(ua))
        return "Android";
    if (/cros/i.test(ua))
        return "ChromeOS";
    if (/linux/i.test(ua))
        return "Linux";
    return "Other";
}
/** Parse browser/device/OS from a user-agent string (client or server). */
function parseClientDevice(userAgent) {
    const ua = userAgent.trim();
    return {
        userAgent: ua.slice(0, 512),
        deviceType: detectDevice(ua),
        browser: detectBrowser(ua),
        os: detectOs(ua),
    };
}
