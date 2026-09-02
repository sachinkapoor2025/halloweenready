import Link from "next/link";
import type { Product } from "@halloweenready/shared";

/** SEO internal links from category pages to individual product URLs. */
export function CategoryProductLinks({
  products,
  categoryName,
}: {
  products: Product[];
  categoryName: string;
}) {
  if (products.length === 0) return null;

  const listed = products.slice(0, 24);

  return (
    <section className="mt-10 pt-8 border-t border-slate-200" aria-labelledby="category-product-links">
      <h2 id="category-product-links" className="text-xl font-bold text-primary mb-2">
        Shop {categoryName}
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Jump to individual product pages for photos, pricing, and a destination shipping quote.
        {products.length > listed.length ? ` Showing ${listed.length} of ${products.length} items.` : ""}
      </p>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm">
        {listed.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}`}
              className="text-nav font-medium hover:underline leading-snug"
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
