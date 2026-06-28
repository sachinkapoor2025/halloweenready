import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { HomeProductCard } from "@/components/HomeProductCard";
import { Suspense } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchTracker } from "@/components/SearchTracker";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import type { Product, Category } from "@halloweenready/shared";
import { homeCategoryOrder, orderCategories } from "@/lib/site";
import {
  getCatalogCategories,
  getCatalogProducts,
  getCatalogProductsByCategory,
} from "@/lib/catalog-fallback";
import { categorySlugVariants } from "@halloweenready/shared";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ search?: string; category?: string }>;
}

const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  "home-decoration": {
    title: "Halloween Home Decorations USA",
    description: "Shop spooky home decorations, yard props, and indoor Halloween decor with fast USA delivery.",
  },
  costumesandaccessories: {
    title: "Halloween Costumes & Accessories USA",
    description: "Shop adult, teen, and kids Halloween costumes and accessories with fast USA delivery.",
  },
  partysupplier: {
    title: "Halloween Party Supplies USA",
    description: "Plates, banners, balloons, and themed tableware for Halloween parties.",
  },
  toysandnovelty: {
    title: "Halloween Toys & Novelty USA",
    description: "Fun Halloween toys, games, and novelty items for kids and parties.",
  },
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  if (params.search) {
    return pageMetadata({
      title: `Search: ${params.search} — Halloween USA`,
      description: `Search results for "${params.search}" — Halloween products with USA delivery from HalloweenReady.`,
      path: `/products?search=${encodeURIComponent(params.search)}`,
    });
  }
  if (params.category && CATEGORY_SEO[params.category]) {
    const seo = CATEGORY_SEO[params.category];
    return pageMetadata({
      title: seo.title,
      description: seo.description,
      path: `/products?category=${params.category}`,
    });
  }
  return pageMetadata({
    title: "Shop Halloween — Shop Halloween to USA Online",
    description:
      "Browse 126+ Halloween products — single, combo, kids, Bhaiya Bhabhi & Lumba. Shop Halloween to all 50 US states. Order from India worldwide.",
    path: "/products",
  });
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search;
  const category = params.category;

  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (category) query.set("category", category);
    const qs = query.toString() ? `?${query.toString()}` : "";

    const [productsData, categoriesData] = await Promise.all([
      api<{ products: Product[] }>(`/products${qs}`),
      api<{ categories: Category[] }>("/categories"),
    ]);
    products = productsData.products;
    categories = categoriesData.categories;
  } catch {
    products = [];
    categories = [];
  }

  if (categories.length === 0) {
    categories = getCatalogCategories();
  }

  const catalogProducts = getCatalogProducts();
  if (catalogProducts.length > 0) {
    if (category) {
      if (products.length === 0) products = getCatalogProductsByCategory(category);
    } else if (!search) {
      const apiBySlug = new Map(products.map((p) => [p.slug, p]));
      products = catalogProducts.map((c) => apiBySlug.get(c.slug) ?? c);
    }
  }

  const h1 = search
    ? `Search: ${search}`
    : category
      ? categories.find((c) => c.slug === category)?.name ?? category.replace(/-/g, " ")
      : "Shop Halloween — Send to USA";

  const sortedCategories = orderCategories(categories);
  const categoryMap = new Map(categories.map((c) => [c.slug, c]));
  const productsByCategory = homeCategoryOrder.map((slug) => {
    const variants = new Set(categorySlugVariants(slug));
    return {
      slug,
      name: categoryMap.get(slug)?.name ?? slug.replace(/-/g, " "),
      products: products.filter((p) => variants.has(p.categorySlug)),
    };
  });
  const showGrouped = !search && !category;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {search ? <SearchTracker query={search} resultCount={products.length} /> : null}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          ...(category ? [{ label: h1 }] : [{ label: "Shop" }]),
        ]}
      />
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-primary">{h1}</h1>
      </div>
      {!search && !category && (
        <p className="text-slate-600 mb-8 max-w-2xl">
          Browse Halloween decorations, costumes, party supplies, and seasonal accessories with fast delivery
          across all 50 US states.
        </p>
      )}

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/products"
            className={`px-3 py-1 rounded-full text-sm border ${!category ? "bg-nav text-white border-nav" : "border-slate-300 hover:border-nav"}`}
          >
            All
          </Link>
          {sortedCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className={`px-3 py-1 rounded-full text-sm border ${category === c.slug ? "bg-nav text-white border-nav" : "border-slate-300 hover:border-nav"}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-slate-600">No products found. Try another category or search term.</p>
      ) : showGrouped ? (
        <div className="space-y-10">
          {productsByCategory.map((section) =>
            section.products.length > 0 ? (
              <section key={section.slug}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-primary capitalize">{section.name}</h2>
                  <Link href={`/categories/${section.slug}`} className="text-nav font-semibold text-sm hover:underline">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
                  {section.products.map((p) => (
                    <HomeProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </section>
            ) : null
          )}
        </div>
      ) : (
        <Suspense fallback={<p className="text-slate-500">Loading products…</p>}>
          <ProductGrid products={products} />
        </Suspense>
      )}
    </div>
  );
}
