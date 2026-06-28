import { type ShopCurrency } from "../currency";
export type DisplayCurrency = ShopCurrency;
export declare function normalizeDisplayCurrency(value: string): DisplayCurrency;
export declare function convertCurrency(amount: number, from: DisplayCurrency, to: DisplayCurrency, rate: number): number;
