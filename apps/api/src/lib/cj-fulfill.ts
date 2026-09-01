import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import {
  VENDOR_CJ_DROPSHIPPING,
  orderKeys,
  upsertVendorFulfillment,
  type Order,
} from "@halloweenready/shared";
import { docClient, ORDERS_TABLE, now } from "./db";
import { cjCreateOrderV2, cjFreightCalculate } from "./cj-dropshipping";

type StoredOrder = Order & Record<string, unknown>;

function cjLines(order: Order) {
  return (order.items ?? []).filter(
    (item) => item.vendorSlug === VENDOR_CJ_DROPSHIPPING && (item.cjVid || item.sku)
  );
}

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

export async function fulfillOrderWithCj(
  orderId: string,
  options: {
    payType?: 1 | 2 | 3;
    logisticName?: string;
    fromCountryCode?: string;
  } = {}
): Promise<{
  ok: boolean;
  skipped?: boolean;
  message: string;
  cjOrderId?: string;
  cjPayUrl?: string;
}> {
  const result = await docClient.send(
    new GetCommand({
      TableName: ORDERS_TABLE,
      Key: { PK: orderKeys.pk(orderId), SK: orderKeys.sk() },
    })
  );
  const order = result.Item as StoredOrder | undefined;
  if (!order) return { ok: false, message: "Order not found" };

  const existing = (order.vendorFulfillments ?? []).find(
    (f) => f.vendorSlug === VENDOR_CJ_DROPSHIPPING && f.cjOrderId
  );
  if (existing?.cjOrderId) {
    return {
      ok: true,
      skipped: true,
      message: "CJ order already created",
      cjOrderId: existing.cjOrderId,
      cjPayUrl: existing.cjPayUrl,
    };
  }

  const lines = cjLines(order);
  if (!lines.length) {
    return { ok: true, skipped: true, message: "No CJ Dropshipping lines on this order" };
  }

  const addr = order.shippingAddress;
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

  const created = await cjCreateOrderV2({
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
    remark: `HalloweenReady ${order.orderNumber || order.orderId}`,
    payType: options.payType ?? 3,
    logisticName,
    fromCountryCode,
    platform: "api",
    products,
  });

  const cjOrderId = created?.orderId;
  const timestamp = now();
  const fulfillments = upsertVendorFulfillment(order.vendorFulfillments ?? [], {
    vendorSlug: VENDOR_CJ_DROPSHIPPING,
    status: "processing",
    updatedAt: timestamp,
    cjOrderId,
    cjOrderNumber: created?.orderNumber,
    cjPayUrl: created?.cjPayUrl,
  });

  await docClient.send(
    new PutCommand({
      TableName: ORDERS_TABLE,
      Item: {
        ...order,
        vendorFulfillments: fulfillments,
        updatedAt: timestamp,
      },
    })
  );

  return {
    ok: true,
    message: "CJ order created",
    cjOrderId,
    cjPayUrl: created?.cjPayUrl,
  };
}
