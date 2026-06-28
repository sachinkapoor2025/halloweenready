export type DeviceType = "Desktop" | "Mobile" | "Tablet" | "Unknown";
export interface ClientDeviceInfo {
    deviceType: DeviceType;
    browser: string;
    os: string;
    userAgent: string;
}
/** Parse browser/device/OS from a user-agent string (client or server). */
export declare function parseClientDevice(userAgent: string): ClientDeviceInfo;
