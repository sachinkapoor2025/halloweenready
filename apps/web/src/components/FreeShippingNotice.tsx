"use client";

import { FREE_SHIPPING_MIN_SUBTOTAL_USD, type FreeShippingQuote } from "@halloweenready/shared";
import type { DisplayCurrency } from "@/lib/currency-context";

type Props = {
  quote: FreeShippingQuote;
  formatMoney: (amount: number, currency: DisplayCurrency) => string;
  currency: DisplayCurrency;
  className?: string;
};

function moneyLabel(
  usdAmount: number,
  amountInCurrency: number,
  currency: DisplayCurrency,
  formatMoney: Props["formatMoney"]
): string {
  return currency === "USD" ? `$${usdAmount}` : formatMoney(amountInCurrency, currency);
}

/** Upsell when cart is below the free-shipping threshold. */
export function FreeShippingNotice({ quote, formatMoney, currency, className = "" }: Props) {
  if (quote.qualifiesForFreeShipping) {
    return (
      <div
        className={`text-xs text-green-800 bg-green-50 border border-green-100 rounded-md px-3 py-2 ${className}`}
      >
        <p className="font-semibold">Free shipping unlocked on this order ($49+).</p>
      </div>
    );
  }

  const freeLabel = moneyLabel(
    FREE_SHIPPING_MIN_SUBTOTAL_USD,
    quote.thresholdInCurrency,
    currency,
    formatMoney
  );
  const currentFee = formatMoney(quote.charge, currency);
  const nextFee = formatMoney(quote.midTierFeeInCurrency, currency);
  const showNextPaid = quote.amountAwayFromReducedShipping > 0;

  return (
    <div
      className={`text-xs text-amber-950 bg-amber-50 border border-amber-100 rounded-md px-3 py-2 ${className}`}
    >
      <p className="font-semibold mb-1">Shipping today: {currentFee}</p>
      <ul className="list-disc pl-4 space-y-0.5 leading-snug">
        {showNextPaid ? (
          <li>
            Add {formatMoney(quote.amountAwayFromReducedShipping, currency)} more → shipping drops to{" "}
            <strong>{nextFee}</strong>
          </li>
        ) : null}
        <li>
          Add {formatMoney(quote.amountAwayFromFreeShipping, currency)} more to get{" "}
          <strong>free shipping</strong> ({freeLabel}+)
        </li>
      </ul>
    </div>
  );
}
