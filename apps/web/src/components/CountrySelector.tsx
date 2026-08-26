"use client";

import { useEffect, useState } from "react";
import { useMarket } from "@/lib/market-context";

export function CountrySelector({ compact = false }: { compact?: boolean }) {
  const { countryCode, postalCode, markets, market, setMarketLocation, checkServiceability, lastServiceability } =
    useMarket();
  const [open, setOpen] = useState(false);
  const [draftCountry, setDraftCountry] = useState(countryCode);
  const [draftPostal, setDraftPostal] = useState(postalCode);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    setDraftCountry(countryCode);
    setDraftPostal(postalCode);
  }, [countryCode, postalCode, open]);

  const selected = markets.find((m) => m.countryCode === draftCountry) ?? market;
  const label = market
    ? `${market.flagEmoji} ${market.name}${postalCode ? ` — ${postalCode}` : ""}`
    : "Select delivery country";

  const save = async () => {
    setChecking(true);
    setMarketLocation(draftCountry, draftPostal.trim(), "manual");
    await checkServiceability();
    setChecking(false);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          compact
            ? "flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-nav"
            : "flex items-center gap-2 rounded-full border border-slate-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-nav"
        }
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className="truncate max-w-[220px] sm:max-w-[280px]">
          {compact ? market?.flagEmoji ?? "🌍" : `Delivering to: ${label}`}
        </span>
        <span className="text-[10px] uppercase tracking-wide text-nav">Change</span>
      </button>

      {open && (
        <>
          <button type="button" className="fixed inset-0 z-40 bg-black/20" aria-label="Close" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-label="Change delivery country"
            className="absolute right-0 z-50 mt-2 w-[min(92vw,360px)] rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
          >
            <p className="text-sm font-bold text-primary mb-3">Change country / delivery location</p>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Country</label>
            <select
              value={draftCountry}
              onChange={(e) => setDraftCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm mb-3"
            >
              {markets.map((m) => (
                <option key={m.countryCode} value={m.countryCode}>
                  {m.flagEmoji} {m.name}
                </option>
              ))}
            </select>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              {selected?.postalLabel ?? "Postal / ZIP code"}
            </label>
            <input
              value={draftPostal}
              onChange={(e) => setDraftPostal(e.target.value)}
              placeholder={selected?.postalLabel ?? "Postal code"}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm mb-2"
            />
            {lastServiceability?.postalMessage && !lastServiceability.postalValid && (
              <p className="text-xs text-red-600 mb-2">{lastServiceability.postalMessage}</p>
            )}
            {lastServiceability?.deliverable && lastServiceability.warehouse && (
              <p className="text-xs text-emerald-700 mb-2">
                Ships from {lastServiceability.warehouse.name}
                {lastServiceability.warehouse.estimatedDeliveryDays
                  ? ` · about ${lastServiceability.warehouse.estimatedDeliveryDays} days`
                  : ""}
              </p>
            )}
            <div className="flex justify-end gap-2 mt-2">
              <button type="button" className="text-sm px-3 py-1.5 text-slate-600" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void save()}
                disabled={checking}
                className="rounded-lg bg-nav px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {checking ? "Checking…" : "Save location"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
