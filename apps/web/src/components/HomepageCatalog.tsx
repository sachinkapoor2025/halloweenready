"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@halloweenready/shared";
import { TrackedProductCard } from "@/components/TrackedProductCard";

type SnapshotGroup = { id: string; title: string; slugs: string[] };
type Snapshot = {
  generatedAt: string;
  poolSize: number;
  groups: SnapshotGroup[];
  ranked: string[];
};

const PREVIEW = 20;
const MORE_STEP = 40;

export function HomepageCatalog({
  products,
  snapshot,
}: {
  products: Product[];
  snapshot: Snapshot;
}) {
  const bySlug = useMemo(() => new Map(products.map((p) => [p.slug, p])), [products]);
  const [moreCount, setMoreCount] = useState(PREVIEW);

  const featuredIds = new Set(["top", "trending", "most_clicked", "most_ordered", "best_sellers", "new", "hidden", "explore", "pinned"]);
  const featured = snapshot.groups.filter((g) => featuredIds.has(g.id) && g.slugs.length > 0);

  const shown = new Set<string>();
  const featuredBlocks = featured.map((group) => {
    const items = group.slugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Product => p != null)
      .filter((p) => {
        if (shown.has(p.slug)) return false;
        shown.add(p.slug);
        return true;
      })
      .slice(0, group.id === "top" ? 40 : 20);
    return { ...group, items };
  }).filter((g) => g.items.length > 0);

  const remainder = snapshot.ranked
    .map((slug) => bySlug.get(slug))
    .filter((p): p is Product => p != null && !shown.has(p.slug));
  const more = remainder.slice(0, moreCount);

  return (
    <>
      {featuredBlocks.map((group) => (
        <section key={group.id} className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="halloween-heading text-xl md:text-2xl">{group.title}</h2>
            <Link href="/products" className="text-nav font-semibold text-sm hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
            {group.items.map((p, i) => (
              <TrackedProductCard
                key={`${group.id}-${p.slug}`}
                product={p}
                position={i + 1}
                listingPage="homepage"
                showFastSellingBadge={group.id === "trending" || group.id === "best_sellers"}
              />
            ))}
          </div>
        </section>
      ))}

      {remainder.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="halloween-heading text-xl md:text-2xl">More Halloween picks</h2>
            <p className="text-xs text-slate-500">
              Ranked pool {snapshot.poolSize} products · not a static list
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
            {more.map((p, i) => (
              <TrackedProductCard
                key={`more-${p.slug}`}
                product={p}
                position={featuredBlocks.reduce((n, g) => n + g.items.length, 0) + i + 1}
                listingPage="homepage"
              />
            ))}
          </div>
          {moreCount < remainder.length && (
            <div className="text-center mt-8">
              <button
                type="button"
                className="rounded-lg bg-nav px-5 py-2.5 text-sm font-semibold text-white"
                onClick={() => setMoreCount((n) => Math.min(n + MORE_STEP, remainder.length))}
              >
                Load more ({Math.min(MORE_STEP, remainder.length - moreCount)} of {remainder.length - moreCount} left)
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
