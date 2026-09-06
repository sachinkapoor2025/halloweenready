import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import {
  VENDOR_CJ_DROPSHIPPING,
  isCjDropshippingProduct,
  productKeys,
  upsertVendorFulfillment,
  getHalloweenHamperDef,
  resolvedHamperContentSlugs,
  type Order,
  type CartItem,
} from "@halloweenready/shared";
import { docClient, ORDERS_TABLE, PRODUCTS_TABLE, now } from "./db";
import { resolveOrderByIdOrNumber } from "./order-numbers";
import {
  CjApiError,
  cjAddToMyProduct,
  cjCreateOrderV2,
  cjFreightCalculate,
  cjGetOrder,
  cjPayBalance,
} from "./cj-dropshipping";
import { snapshotFromCjRecord, type CjOrderSnapshot } from "./cj-order-snapshot";

type StoredOrder = Order & Record<string, unknown>;

type ProductRecord = {
  vendorSlug?: string;
  cjPid?: string;
  cjVid?: string;
  sku?: string;
  name?: string;
  cjVariants?: Array<{ vid?: string; sku?: string; name?: string; key?: string }>;
};

function cheapestLogistic(data: unknown): string | undefined {
  const rows = Array.isArray(data)
    ? data
    : data && typeof data === "object" && Array.isArray((data as { data?: unknown }).data)
      ? ((data as { data: unknown[] }).data)
      : data && typeof data === "object" && Array.isArray((data as { list?: unknown[] }).list)
        ? (data as { list: unknown[] }).list
        : [];
  let best: { name: string; price: number } | undefined;
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const rec = row as Record<string, unknown>;
    const name = String(rec.logisticName ?? rec.logisticsName ?? rec.channel ?? "");
    const price = Number(rec.logisticPrice ?? rec.price ?? rec.postage ?? rec.totalPrice);
    if (!name) continue;
    if (!best || (Number.isFinite(price) && price < best.price)) {
      best = { name, price: Number.isFinite(price) ? price : Number.POSITIVE_INFINITY };
    }
  }
  return best?.name;
}

function errorMessage(err: unknown): string {
  if (err instanceof CjApiError) return err.message;
  return err instanceof Error ? err.message : String(err);
}

async function loadProduct(slug: string): Promise<ProductRecord | undefined> {
  const result = await docClient.send(
    new GetCommand({
      TableName: PRODUCTS_TABLE,
      Key: { PK: productKeys.pk(slug), SK: productKeys.sk() },
    })
  );
  return result.Item as ProductRecord | undefined;
}

async function expandHamperItemsToCjLines(order: Order): Promise<CartItem[]> {
  const extra: CartItem[] = [];
  for (const item of order.items ?? []) {
    const def = getHalloweenHamperDef(item.productSlug);
    if (!def) continue;
    const slugs = resolvedHamperContentSlugs(def.contents, item.hamperCustomization);
    for (const slug of slugs) {
      extra.push({
        productSlug: slug,
        name: slug,
        price: 0,
        currency: item.currency,
        quantity: item.quantity,
        lineId: `${item.lineId || item.productSlug}:${slug}`,
      });
    }
  }
  return extra;
}

/**
 * Resolve CJ shopping lines from the order + Dynamo products.
 * Cart rows may omit vendorSlug (stripped on the storefront) or vid if the shopper
 * did not pick a variant — look those up so paid orders still push to CJ.
 */
export async function resolveCjFulfillmentLines(order: Order): Promise<CartItem[]> {
  const hamperLines = await expandHamperItemsToCjLines(order);
  const source = [...(order.items ?? []), ...hamperLines];
  const lines: CartItem[] = [];
  const seen = new Set<string>();

  for (const item of source) {
    const product = await loadProduct(item.productSlug);
    const pid = item.cjPid || product?.cjPid;
    const vendorSlug = item.vendorSlug || product?.vendorSlug;
    if (!isCjDropshippingProduct({ vendorSlug, cjPid: pid })) continue;

    const variants = product?.cjVariants ?? [];
    const vidFromSku = item.sku
      ? variants.find((v) => v.sku && v.sku === item.sku)?.vid
      : undefined;
    const vid = item.cjVid || product?.cjVid || vidFromSku || variants[0]?.vid;
    const sku =
      item.sku ||
      product?.sku ||
      variants.find((v) => v.vid && v.vid === vid)?.sku;
    if (!vid && !sku) continue;

    const key = `${vid || sku}:${item.lineId || item.productSlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push({
      ...item,
      name: item.name || product?.name || item.productSlug,
      vendorSlug: VENDOR_CJ_DROPSHIPPING,
      ...(pid ? { cjPid: pid } : {}),
      ...(vid ? { cjVid: vid } : {}),
      ...(sku ? { sku } : {}),
    });
  }
  return lines;
}

async function persistOrder(order: StoredOrder, patch: Record<string, unknown>) {
  const timestamp = now();
  await docClient.send(
    new PutCommand({
      TableName: ORDERS_TABLE,
      Item: {
        ...order,
        ...patch,
        updatedAt: timestamp,
      },
    })
  );
}

async function createCjShoppingOrder(
  body: Record<string, unknown>,
  preferredPayType?: 1 | 2 | 3
) {
  // 2 = wallet (auto-process). 1 = create + pay URL so the order appears in CJ even with $0 balance.
  // Do not use 3 (draft only) — those often never show under Shopping → Orders.
  const sequence: Array<1 | 2 | 3> = preferredPayType ? [preferredPayType] : [2, 1];
  let lastError: unknown;
  for (const payType of sequence) {
    try {
      const created = await cjCreateOrderV2({ ...body, payType });
      return { created, payType };
    } catch (err) {
      lastError = err;
      console.warn("CJ createOrderV2 failed", { payType, err: errorMessage(err) });
    }
  }
  throw lastError instanceof Error ? lastError : new Error("CJ createOrderV2 failed");
}

type CjFulfillResult = {
  ok: boolean;
  skipped?: boolean;
  message: string;
  cjOrderId?: string;
  cjPayUrl?: string;
  cjPaid?: boolean;
  cjProductAmount?: number;
  cjPostageAmount?: number;
  cjActualPayment?: number;
  order?: StoredOrder;
};

async function loadOrderById(orderId: string): Promise<StoredOrder | undefined> {
  return resolveOrderByIdOrNumber(orderId) as Promise<StoredOrder | undefined>;
}

async function persistCjSnapshot(order: StoredOrder, snapshot: CjOrderSnapshot) {
  const timestamp = now();
  const prev = (order.vendorFulfillments ?? []).find((f) => f.vendorSlug === VENDOR_CJ_DROPSHIPPING);
  const keepShipped = prev?.status === "shipped" || prev?.status === "delivered";
  const fulfillments = upsertVendorFulfillment(order.vendorFulfillments ?? [], {
    vendorSlug: VENDOR_CJ_DROPSHIPPING,
    status: keepShipped && prev?.status ? prev.status : "processing",
    updatedAt: timestamp,
    cjOrderId: snapshot.cjOrderId,
    cjOrderNumber: snapshot.cjOrderNumber,
    cjPayUrl: snapshot.cjPaid ? "" : snapshot.cjPayUrl,
    cjPaid: snapshot.cjPaid,
    cjPaidAt: snapshot.cjPaidAt,
    cjOrderStatus: snapshot.cjOrderStatus,
    cjProductAmount: snapshot.cjProductAmount,
    cjPostageAmount: snapshot.cjPostageAmount,
    cjActualPayment: snapshot.cjActualPayment,
  });
  const next: StoredOrder = {
    ...order,
    vendorFulfillments: fulfillments,
    cjFulfillAttemptedAt: timestamp,
    cjFulfillError: undefined,
    updatedAt: timestamp,
  };
  await persistOrder(order, {
    vendorFulfillments: fulfillments,
    cjFulfillAttemptedAt: timestamp,
    cjFulfillError: undefined,
  });
  return next;
}

async function fetchCjSnapshot(cjOrderId: string, fallback?: Partial<CjOrderSnapshot>): Promise<CjOrderSnapshot> {
  try {
    const data = await cjGetOrder(cjOrderId);
    const live = snapshotFromCjRecord(data, cjOrderId);
    return {
      ...fallback,
      ...live,
      cjProductAmount: live.cjProductAmount ?? fallback?.cjProductAmount,
      cjPostageAmount: live.cjPostageAmount ?? fallback?.cjPostageAmount,
      cjActualPayment: live.cjActualPayment ?? fallback?.cjActualPayment,
      cjPaid: live.cjPaid || Boolean(fallback?.cjPaid),
    };
  } catch (err) {
    console.warn("CJ getOrderDetail failed", err);
    return {
      cjOrderId,
      cjPaid: Boolean(fallback?.cjPaid),
      ...fallback,
    };
  }
}

async function tryPayCjWallet(cjOrderId: string): Promise<{ paid: boolean; error?: string }> {
  try {
    await cjPayBalance(cjOrderId);
    return { paid: true };
  } catch (err) {
    const message = errorMessage(err);
    const lower = message.toLowerCase();
    if (!/unpaid|not paid|no pay/.test(lower) && /already paid|has been paid|payment complete/.test(lower)) {
      return { paid: true };
    }
    console.warn("CJ payBalance failed", { cjOrderId, err: message });
    return { paid: false, error: message };
  }
}

function resultFromSnapshot(snapshot: CjOrderSnapshot, extra?: Partial<CjFulfillResult>): CjFulfillResult {
  const unpaidNote =
    "CJ order is created. Auto-pay uses the CJ wallet — keep it funded so new orders pay without a card.";
  const { message: extraMessage, ...rest } = extra ?? {};
  return {
    ok: true,
    ...rest,
    message: snapshot.cjPaid ? "CJ order paid" : extraMessage || unpaidNote,
    cjOrderId: snapshot.cjOrderId,
    cjPayUrl: snapshot.cjPaid ? undefined : snapshot.cjPayUrl,
    cjPaid: snapshot.cjPaid,
    cjProductAmount: snapshot.cjProductAmount,
    cjPostageAmount: snapshot.cjPostageAmount,
    cjActualPayment: snapshot.cjActualPayment,
  };
}

/** Pay an existing CJ shopping order from wallet, then refresh product vs shipping amounts. */
export async function syncCjOrderPayment(orderId: string): Promise<CjFulfillResult> {
  const order = await loadOrderById(orderId);
  if (!order) return { ok: false, message: "Order not found" };

  const existing = (order.vendorFulfillments ?? []).find(
    (f) => f.vendorSlug === VENDOR_CJ_DROPSHIPPING && f.cjOrderId
  );
  if (!existing?.cjOrderId) {
    return { ok: true, skipped: true, message: "No CJ order on this OccasionFun order", order };
  }

  if (!existing.cjPaid) {
    await tryPayCjWallet(existing.cjOrderId);
  }

  const snapshot = await fetchCjSnapshot(existing.cjOrderId, {
    cjOrderId: existing.cjOrderId,
    cjOrderNumber: existing.cjOrderNumber,
    cjPayUrl: existing.cjPayUrl,
    cjPaid: Boolean(existing.cjPaid),
    cjPaidAt: existing.cjPaidAt,
    cjOrderStatus: existing.cjOrderStatus,
    cjProductAmount: existing.cjProductAmount,
    cjPostageAmount: existing.cjPostageAmount,
    cjActualPayment: existing.cjActualPayment,
  });

  const next = await persistCjSnapshot(order, snapshot);
  return { ...resultFromSnapshot(snapshot), order: next };
}

export async function fulfillOrderWithCj(
  orderId: string,
  options: {
    payType?: 1 | 2 | 3;
    logisticName?: string;
    fromCountryCode?: string;
  } = {}
): Promise<CjFulfillResult> {
  const order = await loadOrderById(orderId);
  if (!order) return { ok: false, message: "Order not found" };

  const existing = (order.vendorFulfillments ?? []).find(
    (f) => f.vendorSlug === VENDOR_CJ_DROPSHIPPING && f.cjOrderId
  );
  if (existing?.cjOrderId) {
    return syncCjOrderPayment(orderId);
  }

  const lines = await resolveCjFulfillmentLines(order);
  if (!lines.length) {
    return { ok: true, skipped: true, message: "No CJ Dropshipping lines on this order" };
  }

  const addr = order.shippingAddress;
  if (!addr?.name || !addr.line1 || !addr.city || !addr.country) {
    const message = "Shipping address is incomplete — cannot create a CJ order";
    await persistOrder(order, { cjFulfillError: message, cjFulfillAttemptedAt: now() });
    return { ok: false, message };
  }

  const products = lines.map((item) => ({
    vid: item.cjVid,
    sku: item.cjVid ? undefined : item.sku,
    quantity: item.quantity,
    storeLineItemId: item.lineId || item.productSlug,
    storeSku: item.sku,
    variantOptions: item.variantKey,
  }));

  const dest = (addr.country || "US").toUpperCase();
  const fromCountryCode = (options.fromCountryCode || "CN").toUpperCase();
  let logisticName = options.logisticName;
  if (!logisticName) {
    try {
      const freight = await cjFreightCalculate({
        startCountryCode: fromCountryCode,
        endCountryCode: dest,
        zip: addr.postalCode,
        products: lines
          .filter((l) => l.cjVid)
          .map((l) => ({ vid: l.cjVid as string, quantity: l.quantity })),
      });
      logisticName = cheapestLogistic(freight);
    } catch (err) {
      console.warn("CJ freight quote failed", err);
    }
  }
  if (!logisticName) logisticName = "CJPacket Ordinary";

  const pids = [...new Set(lines.map((item) => item.cjPid).filter((id): id is string => Boolean(id)))];
  for (const pid of pids) {
    try {
      await cjAddToMyProduct(pid);
    } catch (err) {
      console.warn("CJ addToMyProduct before fulfill failed", pid, err);
    }
  }

  try {
    const { created } = await createCjShoppingOrder(
      {
        orderNumber: order.orderNumber || order.orderId,
        shippingZip: addr.postalCode,
        shippingCountry: dest,
        shippingCountryCode: dest,
        shippingProvince: addr.state,
        shippingCity: addr.city,
        shippingPhone: addr.phone,
        shippingCustomerName: addr.name,
        shippingAddress: addr.line1,
        shippingAddress2: addr.line2 || "",
        email: addr.email,
        remark: `OccasionFun ${order.orderNumber || order.orderId}`,
        logisticName,
        fromCountryCode,
        platform: "API",
        shopLogisticsType: 2,
        products,
      },
      options.payType
    );

    const cjOrderId = created?.orderId;
    if (!cjOrderId) {
      const message = "CJ created an order but did not return an order id";
      await persistOrder(order, { cjFulfillError: message, cjFulfillAttemptedAt: now() });
      return { ok: false, message };
    }

    const createdSnap = snapshotFromCjRecord(created ?? {}, cjOrderId);
    const afterCreate = await persistCjSnapshot(order, createdSnap);

    const pay = await tryPayCjWallet(cjOrderId);
    const snapshot = await fetchCjSnapshot(cjOrderId, {
      ...createdSnap,
      cjPaid: createdSnap.cjPaid || pay.paid,
    });
    const next = await persistCjSnapshot(afterCreate, snapshot);
    return resultFromSnapshot(snapshot, {
      order: next,
      message: snapshot.cjPaid
        ? "CJ order paid"
        : pay.error
          ? `CJ order created but wallet pay failed: ${pay.error}. Keep the CJ wallet funded for automatic payment.`
          : undefined,
    });
  } catch (err) {
    const message = errorMessage(err);
    await persistOrder(order, { cjFulfillError: message, cjFulfillAttemptedAt: now() });
    return { ok: false, message };
  }
}
