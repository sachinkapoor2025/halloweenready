"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertSessionProfile = upsertSessionProfile;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const shared_1 = require("@halloweenready/shared");
const db_1 = require("./db");
function pickContactField(incoming, existing) {
    const next = incoming?.trim();
    if (next)
        return next;
    return existing;
}
/** Merge contact fields onto the session profile (used by leads, checkout, cart). */
async function upsertSessionProfile(sessionId, fields) {
    const timestamp = (0, db_1.now)();
    const email = (0, shared_1.normalizeEmail)(fields.email);
    const name = (0, shared_1.normalizeName)(fields.name);
    const phoneRaw = fields.phone?.trim();
    const phone = phoneRaw && (0, shared_1.normalizePhone)(phoneRaw) ? phoneRaw : undefined;
    const existing = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.CUSTOMERS_TABLE,
        Key: { PK: shared_1.customerKeys.pk(sessionId), SK: shared_1.customerKeys.profileSk() },
    }));
    const prev = existing.Item ?? {};
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({
        TableName: db_1.CUSTOMERS_TABLE,
        Item: {
            sessionId,
            PK: shared_1.customerKeys.pk(sessionId),
            SK: shared_1.customerKeys.profileSk(),
            createdAt: prev.createdAt ?? timestamp,
            lastSeenAt: timestamp,
            updatedAt: timestamp,
            name: name ?? pickContactField(undefined, prev.name),
            email: email ?? prev.email,
            phone: phone ?? pickContactField(undefined, prev.phone),
        },
    }));
}
