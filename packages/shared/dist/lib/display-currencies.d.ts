/** Display-only storefront currencies. Checkout remains USD (Stripe) or INR (Razorpay). */
export declare const PREFERRED_DISPLAY_CURRENCIES: readonly ["USD", "GBP", "CAD", "AUD", "AED", "EUR", "INR"];
/** Remaining currencies, after the preferred US/UK/CAN/AUS/UAE/EUR/IND list. */
export declare const REST_DISPLAY_CURRENCIES: readonly ["BDT", "BRL", "CHF", "CNY", "CZK", "DKK", "EGP", "HKD", "HUF", "IDR", "ILS", "JPY", "KES", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "QAR", "RON", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "VND", "ZAR"];
export declare const DISPLAY_CURRENCIES: readonly ["USD", "GBP", "CAD", "AUD", "AED", "EUR", "INR", "BDT", "BRL", "CHF", "CNY", "CZK", "DKK", "EGP", "HKD", "HUF", "IDR", "ILS", "JPY", "KES", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "QAR", "RON", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "VND", "ZAR"];
export type DisplayCurrency = (typeof DISPLAY_CURRENCIES)[number];
export type DisplayCurrencyOption = {
    code: DisplayCurrency;
    label: string;
    region: string;
};
export declare const DISPLAY_CURRENCY_OPTIONS: DisplayCurrencyOption[];
export declare function isDisplayCurrency(value: string): value is DisplayCurrency;
export declare function displayCurrencyFractionDigits(currency: DisplayCurrency): number;
export declare function displayCurrencyLocale(currency: DisplayCurrency): string;
/** ISO country → storefront display currency. Unknown countries default to USD. */
export declare function displayCurrencyForCountry(country: string | undefined): DisplayCurrency;
