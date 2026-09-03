import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { HalloweenLocationView } from "@/components/HalloweenLocationView";
import {
  buildLocationContent,
  findGeoLocation,
  halloweenCountryParams,
} from "@/lib/content/geo";
import { pageMetadata } from "@/lib/seo";
import { cjStorefrontProductsPath, type Product } from "@halloweenready/shared";

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
    try {
      const data = await api<{ products: Product[] }>(cjStorefrontProductsPath());
      products = data.products;
    } catch {
      products = [];
    }
  }

  return <HalloweenLocationView location={loc} products={products} />;
}
