/** Parsed CJ shopping-order payment + cost fields (USD). */
export type CjOrderSnapshot = {
  cjOrderId: string;
  cjOrderNumber?: string;
  cjPayUrl?: string;
  cjPaid: boolean;
  cjPaidAt?: string;
  cjOrderStatus?: string;
  cjProductAmount?: number;
  cjPostageAmount?: number;
  cjActualPayment?: number;
};

export function unwrapCjRecord(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== "object") return {};
  const rec = data as Record<string, unknown>;
  if (rec.data && typeof rec.data === "object" && !Array.isArray(rec.data)) {
    return rec.data as Record<string, unknown>;
  }
  return rec;
}

export function parseCjMoney(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

export function isCjShoppingOrderPaid(detail: Record<string, unknown>): boolean {
  const paymentDate = String(detail.paymentDate ?? detail.payDate ?? detail.paidTime ?? "").trim();
  if (paymentDate && paymentDate.toLowerCase() !== "null") return true;

  const status = String(detail.orderStatus ?? detail.status ?? "").toUpperCase();
  if (/UNPAY|UNPAID|NO_PAY|CREATED|PENDING_PAY|WAIT.*PAY/.test(status)) return false;
  if (/PAID|IN_PROCESS|STOCKED|SHIPPED|DELIVERED|COMPLETE|PICK|PACK|DISPATCH|FULFILL/.test(status)) {
    return true;
  }

  const paidFlag = detail.isPaid ?? detail.paid;
  if (paidFlag === true || paidFlag === 1 || paidFlag === "1" || paidFlag === "true") return true;
  return false;
}

export function snapshotFromCjRecord(
  data: unknown,
  fallbackOrderId: string
): CjOrderSnapshot {
  const rec = unwrapCjRecord(data);
  const cjOrderId = String(rec.orderId ?? rec.cjOrderId ?? fallbackOrderId);
  const cjOrderNumber = rec.orderNumber ? String(rec.orderNumber) : undefined;
  const cjPayUrl = rec.cjPayUrl ? String(rec.cjPayUrl) : undefined;
  const cjOrderStatus = rec.orderStatus
    ? String(rec.orderStatus)
    : rec.status
      ? String(rec.status)
      : undefined;
  const cjPaidAt = String(rec.paymentDate ?? rec.payDate ?? rec.paidTime ?? "").trim() || undefined;
  return {
    cjOrderId,
    ...(cjOrderNumber ? { cjOrderNumber } : {}),
    ...(cjPayUrl ? { cjPayUrl } : {}),
    cjPaid: isCjShoppingOrderPaid(rec),
    ...(cjPaidAt && cjPaidAt.toLowerCase() !== "null" ? { cjPaidAt } : {}),
    ...(cjOrderStatus ? { cjOrderStatus } : {}),
    cjProductAmount: parseCjMoney(rec.productAmount),
    cjPostageAmount: parseCjMoney(rec.postageAmount),
    cjActualPayment: parseCjMoney(rec.actualPayment ?? rec.orderAmount),
  };
}
