"use client";

import { usePathname } from "next/navigation";
import { CurrencySelect } from "@/components/CurrencySelect";

export function CurrencySwitcher() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/ses-email")) return null;

  // Hide on checkout/cart so the rail does not cover payment badges on mobile.
  if (
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/orders")
  ) {
    return null;
  }

  return (
    <div
      className="fixed right-0 top-[42%] sm:top-1/2 -translate-y-1/2 z-30 flex flex-col shadow-lg rounded-l-md overflow-hidden pointer-events-auto"
      role="group"
      aria-label="Currency switcher"
    >
      <CurrencySelect variant="rail" />
    </div>
  );
}
