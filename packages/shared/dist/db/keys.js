"use strict";
/**
 * Key builders for the multi-table DynamoDB design.
 * Each domain has its own table; builders below are grouped per table.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.legacyKeys = exports.couponKeys = exports.configKeys = exports.eventKeys = exports.accountKeys = exports.customerKeys = exports.cartKeys = exports.orderKeys = exports.categoryKeys = exports.productKeys = void 0;
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
};
// ---- config table ----
exports.configKeys = {
    payments: { pk: "CONFIG#PAYMENTS", sk: "META" },
};
exports.couponKeys = {
    pk: (code) => `COUPON#${code.trim().toUpperCase()}`,
    sk: () => "META",
    welcomeEmailPk: (email) => `WELCOME#${email.trim().toLowerCase()}`,
    welcomeEmailSk: () => "ACTIVE",
    abandonedEmailPk: (email) => `ABANDONED#${email.trim().toLowerCase()}`,
    abandonedEmailSk: () => "ACTIVE",
};
/**
 * Legacy single-table helpers — retained only for the one-time migration script
 * that reads the old `halloweenready-{env}` table. Do not use in handlers.
 */
exports.legacyKeys = {
    userPk: (userId) => `USER#${userId}`,
    orderSkPrefix: () => "ORDER#",
};
