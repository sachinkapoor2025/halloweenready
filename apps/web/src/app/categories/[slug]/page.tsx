import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { Suspense } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryContentSection } from "@/components/CategoryContentSection";
import { CategoryProductLinks } from "@/components/CategoryProductLinks";
import { JsonLd } from "@/components/JsonLd";
import { getCategoryContent } from "@/lib/content/category-content";
import { getCategoryPageSeo } from "@/lib/content/category-seo";
import { getCategoryRichContent } from "@/lib/content/category-rich-content";
import { seoLocations } from "@/lib/content/seo-data";
import { getCatalogCategory, getCatalogProductsByCategory } from "@/lib/catalog-fallback";
import { resolveImageUrl } from "@/lib/images";
import { withListingImages } from "@/lib/product-loader";
import { categoryOrder } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";
import type { Product, Category } from "@halloweenready/shared";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Pick 2–3 varied city pages from seoLocations based on category slug hash. */
function pickShipsToCities(categorySlug: string, count = 3) {
  const locs = seoLocations;
  if (locs.length === 0) return [];
  let hash = 0;
  for (let i = 0; i < categorySlug.length; i++) {
    hash = (hash + categorySlug.charCodeAt(i) * (i + 1)) % 997;
  }
  const picked: typeof locs = [];
  const used = new Set<string>();
  for (let i = 0; picked.length < Math.min(count, locs.length) && i < locs.length * 2; i++) {
    const loc = locs[(hash + i * 11) % locs.length];
    if (!used.has(loc.slug)) {
      used.add(loc.slug);
      picked.push(loc);
    }
  }
  return picked;
}

export function generateStaticParams() {
  return categoryOrder.map((slug) => ({ slug }));
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seo = getCategoryPageSeo(slug);
  const path = `/categories/${slug}`;

  if (seo) {
    return pageMetadata({
      title: seo.title,
      description: seo.description,
      path,
      absoluteTitle: true,
      keywords: seo.keywords,
    });
  }

  const fallback = getCatalogCategory(slug);
  try {
    const data = await api<{ category: Category }>(`/categories/${slug}`, { revalidate: 3600 });
    const c = data.category;
    return pageMetadata({
      title: `${c.name} — Halloween Decor & Supplies | USA Shipping`,
      description:
        c.seoDescription ??
        c.description?.slice(0, 160) ??
        `Shop ${c.name} with fast USA delivery from HalloweenReady.`,
      path,
    });
  } catch {
    const name = fallback?.name ?? slug.replace(/-/g, " ");
    return pageMetadata({
      title: `${name} — Halloween USA`,
      description: `Shop ${name} with USA delivery from HalloweenReady.`,
      path,
    });
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let category: Category | null = null;
  let products: Product[] = [];

  try {
    const catData = await api<{ category: Category }>(`/categories/${slug}`, { revalidate: 3600 });
    category = catData.category;
  } catch {
    category = getCatalogCategory(slug) ?? null;
  }

  try {
    const prodData = await api<{ products: Product[] }>(`/products?category=${slug}`, { revalidate: 60 });
    products = withListingImages(prodData.products);
  } catch {
    products = [];
  }

  if (products.length === 0) {
    products = withListingImages(getCatalogProductsByCategory(slug));
  }

  if (!category) {
    category = getCatalogCategory(slug) ?? null;
  }

  if (!category && products.length === 0 && !categoryOrder.includes(slug as (typeof categoryOrder)[number])) {
    notFound();
  }

  const name = category?.name ?? slug.replace(/-/g, " ");
  const pageSeo = getCategoryPageSeo(slug);
  const h1 = pageSeo?.h1 ?? `${name} — Halloween USA`;
  const baseDescription =
    category?.description?.trim() ||
    `Browse our ${name} collection — Halloween products delivered to all 50 US states.`;
  const extra = getCategoryContent(slug);
  const rich = getCategoryRichContent(slug);
  const shipsTo = pickShipsToCities(slug, 3);
  const heroSrc = category?.image ? resolveImageUrl(category.image) : null;
  const heroAlt = pageSeo?.alt ?? `${name} — HalloweenReady`;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs.map((c) => ({ name: c.label, path: c.href ?? `/categories/${slug}` }))),
          itemListJsonLd(
            `${name} — HalloweenReady USA`,
            products.map((p) => ({ name: p.name, path: `/products/${p.slug}` }))
          ),
          ...(rich ? [faqJsonLd(rich.faqs)] : []),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold text-primary mb-6">{h1}</h1>

      {heroSrc ? (
        <div className="relative w-full aspect-[21/9] max-h-64 mb-8 overflow-hidden rounded-xl bg-slate-100">
          <Image src={heroSrc} alt={heroAlt} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" priority />
        </div>
      ) : null}

      {products.length > 0 ? (
        <Suspense fallback={<p className="text-slate-500">Loading products…</p>}>
          <ProductGrid products={products} />
        </Suspense>
      ) : (
        <p className="text-slate-500">
          Products loading soon.{" "}
          <Link href="/products" className="text-nav hover:underline">
            Browse all Halloween items
          </Link>
        </p>
      )}

      <CategoryProductLinks products={products} categoryName={name} />

      {shipsTo.length > 0 && (
        <section className="mt-8 text-sm text-slate-600">
          <h2 className="font-semibold text-primary mb-2">Ships nationwide</h2>
          <p className="flex flex-wrap gap-x-1 gap-y-1">
            {shipsTo.map((city, i) => (
              <span key={city.slug}>
                <Link href={`/cities/${city.slug}`} className="text-nav hover:underline">
                  Ships to {city.label}
                </Link>
                {i < shipsTo.length - 1 ? <span className="text-slate-400"> · </span> : null}
              </span>
            ))}
          </p>
        </section>
      )}

      {rich ? (
        <CategoryContentSection content={rich} categoryName={name} products={products} />
      ) : (
        <>
          <section className="mt-12 pt-10 border-t border-slate-200">
            <div className="grid lg:grid-cols-2 gap-x-12 gap-y-6 text-slate-700 leading-relaxed">
              <div className="space-y-4">
                {baseDescription.split(/(?<=\.)\s+/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                {extra?.extraParagraphs.map((para, i) => (
                  <p key={`extra-${i}`}>{para}</p>
                ))}
              </div>
              {extra?.sections && extra.sections.length > 0 && (
                <div className="space-y-6">
                  {extra.sections.map((section) => (
                    <div key={section.heading}>
                      <h2 className="text-lg font-bold text-primary mb-3">{section.heading}</h2>
                      <ul className="space-y-2 text-sm">
                        {section.paragraphs.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-nav mt-1 shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="mt-10 p-6 bg-slate-50 rounded-xl spooky-panel">
            <h2 className="font-semibold text-primary mb-3">Why order {name} from HalloweenReady?</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-nav shrink-0">✓</span>
                Fast Halloween delivery to all 50 US states (5–7 business days)
              </li>
              <li className="flex gap-2">
                <span className="text-nav shrink-0">✓</span>
                Premium decorations, costumes, and party supplies
              </li>
              <li className="flex gap-2">
                <span className="text-nav shrink-0">✓</span>
                Same-day dispatch on most orders
              </li>
              <li className="flex gap-2">
                <span className="text-nav shrink-0">✓</span>
                Secure checkout with Razorpay and Stripe
              </li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
