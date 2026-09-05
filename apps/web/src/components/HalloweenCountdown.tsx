"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HALLOWEEN_DATE = new Date("2026-10-31T00:00:00");
/** Order-by reminder for Halloween 2026 — not a delivery guarantee */
const ORDER_DEADLINE = new Date("2026-10-25T23:59:59");

function daysUntil(target: Date): number {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

type Variant = "banner" | "inline";

export function HalloweenCountdown({ variant = "banner" }: { variant?: Variant }) {
  const pathname = usePathname();
  const [daysToHalloween, setDaysToHalloween] = useState<number | null>(null);
  const [daysToOrder, setDaysToOrder] = useState<number | null>(null);

  useEffect(() => {
    setDaysToHalloween(daysUntil(HALLOWEEN_DATE));
    setDaysToOrder(daysUntil(ORDER_DEADLINE));
  }, []);

  if (
    variant === "banner" &&
    (pathname.startsWith("/admin") || pathname.startsWith("/ses-email"))
  ) {
    return null;
  }
  if (daysToHalloween === null) return null;
  if (daysToHalloween === 0 && daysToOrder === 0) return null;

  if (variant === "inline") {
    return (
      <p className="text-sm text-slate-600">
        <span className="font-semibold text-primary">Halloween 2026:</span> October 31
        {daysToHalloween > 0 && (
          <>
            {" "}
            · <span className="font-semibold text-nav">{daysToHalloween} days left</span>
          </>
        )}
        {daysToOrder !== null && daysToOrder > 0 && daysToOrder <= 14 && (
          <span className="block text-xs text-nav mt-0.5">
            Order within {daysToOrder} days for the best chance of arrival before Halloween
          </span>
        )}
      </p>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary via-spooky to-nav text-white text-center px-4 py-2.5 text-sm">
      <p>
        <span className="font-bold">Halloween 2026</span> — October 31
        {daysToHalloween > 0 && (
          <>
            {" "}
            · <span className="font-semibold text-orange-200">{daysToHalloween} days to go</span>
          </>
        )}
        {daysToOrder !== null && daysToOrder > 0 && daysToOrder <= 21 && (
          <> · Order by Oct 25 for more transit buffer</>
        )}
        {" · "}
        <Link href="/halloween-guide" className="underline underline-offset-2 hover:text-orange-200">
          Halloween guide
        </Link>
      </p>
    </div>
  );
}
