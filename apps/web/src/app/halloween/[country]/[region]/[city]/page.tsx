import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HalloweenLocationView } from "@/components/HalloweenLocationView";
import {
  buildLocationContent,
  findGeoLocation,
  halloweenCityParams,
} from "@/lib/content/geo";
import { loadStorefrontProducts } from "@/lib/product-loader";
import { pageMetadata } from "@/lib/seo";
import type { Product } from "@halloweenready/shared";

interface Props {
  params: Promise<{ country: string; region: string; city: string }>;
}

export function generateStaticParams() {
  return halloweenCityParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, region, city } = await params;
  const loc = findGeoLocation(country, region, city);
  if (!loc) return { title: "Halloween location" };
  const content = buildLocationContent(loc);
  return pageMetadata({
    title: content.title,
    description: content.description,
    path: loc.path,
    keywords: content.keywords,
    absoluteTitle: true,
    noIndex: !loc.indexable,
  });
}

export default async function HalloweenCityPage({ params }: Props) {
  const { country, region, city } = await params;
  const loc = findGeoLocation(country, region, city);
  if (!loc) notFound();

  let products: Product[] = [];
  if (buildLocationContent(loc).quoteable) {
    products = await loadStorefrontProducts();
  }

  return <HalloweenLocationView location={loc} products={products} />;
}
