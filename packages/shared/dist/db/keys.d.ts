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
    /** GSI1: list all categories without table Scan */
    gsi1pk: () => "ENTITY#CATEGORY";
    gsi1sk: (sortOrder: number, slug: string) => string;
};
/** Product reviews live in the products table under PRODUCT#slug / REVIEW#id. */
export declare const reviewKeys: {
    pk: (productSlug: string) => string;
    sk: (reviewId: string) => string;
    skPrefix: () => "REVIEW#";
    /** GSI1: global published review feed by date */
    gsi1pk: () => "ENTITY#REVIEW";
    gsi1sk: (createdAt: string, reviewId: string) => string;
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
    /** Atomic counters for human order numbers (OC / US). */
    counterPk: (prefix: "OC" | "US") => string;
    counterSk: () => "META";
    /** Lookup pointer: ORDERNUM#OC10001 → orderId (UUID). */
    numberPk: (orderNumber: string) => string;
    numberSk: () => "META";
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
    /**
     * Live presence partition — Query PK=PRESENCE#LIVE for active visitors.
     * Items carry DynamoDB TTL (`expiresAt`) so idle sessions drop off automatically.
     */
    presencePk: () => "PRESENCE#LIVE";
    presenceSk: (sessionId: string) => string;
};
export declare const configKeys: {
    payments: {
        pk: string;
        sk: "META";
    };
    blogImages: {
        pk: string;
        sk: "META";
    };
    shipping: {
        pk: string;
        sk: "META";
    };
    cjDropshipping: {
        pk: string;
        sk: "META";
    };
};
/** Multi-warehouse / multi-vendor registry (config table). */
export declare const warehouseKeys: {
    pk: (warehouseId: string) => string;
    sk: () => "META";
    pkPrefix: () => "WAREHOUSE#";
};
export declare const vendorRecordKeys: {
    pk: (vendorId: string) => string;
    sk: () => "META";
    pkPrefix: () => "VENDOR#";
};
export declare const marketKeys: {
    pk: (countryCode: string) => string;
    sk: () => "META";
    pkPrefix: () => "MARKET#";
};
export declare const inventoryListingKeys: {
    pk: (listingId: string) => string;
    sk: () => "META";
    pkPrefix: () => "INVLIST#";
};
export declare const auditLogKeys: {
    pk: (auditId: string) => string;
    sk: () => "META";
    pkPrefix: () => "AUDIT#";
};
/** Tracks admin S3 uploads → product slug for recovery if DB is reset. */
export declare const uploadRegistryKeys: {
    pk: (storageKey: string) => string;
    sk: () => "META";
};
export declare const couponKeys: {
    pk: (code: string) => string;
    sk: () => "META";
    welcomeEmailPk: (email: string) => string;
    welcomeEmailSk: () => "ACTIVE";
    /** One-spin-per-day index keyed by normalized phone digits. */
    welcomePhonePk: (phoneDigits: string) => string;
    welcomePhoneSk: () => "ACTIVE";
    abandonedEmailPk: (email: string) => string;
    abandonedEmailSk: () => "ACTIVE";
};
/** Business expenses (config table). */
export declare const expenseKeys: {
    pk: (expenseId: string) => string;
    sk: () => "META";
    pkPrefix: () => "EXPENSE#";
};
/** Manual payment-gateway ledger entries (config table). */
export declare const paymentLedgerKeys: {
    pk: (paymentId: string) => string;
    sk: () => "META";
    pkPrefix: () => "PAYLEDGER#";
};
/** Vendor payout ledger entries (config table) — amounts paid to fulfill vendors. */
export declare const vendorPayoutKeys: {
    pk: (payoutId: string) => string;
    sk: () => "META";
    pkPrefix: () => "VENDORPAY#";
};
export declare const sesEmailKeys: {
    campaignPk: (campaignId: string) => string;
    campaignSk: () => "META";
    recipientSk: (email: string) => string;
    queueSk: (email: string) => string;
    /** GSI1: list campaigns by createdAt */
    entityCampaignPk: () => "ENTITY#CAMPAIGN";
    entityCampaignSk: (createdAt: string) => string;
    /** GSI2: find due/scheduled campaigns */
    statusPk: (status: string) => string;
    statusSk: (at: string) => string;
    /** Pending queue scan for worker */
    pendingQueuePk: () => "QUEUE#PENDING";
    pendingQueueSk: (campaignId: string, email: string) => string;
    templatePk: (templateId: string) => string;
    templateSk: () => "META";
    entityTemplatePk: () => "ENTITY#TEMPLATE";
    entityTemplateSk: (createdAt: string) => string;
    suppressPk: (email: string) => string;
    suppressSk: () => "META";
    entitySuppressPk: () => "ENTITY#SUPPRESS";
    entitySuppressSk: (createdAt: string) => string;
    /** Pending bounce events from Mailercloud webhook (processed by bounce-sync Lambda). */
    bounceEventPk: (id: string) => string;
    bounceEventSk: () => "META";
    pendingBouncePk: () => "BOUNCE#PENDING";
    pendingBounceSk: (createdAt: string, email: string) => string;
    settingsPk: () => "SETTINGS#SES";
    settingsSk: () => "META";
    trackOpenPk: (token: string) => string;
    trackClickPk: (token: string) => string;
    trackSk: () => "META";
    notifyPk: (id: string) => string;
    notifySk: () => "META";
    entityNotifyPk: () => "ENTITY#NOTIFY";
    entityNotifySk: (createdAt: string) => string;
    dailyCounterPk: (day: string) => string;
    dailyCounterSk: () => "META";
};
export declare const reminderEmailKeys: {
    pk: (email: string) => string;
    sk: () => "META";
    /** GSI1: list by status (show | deleted) */
    statusPk: (status: "show" | "deleted") => string;
    statusSk: (createdAt: string, email: string) => string;
};
/** Pending-payment reminder unsubscribe list (dedicated table). */
export declare const pendingPaymentUnsubKeys: {
    pk: (email: string) => string;
    sk: () => "META";
};
/**
 * Legacy single-table helpers — retained only for the one-time migration script
 * that reads the old `halloweenready-{env}` table. Do not use in handlers.
 */
export declare const legacyKeys: {
    userPk: (userId: string) => string;
    orderSkPrefix: () => string;
};
