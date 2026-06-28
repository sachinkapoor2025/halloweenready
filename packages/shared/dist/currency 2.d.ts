import type { CartItem } from "./schemas/cart";
export type ShopCurrency = "USD" | "INR";
/** Last-resort fallback when live providers are unavailable (~Jun 2026). */
export declare const DEFAULT_USD_INR_RATE = 96;
export type ExchangeRateQuote = {
    rate: number;
    source: string;
    asOf: string;
};
export declare function roundForCurrency(amount: number, currency: ShopCurrency): number;
export declare function convertCurrencyAmount(amount: number, from: ShopCurrency, to: ShopCurrency, rate: number): number;
/** Convert cart line items to the checkout currency (e.g. USD catalog → INR Razorpay). */
export declare function convertCartItemsToCurrency(items: CartItem[], to: ShopCurrency, rate: number): CartItem[];
export declare function cartSubtotal(items: CartItem[]): number;
export declare function resolveUsdInrRate(envRate?: string | number): number;
/** Fetch USD→INR from public rate APIs (no API key). Tries multiple providers. */
export declare function fetchLiveUsdInrRate(): Promise<ExchangeRateQuote | null>;
