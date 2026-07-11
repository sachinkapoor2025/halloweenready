"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCouponRecord = validateCouponRecord;
exports.issueWelcomeCoupon = issueWelcomeCoupon;
exports.issueAbandonedCartCoupon = issueAbandonedCartCoupon;
exports.markCouponUsed = markCouponUsed;
exports.applyPercentDiscount = applyPercentDiscount;
exports.validateCouponHandler = validateCouponHandler;
exports.listWelcomeCoupons = listWelcomeCoupons;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const crypto_1 = require("crypto");
const shared_1 = require("@halloweenready/shared");
const db_1 = require("../lib/db");
const response_1 = require("../lib/response");
const auth_1 = require("../lib/auth");
function generateCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = (0, crypto_1.randomBytes)(6);
    let suffix = "";
    for (let i = 0; i < 6; i++)
        suffix += chars[bytes[i] % chars.length];
    return `BOO-${suffix}`;
}
function welcomeExpiresAt(from = new Date()) {
    return new Date(from.getTime() + shared_1.WELCOME_COUPON_HOURS * 60 * 60 * 1000).toISOString();
}
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
async function getWelcomeEmailRecord(email) {
    const existing = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.CONFIG_TABLE,
        Key: { PK: shared_1.couponKeys.welcomeEmailPk(email), SK: shared_1.couponKeys.welcomeEmailSk() },
    }));
    return existing.Item;
}
async function getActiveWelcomeCouponForEmail(email, code = "") {
    const activeCode = code || (await getWelcomeEmailRecord(email))?.code;
    if (!activeCode)
        return null;
    const active = await validateCouponRecord(activeCode, email);
    if (!active.valid)
        return null;
    return {
        code: active.code,
        expiresAt: active.expiresAt,
        discountPercent: active.discountPercent,
        reused: true,
    };
}
async function validateCouponRecord(code, email) {
    const normalizedCode = code.trim().toUpperCase();
    const normalizedEmail = normalizeEmail(email);
    const result = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.CONFIG_TABLE,
        Key: { PK: shared_1.couponKeys.pk(normalizedCode), SK: shared_1.couponKeys.sk() },
    }));
    const coupon = result.Item;
    if (!coupon) {
        return { valid: false, error: "Invalid coupon code" };
    }
    if (coupon.usedAt) {
        return { valid: false, error: "This coupon has already been used" };
    }
    if (new Date(coupon.expiresAt).getTime() < Date.now()) {
        return { valid: false, error: "This coupon has expired" };
    }
    if (normalizeEmail(coupon.email) !== normalizedEmail) {
        return { valid: false, error: "This coupon is registered to a different email address" };
    }
    return {
        valid: true,
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        expiresAt: coupon.expiresAt,
    };
}
/**
 * Discount of the Day — spin result.
 * One coupon per email per calendar day (America/New_York); valid for WELCOME_COUPON_HOURS.
 */
async function issueWelcomeCoupon(input) {
    const email = normalizeEmail(input.email);
    const timestamp = (0, db_1.now)();
    const dayKey = (0, shared_1.dailyDealDayKey)();
    const existing = await getWelcomeEmailRecord(email);
    const existingCode = existing?.code;
    const existingDayKey = existing?.dayKey;
    if (existingDayKey === dayKey && existingCode) {
        const active = await getActiveWelcomeCouponForEmail(email, existingCode);
        if (active) {
            return { ...active, alreadyClaimedToday: true };
        }
        return {
            code: existingCode,
            expiresAt: existing?.expiresAt ?? timestamp,
            discountPercent: Number(existing?.discountPercent ?? 0),
            reused: true,
            alreadyClaimedToday: true,
        };
    }
    const existingActive = await getActiveWelcomeCouponForEmail(email, existingCode);
    if (existingActive) {
        return { ...existingActive, alreadyClaimedToday: false };
    }
    const discountPercent = (0, shared_1.isValidDailyDealPercent)(input.discountPercent)
        ? input.discountPercent
        : (0, shared_1.pickDailyDealDiscount)();
    const expiresAt = welcomeExpiresAt();
    const code = generateCode();
    const coupon = {
        PK: shared_1.couponKeys.pk(code),
        SK: shared_1.couponKeys.sk(),
        code,
        email,
        discountPercent,
        expiresAt,
        createdAt: timestamp,
        sessionId: input.sessionId,
        source: "welcome",
        dayKey,
    };
    try {
        await db_1.docClient.send(new lib_dynamodb_1.TransactWriteCommand({
            TransactItems: [
                {
                    Put: {
                        TableName: db_1.CONFIG_TABLE,
                        Item: coupon,
                        ConditionExpression: "attribute_not_exists(PK)",
                    },
                },
                {
                    Put: {
                        TableName: db_1.CONFIG_TABLE,
                        Item: {
                            PK: shared_1.couponKeys.welcomeEmailPk(email),
                            SK: shared_1.couponKeys.welcomeEmailSk(),
                            code,
                            expiresAt,
                            createdAt: timestamp,
                            email,
                            dayKey,
                            discountPercent,
                        },
                        ConditionExpression: "attribute_not_exists(PK) OR attribute_not_exists(dayKey) OR dayKey <> :today OR expiresAt < :now",
                        ExpressionAttributeValues: {
                            ":today": dayKey,
                            ":now": timestamp,
                        },
                    },
                },
            ],
        }));
    }
    catch {
        const activeCoupon = await getActiveWelcomeCouponForEmail(email);
        if (activeCoupon)
            return { ...activeCoupon, alreadyClaimedToday: true };
        const again = await getWelcomeEmailRecord(email);
        if (again?.dayKey === dayKey && again.code) {
            return {
                code: again.code,
                expiresAt: again.expiresAt ?? timestamp,
                discountPercent: Number(again.discountPercent ?? 0),
                reused: true,
                alreadyClaimedToday: true,
            };
        }
        throw new Error("Could not issue discount coupon");
    }
    return { code, expiresAt, discountPercent, reused: false, alreadyClaimedToday: false };
}
async function issueAbandonedCartCoupon(input) {
    const email = normalizeEmail(input.email);
    const timestamp = (0, db_1.now)();
    const expiresAt = new Date(Date.now() + shared_1.ABANDONED_CART_COUPON_HOURS * 60 * 60 * 1000).toISOString();
    const existing = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.CONFIG_TABLE,
        Key: { PK: shared_1.couponKeys.abandonedEmailPk(email), SK: shared_1.couponKeys.abandonedEmailSk() },
    }));
    const activeCode = existing.Item?.code;
    if (activeCode) {
        const active = await validateCouponRecord(activeCode, email);
        if (active.valid) {
            return {
                code: active.code,
                expiresAt: active.expiresAt,
                discountPercent: active.discountPercent,
            };
        }
    }
    const code = generateCode();
    const coupon = {
        PK: shared_1.couponKeys.pk(code),
        SK: shared_1.couponKeys.sk(),
        code,
        email,
        discountPercent: shared_1.ABANDONED_CART_DISCOUNT_PERCENT,
        expiresAt,
        createdAt: timestamp,
        sessionId: input.sessionId,
        source: "abandoned",
    };
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.CONFIG_TABLE, Item: coupon }));
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({
        TableName: db_1.CONFIG_TABLE,
        Item: {
            PK: shared_1.couponKeys.abandonedEmailPk(email),
            SK: shared_1.couponKeys.abandonedEmailSk(),
            code,
            expiresAt,
            createdAt: timestamp,
            email,
        },
    }));
    return { code, expiresAt, discountPercent: shared_1.ABANDONED_CART_DISCOUNT_PERCENT };
}
async function markCouponUsed(code, orderId) {
    const normalizedCode = code.trim().toUpperCase();
    const timestamp = (0, db_1.now)();
    await db_1.docClient.send(new lib_dynamodb_1.UpdateCommand({
        TableName: db_1.CONFIG_TABLE,
        Key: { PK: shared_1.couponKeys.pk(normalizedCode), SK: shared_1.couponKeys.sk() },
        UpdateExpression: "SET usedAt = :usedAt, orderId = :orderId",
        ConditionExpression: "attribute_exists(PK) AND attribute_not_exists(usedAt)",
        ExpressionAttributeValues: {
            ":usedAt": timestamp,
            ":orderId": orderId,
        },
    })).catch(() => {
        /* already used or missing — non-blocking */
    });
}
function applyPercentDiscount(subtotal, percent) {
    return Math.round(subtotal * (percent / 100) * 100) / 100;
}
async function validateCouponHandler(event) {
    const body = JSON.parse(event.body ?? "{}");
    const parsed = shared_1.couponValidateSchema.safeParse(body);
    if (!parsed.success)
        return (0, response_1.badRequest)(parsed.error.message);
    const result = await validateCouponRecord(parsed.data.code, parsed.data.email);
    if (!result.valid)
        return (0, response_1.badRequest)(result.error ?? "Invalid coupon");
    return (0, response_1.ok)(result);
}
async function listWelcomeCoupons(event) {
    if (!(0, auth_1.requireAdmin)(event))
        return (0, response_1.forbidden)();
    const result = await db_1.docClient.send(new lib_dynamodb_1.ScanCommand({
        TableName: db_1.CONFIG_TABLE,
        FilterExpression: "begins_with(PK, :prefix) AND SK = :sk AND #src = :src",
        ExpressionAttributeNames: { "#src": "source" },
        ExpressionAttributeValues: {
            ":prefix": "COUPON#",
            ":sk": "META",
            ":src": "welcome",
        },
    }));
    const coupons = (result.Items ?? []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return (0, response_1.ok)({ coupons });
}
