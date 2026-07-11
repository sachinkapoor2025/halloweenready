"use strict";
/**
 * Contact identity helpers for visitor ↔ lead ↔ cart matching.
 * Used by admin session enrichment and customer profile merge.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeName = normalizeName;
exports.normalizeEmail = normalizeEmail;
exports.normalizePhone = normalizePhone;
exports.mergeContactFields = mergeContactFields;
exports.applyContactFields = applyContactFields;
exports.isKnownContact = isKnownContact;
exports.contactsMatch = contactsMatch;
exports.backfillContactsByIdentity = backfillContactsByIdentity;
/** Trim and collapse internal whitespace in display names. */
function normalizeName(name) {
    const trimmed = name?.trim().replace(/\s+/g, " ");
    return trimmed || undefined;
}
/** Lowercase + trim email; returns undefined if not a plausible email. */
function normalizeEmail(email) {
    const trimmed = email?.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@"))
        return undefined;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
        return undefined;
    return trimmed;
}
/**
 * Digits-only phone key for matching across formats
 * (+91 9087654322, 9087654322, +1-418-543-8090).
 * Keeps last 10 digits when longer (common IN/US local form).
 */
function normalizePhone(phone) {
    if (!phone)
        return undefined;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7)
        return undefined;
    if (digits.length > 10)
        return digits.slice(-10);
    return digits;
}
/** Prefer non-empty incoming values; otherwise keep existing. */
function mergeContactFields(target, incoming) {
    return {
        name: normalizeName(incoming.name) ?? normalizeName(target.name),
        email: normalizeEmail(incoming.email) ?? normalizeEmail(target.email),
        phone: incoming.phone?.trim() || target.phone?.trim() || undefined,
    };
}
/**
 * Merge contact onto a mutable target (session summary style).
 * Preserves a readable phone string while matching via normalizePhone.
 */
function applyContactFields(target, incoming) {
    const name = normalizeName(incoming.name);
    const email = normalizeEmail(incoming.email);
    const phoneRaw = incoming.phone?.trim();
    if (name && !normalizeName(target.name))
        target.name = name;
    if (email && !normalizeEmail(target.email))
        target.email = email;
    if (phoneRaw && !normalizePhone(target.phone))
        target.phone = phoneRaw;
}
function isKnownContact(c) {
    return Boolean(normalizeEmail(c.email) || normalizePhone(c.phone) || normalizeName(c.name));
}
function contactsMatch(a, b) {
    const ae = normalizeEmail(a.email);
    const be = normalizeEmail(b.email);
    if (ae && be && ae === be)
        return true;
    const ap = normalizePhone(a.phone);
    const bp = normalizePhone(b.phone);
    if (ap && bp && ap === bp)
        return true;
    return false;
}
/**
 * Build lookup maps from a list of known contacts, then backfill
 * incomplete records that share email or phone with a known one.
 */
function backfillContactsByIdentity(records) {
    const byEmail = new Map();
    const byPhone = new Map();
    for (const r of records) {
        if (!isKnownContact(r))
            continue;
        const email = normalizeEmail(r.email);
        const phone = normalizePhone(r.phone);
        if (email) {
            const prev = byEmail.get(email) ?? {};
            applyContactFields(prev, r);
            byEmail.set(email, prev);
        }
        if (phone) {
            const prev = byPhone.get(phone) ?? {};
            applyContactFields(prev, r);
            byPhone.set(phone, prev);
        }
    }
    // Propagate across email↔phone bridges (same person, different sessions)
    let changed = true;
    let guard = 0;
    while (changed && guard < 5) {
        changed = false;
        guard += 1;
        for (const contact of [...byEmail.values(), ...byPhone.values()]) {
            const email = normalizeEmail(contact.email);
            const phone = normalizePhone(contact.phone);
            if (email) {
                const prev = byEmail.get(email) ?? {};
                const before = JSON.stringify(prev);
                applyContactFields(prev, contact);
                byEmail.set(email, prev);
                if (JSON.stringify(prev) !== before)
                    changed = true;
            }
            if (phone) {
                const prev = byPhone.get(phone) ?? {};
                const before = JSON.stringify(prev);
                applyContactFields(prev, contact);
                byPhone.set(phone, prev);
                if (JSON.stringify(prev) !== before)
                    changed = true;
            }
            if (email && phone) {
                const e = byEmail.get(email);
                const p = byPhone.get(phone);
                applyContactFields(e, p);
                applyContactFields(p, e);
                byEmail.set(email, e);
                byPhone.set(phone, p);
            }
        }
    }
    return records.map((r) => {
        const email = normalizeEmail(r.email);
        const phone = normalizePhone(r.phone);
        const fromEmail = email ? byEmail.get(email) : undefined;
        const fromPhone = phone ? byPhone.get(phone) : undefined;
        if (!fromEmail && !fromPhone)
            return r;
        const next = { ...r };
        if (fromEmail)
            applyContactFields(next, fromEmail);
        if (fromPhone)
            applyContactFields(next, fromPhone);
        return next;
    });
}
