/**
 * Key builders for the multi-table DynamoDB design.
 * Each domain has its own table; builders below are grouped per table.
 */
export declare const productKeys: {
    pk: (slug: string) => string;
    sk: () => "META";
    gsi1pk: (categorySlug: string) => string;
    gsi1sk: (slug: string) => string;
};
export declare const categoryKeys: {
    pk: (slug: string) => string;
    sk: () => "META";
};
export declare const orderKeys: {
    pk: (orderId: string) => string;
    sk: () => "META";
    gsi1pk: (userKey: string) => string;
    gsi1sk: (createdAt: string) => string;
    gsi2pk: () => "ENTITY#ORDER";
    gsi2sk: (createdAt: string) => string;
    gsi3pk: (status: string) => string;
    gsi3sk: (createdAt: string) => string;
};
export declare const cartKeys: {
    pk: (userKey: string) => string;
    sk: () => "META";
    gsi1pk: () => "ENTITY#CART";
    gsi1sk: (updatedAt: string) => string;
};
export declare const customerKeys: {
    pk: (sessionId: string) => string;
    profileSk: () => "PROFILE";
    leadSk: (timestamp: string) => string;
    gsi1pk: () => "ENTITY#LEAD";
    gsi1sk: (timestamp: string) => string;
};
export declare const accountKeys: {
    pk: (userId: string) => string;
    profileSk: () => "PROFILE";
    addressSk: (addressId: string) => string;
    addressSkPrefix: () => "ADDRESS#";
};
export declare const eventKeys: {
    pk: (sessionId: string) => string;
    sk: (timestamp: string, eventId: string) => string;
    gsi1pk: (type: string, day: string) => string;
    gsi1sk: (timestamp: string) => string;
    rollupPk: (day: string) => string;
    rollupSk: (metric: string) => string;
};
export declare const configKeys: {
    payments: {
        pk: string;
        sk: "META";
    };
};
export declare const couponKeys: {
    pk: (code: string) => string;
    sk: () => "META";
    welcomeEmailPk: (email: string) => string;
    welcomeEmailSk: () => "ACTIVE";
    abandonedEmailPk: (email: string) => string;
    abandonedEmailSk: () => "ACTIVE";
};
/**
 * Legacy single-table helpers — retained only for the one-time migration script
 * that reads the old `halloweenready-{env}` table. Do not use in handlers.
 */
export declare const legacyKeys: {
    userPk: (userId: string) => string;
    orderSkPrefix: () => string;
};
