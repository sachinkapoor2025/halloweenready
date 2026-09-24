"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMarket } from "@/lib/market-context";
import {
  countryCodeFromPath,
  hrefForLocation,
  isLocationExemptPath,
  toLocationPath,
} from "@/lib/location-urls";

/**
 * Keeps the address bar and in-site links aligned with the selected country.
 * Home and city pages are left untouched.
 */
export function LocationUrlSync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { countryCode, market, loading, setMarketLocation } = useMarket();
  const previousCountry = useRef<string | null>(null);

  useEffect(() => {
    if (loading) return;

    const search = searchParams.toString();
    const current = search ? `${pathname}?${search}` : pathname;
    const urlCountry = countryCodeFromPath(pathname);
    const countryChanged = previousCountry.current !== null && previousCountry.current !== countryCode;
    previousCountry.current = countryCode;

    if (isLocationExemptPath(pathname)) return;

    if (urlCountry && urlCountry !== countryCode && !countryChanged) {
      setMarketLocation(urlCountry, undefined, "manual");
      return;
    }

    const desired = toLocationPath(current, countryCode);
    if (desired !== current) router.replace(desired);
  }, [countryCode, loading, pathname, router, searchParams, setMarketLocation]);

  useEffect(() => {
    if (loading) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      const raw = anchor.getAttribute("href");
      if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return;
      const next = hrefForLocation(raw, countryCode);
      if (next === raw) return;
      event.preventDefault();
      router.push(next);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [countryCode, loading, router]);

  if (loading || isLocationExemptPath(pathname)) return null;

  const name = market?.name;
  if (!name) return null;

  return (
    <p className="bg-orange-50 border-b border-orange-100 text-center text-xs sm:text-sm text-slate-700 px-4 py-2">
      Delivery destination: <span className="font-semibold text-primary">{name}</span>
      <span className="text-slate-500"> · Delivering in 5–7 days</span>
    </p>
  );
}
