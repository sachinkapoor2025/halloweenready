"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMarket } from "@/lib/market-context";
import { isLocationExemptPath, toLocationPath } from "@/lib/location-urls";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const pathname = usePathname();
  const { countryCode, market } = useMarket();
  const showLocation = !isLocationExemptPath(pathname) && Boolean(market?.name);

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const href = item.href ? toLocationPath(item.href, countryCode) : undefined;
          const isLast = i === items.length - 1;
          const label = showLocation && isLast ? `${item.label} · ${market?.name}` : item.label;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {href && !isLast ? (
                <Link href={href} className="hover:text-nav hover:underline">
                  {label}
                </Link>
              ) : (
                <span className="text-slate-700 font-medium">{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
