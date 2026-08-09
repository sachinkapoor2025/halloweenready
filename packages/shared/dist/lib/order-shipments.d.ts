import type { CartItem } from "../schemas/cart";
import type { CheckoutShipment, OrderShipment, ShippingAddress } from "../schemas/order";
import type { ShopCurrency } from "../currency";
export declare function addressFingerprint(address: ShippingAddress): string;
/** Ensure checkout shipments cover every cart line exactly (by productSlug qty). */
export declare function validateShipmentsPartitionCart(cartItems: CartItem[], shipments: CheckoutShipment[]): string | null;
export declare function buildOrderShipments(input: {
    cartItems: CartItem[];
    checkoutShipments: CheckoutShipment[];
    currency: ShopCurrency;
    usdInrRate: number;
    /** When customerShippingMode is pass_through, skip threshold and use this single charge. */
    passThroughShipping?: number;
}): {
    shipments: OrderShipment[];
    shippingTotal: number;
} | {
    error: string;
};
/** Single-address fallback when client omits shipments[]. */
export declare function singleCheckoutShipment(shippingAddress: CheckoutShipment["shippingAddress"], cartItems: CartItem[]): CheckoutShipment;
