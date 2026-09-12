import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HalloweenLocationView } from "@/components/HalloweenLocationView";
import {
  buildLocationContent,
  findGeoLocation,
  halloweenCountryParams,
} from "@/lib/content/geo";
import { loadStorefrontProductPreview } from "@/lib/product-loader";
import { pageMetadata } from "@/lib/seo";
import type { Product } from "@halloweenready/shared";

interface Props {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return halloweenCountryParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const loc = findGeoLocation(country);
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

export default async function HalloweenCountryPage({ params }: Props) {
  const { country } = await params;
  const loc = findGeoLocation(country);
  if (!loc) notFound();

  let products: Product[] = [];
  if (buildLocationContent(loc).quoteable) {
    products = await loadStorefrontProductPreview();
  }

  return <HalloweenLocationView location={loc} products={products} />;
}
