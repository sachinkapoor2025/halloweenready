import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { HomeProductCard } from "@/components/HomeProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CityContentSection } from "@/components/CityContentSection";
import { JsonLd } from "@/components/JsonLd";
import { cityLinks } from "@/lib/site";
import { getCityContent } from "@/lib/content/city-pages";
import {
  allSeoLocationSlugs,
  cityKeywordsMeta,
  getSeoLocation,
} from "@/lib/content/seo-data";
import { shuffleForCity } from "@/lib/city-products";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceAreaJsonLd } from "@/lib/seo";
import { cjStorefrontProductsPath, type Product } from "@halloweenready/shared";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allSeoLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getSeoLocation(slug);
  if (!loc) return { title: "City" };
  return pageMetadata({
    title: loc.title,
    description: loc.description,
    path: `/cities/${slug}`,
    keywords: cityKeywordsMeta(slug),
    absoluteTitle: true,
  });
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const loc = getSeoLocation(slug);
  const content = getCityContent(slug);
  if (!loc || !content) notFound();

  let products: Product[] = [];
  try {
    const data = await api<{ products: Product[] }>(cjStorefrontProductsPath());
    products = data.products;
  } catch {
    products = [];
  }

  const cityProducts = shuffleForCity(products, slug).slice(0, 20);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: `Halloween to ${loc.label}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs.map((c) => ({ name: c.label, path: c.href ?? `/cities/${slug}` }))),
          faqJsonLd(content.faqs),
          serviceAreaJsonLd({ label: loc.label, slug, state: content.state }),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold text-primary mb-2">{content.headline || loc.h1}</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Premium Halloween delivery to {loc.label} in 2–5 business days. Shop from anywhere in the USA —
        we ship domestically so your order arrives before October 31.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cityProducts.map((p) => (
          <HomeProductCard key={p.slug} product={p} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-slate-500 mt-4">
          No products yet.{" "}
          <Link href="/products" className="text-nav hover:underline">
            Browse all Halloween items
          </Link>
        </p>
      )}

      <CityContentSection content={content} />

      <section className="mt-12 p-6 bg-slate-50 rounded-xl text-sm text-slate-600">
        <h2 className="font-semibold text-primary mb-2">Also deliver Halloween to</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {cityLinks
            .filter((c) => c.slug !== slug)
            .map((c) => (
              <Link key={c.slug} href={`/cities/${c.slug}`} className="text-nav hover:underline">
                {c.label}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
