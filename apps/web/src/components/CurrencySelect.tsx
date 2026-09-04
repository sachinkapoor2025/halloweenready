"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DISPLAY_CURRENCY_OPTIONS } from "@halloweenready/shared";
import { useCurrency } from "@/lib/currency-context";

export function CurrencySelect({
  variant = "inline",
  className = "",
}: {
  variant?: "inline" | "rail" | "header";
  className?: string;
}) {
  const { displayCurrency, setDisplayCurrency } = useCurrency();
  const labelId = useId();
  const selected = DISPLAY_CURRENCY_OPTIONS.find((o) => o.code === displayCurrency);

  if (variant === "header") {
    return (
      <label className={`inline-flex items-center ${className}`}>
        <span className="sr-only">Currency</span>
        <select
          value={displayCurrency}
          onChange={(e) => setDisplayCurrency(e.target.value)}
          aria-label="Currency"
          className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] sm:text-xs font-bold text-slate-800 hover:border-nav focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {DISPLAY_CURRENCY_OPTIONS.map((option) => (
            <option key={option.code} value={option.code} title={option.region}>
              {option.code}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (variant === "inline") {
    return (
      <div className={className}>
        <label htmlFor={labelId} className="block text-xs font-semibold text-slate-500 mb-1">
          Currency
        </label>
        <select
          id={labelId}
          value={displayCurrency}
          onChange={(e) => setDisplayCurrency(e.target.value)}
          className="w-full max-w-[160px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
          aria-label="Display currency"
        >
          {DISPLAY_CURRENCY_OPTIONS.map((option) => (
            <option key={option.code} value={option.code} title={option.region}>
              {option.code}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return <CurrencyRailSelect label={selected?.code ?? displayCurrency} />;
}

function CurrencyRailSelect({ label }: { label: string }) {
  const { displayCurrency, setDisplayCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className="relative z-[70]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Change display currency"
        className="w-14 py-3 text-[11px] sm:text-xs font-bold tracking-wide text-white bg-primary hover:bg-primary/90"
      >
        {label}
        <span className="block text-[9px] font-semibold opacity-80">▼</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-full top-0 mr-1 w-28 max-h-80 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-xl z-[80]"
        >
          {DISPLAY_CURRENCY_OPTIONS.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                role="option"
                aria-selected={option.code === displayCurrency}
                title={option.region}
                onClick={() => {
                  setDisplayCurrency(option.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs ${
                  option.code === displayCurrency
                    ? "bg-orange-50 font-bold text-primary"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {option.code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
