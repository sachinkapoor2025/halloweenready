"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_ADDONS = exports.MAX_PRODUCT_ADDON_QUANTITY = void 0;
exports.getProductAddon = getProductAddon;
exports.productAllowsAddons = productAllowsAddons;
exports.sumAddonPrices = sumAddonPrices;
exports.cartAddonSignature = cartAddonSignature;
exports.cartLineUnitTotal = cartLineUnitTotal;
exports.normalizeAddonSelections = normalizeAddonSelections;
exports.resolveProductAddons = resolveProductAddons;
exports.resolveProductAddonsFromIds = resolveProductAddonsFromIds;
const constants_1 = require("../constants");
/** Max packs of a single add-on per cart line. */
exports.MAX_PRODUCT_ADDON_QUANTITY = 10;
/** Fixed HalloweenReady PDP add-on catalog (USD). Not Dynamo SKUs. */
exports.PRODUCT_ADDONS = [
    {
        id: "badam-100g",
        name: "Badam (Almonds) — 100 g",
        priceUsd: 9,
        group: "dry-fruits",
        detail: "100 g",
    },
    {
        id: "kaju-100g",
        name: "Kaju (Cashews) — 100 g",
        priceUsd: 9,
        group: "dry-fruits",
        detail: "100 g",
    },
    {
        id: "pista-100g",
        name: "Pista (Pistachios) — 100 g",
        priceUsd: 9,
        group: "dry-fruits",
        detail: "100 g",
    },
    {
        id: "badam-200g",
        name: "Badam (Almonds) — 200 g",
        priceUsd: 15,
        group: "dry-fruits",
        detail: "200 g",
    },
    {
        id: "kaju-200g",
        name: "Kaju (Cashews) — 200 g",
        priceUsd: 15,
        group: "dry-fruits",
        detail: "200 g",
    },
    {
        id: "pista-200g",
        name: "Pista (Pistachios) — 200 g",
        priceUsd: 15,
        group: "dry-fruits",
        detail: "200 g",
    },
    {
        id: "hershey-2pc",
        name: "Hershey’s chocolates (2 pcs)",
        priceUsd: 5,
        group: "chocolates",
        detail: "2 pcs",
    },
    {
        id: "lindt-5pc",
        name: "Lindt Lindor chocolates (5 pcs)",
        priceUsd: 6,
        group: "chocolates",
        detail: "5 pcs",
    },
    {
        id: "ferrero-3pc",
        name: "Ferrero Rocher (3 pcs)",
        priceUsd: 5,
        group: "chocolates",
        detail: "3 pcs",
    },
];
const ADDON_BY_ID = new Map(exports.PRODUCT_ADDONS.map((a) => [a.id, a]));
function getProductAddon(id) {
    return ADDON_BY_ID.get(id);
}
function productAllowsAddons(product) {
    const v = product.vendorSlug?.trim();
    if (!v)
        return true;
    return v !== constants_1.VENDOR_ORANGE_COUNTY;
}
function sumAddonPrices(addons) {
    if (!addons?.length)
        return 0;
    return addons.reduce((sum, a) => sum + a.price * a.quantity, 0);
}
/**
 * Stable merge key: sorted `id:qty` pairs.
 * Empty string = no add-ons. Quantity is part of the signature so 2× of an add-on
 * does not merge with 1× of the same add-on.
 */
function cartAddonSignature(addons) {
    if (!addons?.length)
        return "";
    return [...addons]
        .map((a) => `${a.id}:${Math.max(1, Math.floor(a.quantity ?? 1))}`)
        .sort()
        .join(",");
}
function cartLineUnitTotal(item) {
    return item.price + sumAddonPrices(item.addons);
}
/** Normalize API / client payload into selections (dedupe by id, clamp qty). */
function normalizeAddonSelections(input) {
    if (!input?.length)
        return { ok: true, selections: [] };
    const byId = new Map();
    for (const raw of input) {
        const id = (typeof raw === "string" ? raw : raw.id)?.trim();
        if (!id)
            continue;
        const qtyRaw = typeof raw === "string" ? 1 : (raw.quantity ?? 1);
        const qty = Math.floor(Number(qtyRaw));
        if (!Number.isFinite(qty) || qty < 1) {
            return { ok: false, error: `Invalid add-on quantity for ${id}` };
        }
        if (qty > exports.MAX_PRODUCT_ADDON_QUANTITY) {
            return {
                ok: false,
                error: `Add-on quantity cannot exceed ${exports.MAX_PRODUCT_ADDON_QUANTITY}`,
            };
        }
        byId.set(id, (byId.get(id) ?? 0) + qty);
    }
    if (byId.size > 20)
        return { ok: false, error: "Too many add-ons selected" };
    const selections = [...byId.entries()]
        .map(([id, quantity]) => {
        const clamped = Math.min(quantity, exports.MAX_PRODUCT_ADDON_QUANTITY);
        return { id, quantity: clamped };
    })
        .sort((a, b) => a.id.localeCompare(b.id));
    return { ok: true, selections };
}
function resolveProductAddons(input) {
    const normalized = normalizeAddonSelections(input);
    if (!normalized.ok)
        return normalized;
    const addons = [];
    for (const sel of normalized.selections) {
        const def = getProductAddon(sel.id);
        if (!def)
            return { ok: false, error: `Unknown add-on: ${sel.id}` };
        addons.push({
            id: def.id,
            name: def.name,
            price: def.priceUsd,
            quantity: sel.quantity,
        });
    }
    return { ok: true, addons };
}
/** @deprecated Prefer resolveProductAddons — kept for call-site compatibility. */
function resolveProductAddonsFromIds(ids) {
    return resolveProductAddons(ids);
}
