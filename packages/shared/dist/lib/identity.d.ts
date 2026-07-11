/**
 * Contact identity helpers for visitor ↔ lead ↔ cart matching.
 * Used by admin session enrichment and customer profile merge.
 */
export type ContactFields = {
    name?: string;
    email?: string;
    phone?: string;
};
/** Trim and collapse internal whitespace in display names. */
export declare function normalizeName(name?: string | null): string | undefined;
/** Lowercase + trim email; returns undefined if not a plausible email. */
export declare function normalizeEmail(email?: string | null): string | undefined;
/**
 * Digits-only phone key for matching across formats
 * (+91 9087654322, 9087654322, +1-418-543-8090).
 * Keeps last 10 digits when longer (common IN/US local form).
 */
export declare function normalizePhone(phone?: string | null): string | undefined;
/** Prefer non-empty incoming values; otherwise keep existing. */
export declare function mergeContactFields(target: ContactFields, incoming: ContactFields): ContactFields;
/**
 * Merge contact onto a mutable target (session summary style).
 * Preserves a readable phone string while matching via normalizePhone.
 */
export declare function applyContactFields(target: ContactFields, incoming: ContactFields): void;
export declare function isKnownContact(c: ContactFields): boolean;
export declare function contactsMatch(a: ContactFields, b: ContactFields): boolean;
/**
 * Build lookup maps from a list of known contacts, then backfill
 * incomplete records that share email or phone with a known one.
 */
export declare function backfillContactsByIdentity<T extends ContactFields>(records: T[]): T[];
