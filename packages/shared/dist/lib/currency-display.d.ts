import { type ShopCurrency } from "../currency";
import { type DisplayCurrency } from "./display-currencies";
export type { DisplayCurrency };
export { DISPLAY_CURRENCIES, DISPLAY_CURRENCY_OPTIONS, PREFERRED_DISPLAY_CURRENCIES, REST_DISPLAY_CURRENCIES, displayCurrencyForCountry, displayCurrencyFractionDigits, displayCurrencyLocale, isDisplayCurrency, } from "./display-currencies";
export declare function normalizeDisplayCurrency(value: string): DisplayCurrency;
/** Last-resort USD→X rates when live FX is unavailable. */
export declare const DEFAULT_USD_RATES: Record<DisplayCurrency, number>;
export declare function usdRateFor(currency: DisplayCurrency, rates: Record<string, number> | number): number;
export declare function roundDisplayAmount(amount: number, currency: DisplayCurrency): number;
/**
 * Convert between display currencies.
 * `rateOrRates` may be the legacy USD→INR number or a USD→currency map.
 */
export declare function convertCurrency(amount: number, from: DisplayCurrency | ShopCurrency | string, to: DisplayCurrency | ShopCurrency | string, rateOrRates: number | Record<string, number>): number;
export declare function completeUsdRates(partial?: Record<string, number>): Record<DisplayCurrency, number>;
