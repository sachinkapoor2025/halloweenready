"use strict";
/**
 * Key builders for the multi-table DynamoDB design.
 * Each domain has its own table; builders below are grouped per table.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.legacyKeys = exports.pendingPaymentUnsubKeys = exports.reminderEmailKeys = exports.sesEmailKeys = exports.vendorPayoutKeys = exports.paymentLedgerKeys = exports.expenseKeys = exports.couponKeys = exports.uploadRegistryKeys = exports.auditLogKeys = exports.inventoryListingKeys = exports.marketKeys = exports.vendorRecordKeys = exports.warehouseKeys = exports.configKeys = exports.eventKeys = exports.accountKeys = exports.customerKeys = exports.cartKeys = exports.orderKeys = exports.reviewKeys = exports.categoryKeys = exports.productKeys = void 0;
// ---- products table (products + categories) ----
exports.productKeys = {
    pk: (slug) => `PRODUCT#${slug}`,
    sk: () => "META",
    gsi1pk: (categorySlug) => `CATEGORY#${categorySlug}`,
    gsi1sk: (slug) => `PRODUCT#${slug}`,
};
exports.categoryKeys = {
    pk: (slug) => `CATEGORY#${slug}`,
    sk: () => "META",
    /** GSI1: list all categories without table Scan */
    gsi1pk: () => "ENTITY#CATEGORY",
    gsi1sk: (sortOrder, slug) => `${String(Math.max(0, sortOrder || 0)).padStart(6, "0")}#${slug}`,
};
/** Product reviews live in the products table under PRODUCT#slug / REVIEW#id. */
exports.reviewKeys = {
    pk: (productSlug) => `PRODUCT#${productSlug}`,
    sk: (reviewId) => `REVIEW#${reviewId}`,
    skPrefix: () => "REVIEW#",
    /** GSI1: global published review feed by date */
    gsi1pk: () => "ENTITY#REVIEW",
    gsi1sk: (createdAt, reviewId) => `${createdAt}#${reviewId}`,
};
// ---- orders table ----
exports.orderKeys = {
    pk: (orderId) => `ORDER#${orderId}`,
    sk: () => "META",
    // GSI1: list a customer's orders by date
    gsi1pk: (userKey) => `USER#${userKey}`,
    gsi1sk: (createdAt) => createdAt,
    // GSI2: global admin feed by date
    gsi2pk: () => "ENTITY#ORDER",
    gsi2sk: (createdAt) => createdAt,
    // GSI3: filter by status, sorted by date
    gsi3pk: (status) => `STATUS#${status}`,
    gsi3sk: (createdAt) => createdAt,
    /** Atomic counters for human order numbers (OC / US). */
    counterPk: (prefix) => `COUNTER#ORDER#${prefix}`,
    counterSk: () => "META",
    /** Lookup pointer: ORDERNUM#OC10001 → orderId (UUID). */
    numberPk: (orderNumber) => `ORDERNUM#${orderNumber.trim().toUpperCase()}`,
    numberSk: () => "META",
};
// ---- carts table ----
exports.cartKeys = {
    pk: (userKey) => `CART#${userKey}`,
    sk: () => "META",
    // GSI1: scan recently-updated carts for abandoned-cart recovery
    gsi1pk: () => "ENTITY#CART",
    gsi1sk: (updatedAt) => updatedAt,
};
// ---- customers table (session identity + lead events) ----
exports.customerKeys = {
    pk: (sessionId) => `SESSION#${sessionId}`,
    profileSk: () => "PROFILE",
    leadSk: (timestamp) => `LEAD#${timestamp}`,
    // GSI1: admin lead feed by date
    gsi1pk: () => "ENTITY#LEAD",
    gsi1sk: (timestamp) => timestamp,
};
// ---- customers table (registered user account data) ----
exports.accountKeys = {
    pk: (userId) => `USER#${userId}`,
    profileSk: () => "PROFILE",
    addressSk: (addressId) => `ADDRESS#${addressId}`,
    addressSkPrefix: () => "ADDRESS#",
};
// ---- events table (analytics) ----
exports.eventKeys = {
    // per-session timeline
    pk: (sessionId) => `SESSION#${sessionId}`,
    sk: (timestamp, eventId) => `${timestamp}#${eventId}`,
    // GSI1: feed of one event type per day
    gsi1pk: (type, day) => `${type}#${day}`,
    gsi1sk: (timestamp) => timestamp,
    // daily rollup counters (kept long-term)
    rollupPk: (day) => `ROLLUP#${day}`,
    rollupSk: (metric) => metric,
    /**
     * Live presence partition — Query PK=PRESENCE#LIVE for active visitors.
     * Items carry DynamoDB TTL (`expiresAt`) so idle sessions drop off automatically.
     */
    presencePk: () => "PRESENCE#LIVE",
    presenceSk: (sessionId) => `SESSION#${sessionId}`,
};
// ---- config table ----
exports.configKeys = {
    payments: { pk: "CONFIG#PAYMENTS", sk: "META" },
    blogImages: { pk: "CONFIG#BLOG_IMAGES", sk: "META" },
    shipping: { pk: "CONFIG#SHIPPING", sk: "META" },
};
/** Multi-warehouse / multi-vendor registry (config table). */
exports.warehouseKeys = {
    pk: (warehouseId) => `WAREHOUSE#${warehouseId}`,
    sk: () => "META",
    pkPrefix: () => "WAREHOUSE#",
};
exports.vendorRecordKeys = {
    pk: (vendorId) => `VENDOR#${vendorId}`,
    sk: () => "META",
    pkPrefix: () => "VENDOR#",
};
exports.marketKeys = {
    pk: (countryCode) => `MARKET#${countryCode.trim().toUpperCase()}`,
    sk: () => "META",
    pkPrefix: () => "MARKET#",
};
exports.inventoryListingKeys = {
    pk: (listingId) => `INVLIST#${listingId}`,
    sk: () => "META",
    pkPrefix: () => "INVLIST#",
};
exports.auditLogKeys = {
    pk: (auditId) => `AUDIT#${auditId}`,
    sk: () => "META",
    pkPrefix: () => "AUDIT#",
};
/** Tracks admin S3 uploads → product slug for recovery if DB is reset. */
exports.uploadRegistryKeys = {
    pk: (storageKey) => `UPLOAD#${storageKey.replace(/^\/+/, "")}`,
    sk: () => "META",
};
exports.couponKeys = {
    pk: (code) => `COUPON#${code.trim().toUpperCase()}`,
    sk: () => "META",
    welcomeEmailPk: (email) => `WELCOME#${email.trim().toLowerCase()}`,
    welcomeEmailSk: () => "ACTIVE",
    /** One-spin-per-day index keyed by normalized phone digits. */
    welcomePhonePk: (phoneDigits) => `WELCOMEPHONE#${phoneDigits}`,
    welcomePhoneSk: () => "ACTIVE",
    abandonedEmailPk: (email) => `ABANDONED#${email.trim().toLowerCase()}`,
    abandonedEmailSk: () => "ACTIVE",
};
/** Business expenses (config table). */
exports.expenseKeys = {
    pk: (expenseId) => `EXPENSE#${expenseId}`,
    sk: () => "META",
    pkPrefix: () => "EXPENSE#",
};
/** Manual payment-gateway ledger entries (config table). */
exports.paymentLedgerKeys = {
    pk: (paymentId) => `PAYLEDGER#${paymentId}`,
    sk: () => "META",
    pkPrefix: () => "PAYLEDGER#",
};
/** Vendor payout ledger entries (config table) — amounts paid to fulfill vendors. */
exports.vendorPayoutKeys = {
    pk: (payoutId) => `VENDORPAY#${payoutId}`,
    sk: () => "META",
    pkPrefix: () => "VENDORPAY#",
};
// ---- email campaigns table (SES bulk marketing) ----
exports.sesEmailKeys = {
    campaignPk: (campaignId) => `CAMPAIGN#${campaignId}`,
    campaignSk: () => "META",
    recipientSk: (email) => `RECIPIENT#${email.trim().toLowerCase()}`,
    queueSk: (email) => `QUEUE#${email.trim().toLowerCase()}`,
    /** GSI1: list campaigns by createdAt */
    entityCampaignPk: () => "ENTITY#CAMPAIGN",
    entityCampaignSk: (createdAt) => createdAt,
    /** GSI2: find due/scheduled campaigns */
    statusPk: (status) => `STATUS#${status}`,
    statusSk: (at) => at,
    /** Pending queue scan for worker */
    pendingQueuePk: () => "QUEUE#PENDING",
    pendingQueueSk: (campaignId, email) => `${campaignId}#${email.trim().toLowerCase()}`,
    templatePk: (templateId) => `TEMPLATE#${templateId}`,
    templateSk: () => "META",
    entityTemplatePk: () => "ENTITY#TEMPLATE",
    entityTemplateSk: (createdAt) => createdAt,
    suppressPk: (email) => `SUPPRESS#${email.trim().toLowerCase()}`,
    suppressSk: () => "META",
    entitySuppressPk: () => "ENTITY#SUPPRESS",
    entitySuppressSk: (createdAt) => createdAt,
    /** Pending bounce events from Mailercloud webhook (processed by bounce-sync Lambda). */
    bounceEventPk: (id) => `BOUNCEEVT#${id}`,
    bounceEventSk: () => "META",
    pendingBouncePk: () => "BOUNCE#PENDING",
    pendingBounceSk: (createdAt, email) => `${createdAt}#${email.trim().toLowerCase()}`,
    settingsPk: () => "SETTINGS#SES",
    settingsSk: () => "META",
    trackOpenPk: (token) => `TRACKOPEN#${token}`,
    trackClickPk: (token) => `TRACKCLICK#${token}`,
    trackSk: () => "META",
    notifyPk: (id) => `NOTIFY#${id}`,
    notifySk: () => "META",
    entityNotifyPk: () => "ENTITY#NOTIFY",
    entityNotifySk: (createdAt) => createdAt,
    dailyCounterPk: (day) => `DAILY#${day}`,
    dailyCounterSk: () => "META",
};
// ---- reminder emails table (checkout nudges for non-buyers) ----
exports.reminderEmailKeys = {
    pk: (email) => `EMAIL#${email.trim().toLowerCase()}`,
    sk: () => "META",
    /** GSI1: list by status (show | deleted) */
    statusPk: (status) => `STATUS#${status}`,
    statusSk: (createdAt, email) => `${createdAt}#${email.trim().toLowerCase()}`,
};
/** Pending-payment reminder unsubscribe list (dedicated table). */
exports.pendingPaymentUnsubKeys = {
    pk: (email) => `EMAIL#${email.trim().toLowerCase()}`,
    sk: () => "META",
};
/**
 * Legacy single-table helpers — retained only for the one-time migration script
 * that reads the old `halloweenready-{env}` table. Do not use in handlers.
 */
exports.legacyKeys = {
    userPk: (userId) => `USER#${userId}`,
    orderSkPrefix: () => "ORDER#",
};
