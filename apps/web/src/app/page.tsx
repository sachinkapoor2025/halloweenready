import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { BannerCarousel } from "@/components/BannerCarousel";
import { CustomerReviews } from "@/components/CustomerReviews";
import { HomepageCatalog } from "@/components/HomepageCatalog";
import { HomepageCategorySections } from "@/components/HomepageCategorySections";
import { HomepageHampers } from "@/components/HomepageHampers";
import { HomeProductCard } from "@/components/HomeProductCard";
import { FastSellingSection } from "@/components/FastSellingSection";
import { HomeSeoSection } from "@/components/HomeSeoSection";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { AssistantPromo } from "@/components/assistant/AssistantPromo";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyTrustUsSection } from "@/components/WhyTrustUsSection";
import { JsonLd } from "@/components/JsonLd";
import { homeBanners, homeCategoryOrder, faqs } from "@/lib/site";
import { getCatalogProducts } from "@/lib/catalog-fallback";
import { withListingImages } from "@/lib/product-loader";
import {
  HOMEPAGE_FAST_SELLING_LIMIT,
  HOMEPAGE_FEED_INITIAL_LIMIT,
  cjStorefrontProductsPath,
  getInternalLinkGroups,
  homepageProductsPath,
} from "@halloweenready/shared";
import { faqJsonLd, howToShopHalloweenJsonLd, pageMetadata } from "@/lib/seo";
import type { Product, Category } from "@halloweenready/shared";

export const metadata: Metadata = pageMetadata({
  title: "Halloween Costumes, Decorations & Party Supplies Online",
  description:
    "Shop Halloween costumes, decorations, and party supplies at HalloweenReady. We ship internationally — delivering in 5–7 days. Check shipping on each product. Pay in USD or INR at checkout.",
  path: "/",
});

export const dynamic = "force-dynamic";

type HomepageFeed = {
  products: Product[];
  snapshot?: {
    generatedAt: string;
    poolSize: number;
    groups: { id: string; title: string; slugs: string[] }[];
    ranked: string[];
  };
  total: number;
  hasMore: boolean;
};

type CategoryPreview = { slug: string; name: string };

function HomeCatalogBlock({
  homepage,
  products,
  categoryPreviews,
  hampers,
}: {
  homepage: HomepageFeed | null;
  products: Product[];
  categoryPreviews: CategoryPreview[];
  hampers: ReactNode;
}) {
  if (homepage?.products.length && homepage.snapshot) {
    return (
      <HomepageCatalog
        products={homepage.products}
        snapshot={homepage.snapshot}
        total={homepage.total ?? homepage.products.length}
        hasMore={Boolean(homepage.hasMore) || homepage.products.length < (homepage.total ?? 0)}
        midSection={hampers}
      >
        <HomepageCategorySections categories={categoryPreviews} />
      </HomepageCatalog>
    );
  }

  if (products.length > 0) {
    return (
      <>
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
        {hampers}
        <HomepageCategorySections categories={categoryPreviews} />
      </>
    );
  }

  return (
    <p className="text-center text-slate-500 py-12">
      Products could not be loaded. Confirm Amplify env var{" "}
      <code className="bg-slate-100 px-1 rounded text-slate-800">NEXT_PUBLIC_API_URL</code> is set and redeploy.
    </p>
  );
}

export default async function HomePage() {
  let products: Product[] = [];
  let categories: Category[] = [];
  let homepage: HomepageFeed | null = null;

  try {
    const [homepageData, categoriesData] = await Promise.all([
      api<HomepageFeed>(homepageProductsPath({ limit: HOMEPAGE_FEED_INITIAL_LIMIT, offset: 0 })),
      api<{ categories: Category[] }>("/categories"),
    ]);
    homepage = homepageData?.products?.length && homepageData.snapshot
      ? {
          ...homepageData,
          products: withListingImages(homepageData.products).slice(0, HOMEPAGE_FEED_INITIAL_LIMIT),
          total: homepageData.total ?? homepageData.products.length,
          hasMore:
            Boolean(homepageData.hasMore) ||
            homepageData.products.length > HOMEPAGE_FEED_INITIAL_LIMIT ||
            (homepageData.total ?? homepageData.products.length) > HOMEPAGE_FEED_INITIAL_LIMIT,
        }
      : null;
    categories = categoriesData.categories;
  } catch {
    homepage = null;
    categories = [];
  }

  if (!homepage?.products.length) {
    try {
      const productsData = await api<{ products: Product[] }>(
        cjStorefrontProductsPath({ limit: HOMEPAGE_FEED_INITIAL_LIMIT })
      );
      products = withListingImages(productsData.products ?? []);
    } catch {
      products = withListingImages(getCatalogProducts().slice(0, HOMEPAGE_FEED_INITIAL_LIMIT));
    }
  } else {
    products = homepage.products;
  }

  const categoryMap = new Map(categories.map((c) => [c.slug, c]));
  const categoryPreviews = homeCategoryOrder.map((slug) => ({
    slug,
    name: categoryMap.get(slug)?.name ?? slug.replace(/-/g, " "),
  }));

  return (
    <div className="bg-white spooky-panel">
      <JsonLd data={[faqJsonLd(faqs), howToShopHalloweenJsonLd()]} />
      <BannerCarousel banners={homeBanners} />
      <TrustStrip />
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <AssistantPromo variant="home" />
      </div>

      <FastSellingSection products={products} limit={HOMEPAGE_FAST_SELLING_LIMIT} />

      <HomeCatalogBlock
        homepage={homepage}
        products={products}
        categoryPreviews={categoryPreviews}
        hampers={<HomepageHampers />}
      />

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
