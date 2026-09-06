import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isCjShoppingOrderPaid, parseCjMoney, snapshotFromCjRecord } from "./cj-order-snapshot";

describe("cj-order-snapshot", () => {
  it("treats CREATED without paymentDate as unpaid", () => {
    assert.equal(isCjShoppingOrderPaid({ orderStatus: "CREATED" }), false);
  });

  it("treats paymentDate as paid", () => {
    assert.equal(
      isCjShoppingOrderPaid({ orderStatus: "CREATED", paymentDate: "2026-09-06 12:00:00" }),
      true
    );
  });

  it("splits product vs postage from getOrderDetail", () => {
    const snap = snapshotFromCjRecord(
      {
        data: {
          orderId: "SD2609060641350658300",
          orderStatus: "IN_PROCESS",
          productAmount: "3.20",
          postageAmount: "7.51",
          actualPayment: "10.71",
          paymentDate: "2026-09-06 12:11:00",
        },
      },
      "SD2609060641350658300"
    );
    assert.equal(snap.cjPaid, true);
    assert.equal(snap.cjProductAmount, 3.2);
    assert.equal(snap.cjPostageAmount, 7.51);
    assert.equal(snap.cjActualPayment, 10.71);
    assert.equal(parseCjMoney("$10.71"), 10.71);
  });
});
