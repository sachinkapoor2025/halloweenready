import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { BannerCarousel } from "@/components/BannerCarousel";
import { CustomerReviews } from "@/components/CustomerReviews";
import { HomepageCatalog } from "@/components/HomepageCatalog";
import { HomeProductCard } from "@/components/HomeProductCard";
import { TrackedProductCard } from "@/components/TrackedProductCard";
import { FastSellingSection } from "@/components/FastSellingSection";
import { HomeSeoSection } from "@/components/HomeSeoSection";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyTrustUsSection } from "@/components/WhyTrustUsSection";
import { JsonLd } from "@/components/JsonLd";
import { site, homeBanners, homeCategoryOrder, faqs } from "@/lib/site";
import { getCatalogProducts } from "@/lib/catalog-fallback";
import { withListingImages } from "@/lib/product-loader";
import { categorySlugVariants, cjStorefrontProductsPath, getInternalLinkGroups } from "@halloweenready/shared";
import { faqJsonLd, howToShopHalloweenJsonLd, pageMetadata } from "@/lib/seo";
import type { Product, Category } from "@halloweenready/shared";

export const metadata: Metadata = pageMetadata({
  title: "Halloween Decorations & Party Supplies Online | USA Shipping",
  description: site.description,
  path: "/",
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: Product[] = [];
  let categories: Category[] = [];
  let homepage: { products: Product[]; snapshot: { generatedAt: string; poolSize: number; groups: { id: string; title: string; slugs: string[] }[]; ranked: string[] } } | null = null;

  try {
    const [productsData, categoriesData] = await Promise.all([
      api<{ products: Product[] }>(cjStorefrontProductsPath()),
      api<{ categories: Category[] }>("/categories"),
    ]);
    products = productsData.products;
    categories = categoriesData.categories;
  } catch {
    products = [];
    categories = [];
  }

  try {
    homepage = await api<{
      products: Product[];
      snapshot: {
        generatedAt: string;
        poolSize: number;
        groups: { id: string; title: string; slugs: string[] }[];
        ranked: string[];
      };
    }>("/homepage/products");
    if (homepage?.products?.length) {
      homepage = { ...homepage, products: withListingImages(homepage.products) };
    }
  } catch {
    homepage = null;
  }

  // Live API is the catalog. Bundled JSON is offline fallback only — overlaying it
  // resurrected deleted sample SKUs on the storefront after Dynamo cleanup.
  if (products.length === 0) {
    products = withListingImages(getCatalogProducts());
  } else {
    products = withListingImages(products);
  }

  const categoryMap = new Map(categories.map((c) => [c.slug, c]));
  const productsByCategory = homeCategoryOrder.map((slug) => {
    const variants = new Set(categorySlugVariants(slug));
    return {
      slug,
      name: categoryMap.get(slug)?.name ?? slug.replace(/-/g, " "),
      products: products.filter((p) => variants.has(p.categorySlug)),
    };
  });

  return (
    <div className="bg-white spooky-panel">
      <JsonLd data={[faqJsonLd(faqs), howToShopHalloweenJsonLd()]} />
      <BannerCarousel banners={homeBanners} />
      <TrustStrip />

      <FastSellingSection products={products} />

      {homepage?.products.length ? (
        <HomepageCatalog products={homepage.products} snapshot={homepage.snapshot} />
      ) : products.length > 0 ? (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="halloween-heading text-xl md:text-2xl">
            Celebrate Halloween in Style 🎃👻
          </h2>
          <Link href="/products" className="text-nav font-semibold text-sm hover:underline">
            View All →
          </Link>
        </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
            {products.slice(0, 20).map((p) => (
              <HomeProductCard key={p.slug} product={p} />
            ))}
          </div>
      </section>
      ) : (
        <p className="text-center text-slate-500 py-12">
            Products could not be loaded. Confirm Amplify env var{" "}
            <code className="bg-slate-100 px-1 rounded text-slate-800">NEXT_PUBLIC_API_URL</code> is set and redeploy.
          </p>
      )}

      {productsByCategory.map((section) =>
        section.products.length > 0 ? (
          <section key={section.slug} className="max-w-7xl mx-auto px-4 py-8 section-spooky-divider">
            <div className="flex items-center justify-between mb-5">
              <h2 className="halloween-heading text-xl md:text-2xl capitalize">{section.name}</h2>
              <Link href={`/categories/${section.slug}`} className="text-nav font-semibold text-sm hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
              {section.products.slice(0, 10).map((p, i) => (
                <TrackedProductCard
                  key={p.slug}
                  product={p}
                  position={i + 1}
                  listingPage={`category:${section.slug}`}
                />
              ))}
            </div>
          </section>
        ) : null
      )}

      <WhyTrustUsSection />

      <CustomerReviews />

      <HomeSeoSection />

      <section className="max-w-7xl mx-auto px-4">
        <InternalLinksSection
          groups={getInternalLinkGroups({ type: "home" })}
          title="Explore HalloweenReady"
          intro="Shop by category and destination, or read the Halloween planning guides."
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
        <h2 className="text-2xl font-bold text-primary text-center mb-2">FAQ</h2>
        <p className="text-center text-sm text-slate-500 mb-6">
          Quick answers below — or{" "}
          <Link href="/faq" className="text-nav hover:underline">
            read our full FAQ page
          </Link>
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.slice(0, 6).map((f) => (
            <details key={f.q} className="border border-slate-200 rounded-xl p-5 bg-white">
              <summary className="font-semibold text-primary cursor-pointer text-sm">{f.q}</summary>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
