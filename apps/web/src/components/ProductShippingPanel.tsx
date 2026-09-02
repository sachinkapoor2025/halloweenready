"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  CJ_STOREFRONT_SHIP_COUNTRIES,
  CJ_STOREFRONT_SHIP_COUNTRY_NAMES,
  cjStorefrontProductShippingPath,
  isCjDropshippingProduct,
  type CjStorefrontShipCountry,
  type Product,
  type ProductShippingResponse,
} from "@halloweenready/shared";
import { EstimatedDeliveryNote } from "@/components/EstimatedDeliveryNote";

function usd(n: number): string {
  return n <= 0 ? "Free" : `$${n.toFixed(2)}`;
}

export function ProductShippingPanel({
  product,
  vid,
}: {
  product: Product;
  vid?: string;
}) {
  const isCj = isCjDropshippingProduct(product);
  const [country, setCountry] = useState<CjStorefrontShipCountry>("US");
  const [shipping, setShipping] = useState<ProductShippingResponse | null>(null);
  const [loading, setLoading] = useState(isCj);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isCj) return;
    let cancelled = false;
    setLoading(true);
    setError(false);
    api<{ shipping: ProductShippingResponse }>(
      cjStorefrontProductShippingPath(product.slug, {
        country,
        ...(vid ? { vid } : {}),
      }),
      { revalidate: false }
    )
      .then((data) => {
        if (!cancelled) setShipping(data.shipping);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isCj, product.slug, country, vid]);

  if (!isCj) {
    return <EstimatedDeliveryNote variant="banner" prefix="Estimated delivery:" className="mb-4" />;
  }

  const methods = shipping?.methods ?? [];

  return (
    <div className="mb-4 rounded-md border border-orange-100 bg-orange-50/60 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 border-b border-orange-100">
        <p className="text-sm font-semibold text-primary">Shipping from China</p>
        <label className="text-xs text-slate-600 flex items-center gap-1.5">
          Deliver to
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as CjStorefrontShipCountry)}
            className="text-sm border border-slate-300 rounded bg-white px-1.5 py-1 text-slate-800"
          >
            {CJ_STOREFRONT_SHIP_COUNTRIES.map((code) => (
              <option key={code} value={code}>
                {CJ_STOREFRONT_SHIP_COUNTRY_NAMES[code]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="px-3 py-2.5 space-y-2">
        {shipping && (
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-primary">You pay at checkout:</span>{" "}
            {shipping.customerChargeLabel}
          </p>
        )}

        {loading && <p className="text-sm text-slate-500">Loading carrier options…</p>}
        {error && (
          <p className="text-sm text-slate-600">
            Typical delivery from China is 7–15 days. Exact methods load when the quote is available.
          </p>
        )}

        {!loading && !error && methods.length > 0 && (
          <div className="overflow-x-auto rounded border border-orange-100 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-nav text-white text-left">
                  <th className="font-semibold px-3 py-2">Shipping method</th>
                  <th className="font-semibold px-3 py-2 whitespace-nowrap">Delivery time</th>
                  <th className="font-semibold px-3 py-2 text-right whitespace-nowrap">Carrier quote</th>
                </tr>
              </thead>
              <tbody>
                {methods.map((m) => (
                  <tr key={m.name} className="border-t border-slate-100">
                    <td className="px-3 py-2 text-slate-800">{m.name}</td>
                    <td className="px-3 py-2 text-slate-700 whitespace-nowrap">{m.daysLabel}</td>
                    <td className="px-3 py-2 text-right font-medium text-slate-800 whitespace-nowrap">
                      {usd(m.priceUsd)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && methods.length === 0 && (
          <p className="text-sm text-slate-600">
            Ships from China to {shipping?.destCountryName ?? "the United States"}. Transit is typically
            7–15 days depending on the carrier.
          </p>
        )}

        <p className="text-xs text-slate-500">
          Carrier quotes are live from CJ Dropshipping (China → {shipping?.destCountryName ?? "United States"}).
          Checkout shipping is our store rate; we cover any gap vs the carrier.
        </p>
      </div>
    </div>
  );
}
