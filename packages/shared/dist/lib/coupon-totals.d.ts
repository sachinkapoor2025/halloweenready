import { type ShopCurrency } from "../currency";
import { type CouponKind } from "../schemas/coupon";
/** Checkout total charged when a test-order coupon is applied ($1 USD, or INR equivalent). */
export declare function testOrderForceTotal(currency: ShopCurrency, usdInrRate?: number): number;
export declare function applyCouponToOrderTotals(input: {
    kind?: CouponKind | string;
    discountPercent?: number;
    eligibleSubtotal: number;
    subtotal: number;
    shipping: number;
    tax?: number;
    currency: ShopCurrency;
    usdInrRate?: number;
}): {
    discount: number;
    total: number;
};
