import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { VENDOR_ORANGE_COUNTY, VENDOR_HALLOWEENREADY } from "../constants";
import {
  allVendorsHaveTracking,
  ensureVendorFulfillments,
  isMultiVendorOrder,
  orderVendorKeys,
  upsertVendorFulfillment,
} from "./order-vendors";

describe("order-vendors", () => {
  it("detects mixed OC + HalloweenReady carts", () => {
    const order = {
      items: [
        { vendorSlug: VENDOR_ORANGE_COUNTY },
        { name: "plain" },
      ],
    };
    assert.deepEqual(orderVendorKeys(order), [VENDOR_ORANGE_COUNTY, VENDOR_HALLOWEENREADY]);
    assert.equal(isMultiVendorOrder(order), true);
  });

  it("backfills legacy tracking onto sole vendor", () => {
    const rows = ensureVendorFulfillments({
      items: [{ vendorSlug: VENDOR_ORANGE_COUNTY }],
      trackingNumber: "AWB1",
      carrier: "UPS",
    });
    assert.equal(rows.length, 1);
    assert.equal(rows[0]?.trackingNumber, "AWB1");
    assert.equal(rows[0]?.carrier, "UPS");
  });

  it("requires all vendors for full ship", () => {
    let rows = ensureVendorFulfillments({
      items: [{ vendorSlug: VENDOR_ORANGE_COUNTY }, {}],
    });
    rows = upsertVendorFulfillment(rows, {
      vendorSlug: VENDOR_ORANGE_COUNTY,
      trackingNumber: "OC-1",
    });
    assert.equal(allVendorsHaveTracking(rows), false);
    rows = upsertVendorFulfillment(rows, {
      vendorSlug: VENDOR_HALLOWEENREADY,
      trackingNumber: "US-1",
    });
    assert.equal(allVendorsHaveTracking(rows), true);
  });

  it("keeps CJ paid amounts when patching tracking", () => {
    const rows = upsertVendorFulfillment(
      [
        {
          vendorSlug: "cj-dropshipping",
          status: "processing",
          cjOrderId: "SD1",
          cjPaid: true,
          cjProductAmount: 3.2,
          cjPostageAmount: 7.51,
          cjActualPayment: 10.71,
        },
      ],
      { vendorSlug: "cj-dropshipping", trackingNumber: "CJTRACK" }
    );
    assert.equal(rows[0]?.cjPaid, true);
    assert.equal(rows[0]?.cjProductAmount, 3.2);
    assert.equal(rows[0]?.cjPostageAmount, 7.51);
    assert.equal(rows[0]?.trackingNumber, "CJTRACK");
    assert.equal(rows[0]?.status, "shipped");
  });
});
