import Link from "next/link";
import { HomeProductCard } from "@/components/HomeProductCard";
import { loadStorefrontListing } from "@/lib/product-loader";

export async function HomepageHampers() {
  const listing = await loadStorefrontListing({
    category: "halloween-hampers",
    limit: 10,
    revalidate: false,
  });
  const products = listing.products;
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 section-spooky-divider">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="halloween-heading text-xl md:text-2xl">Halloween Hampers</h2>
          <p className="text-sm text-slate-600 mt-1">
            Ready-to-gift kits from $49 — free shipping. Swap included items at the same hamper price.
          </p>
        </div>
        <Link href="/categories/halloween-hampers" className="text-nav font-semibold text-sm hover:underline shrink-0 ml-4">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
        {products.map((p) => (
          <HomeProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
