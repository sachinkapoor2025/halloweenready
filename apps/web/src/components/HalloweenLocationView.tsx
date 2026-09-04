import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { TrackedProductCard } from "@/components/TrackedProductCard";
import { breadcrumbJsonLd, canonical, faqJsonLd } from "@/lib/seo";
import {
  ADMIN_KIND_LABEL,
  buildLocationContent,
  getGeoChildren,
  getGeoCountry,
  getGeoSiblings,
  locationBreadcrumbs,
  schemaPlaceType,
  type GeoLocation,
} from "@/lib/content/geo";
import { getInternalLinkGroups, SEO_CATEGORY_LINKS, type Product } from "@halloweenready/shared";

export function HalloweenLocationView({
  location,
  products = [],
}: {
  location: GeoLocation;
  products?: Product[];
}) {
  const content = buildLocationContent(location);
  const country = getGeoCountry(location);
  const children = getGeoChildren(location.id);
  const siblings = getGeoSiblings(location).slice(0, 24);
  const crumbs = locationBreadcrumbs(location);
  const preview = content.quoteable ? products.slice(0, 10) : [];

  const jsonLdCrumbs = crumbs.map((c, i) => ({
    name: c.label,
    path: c.href ?? location.path,
    position: i,
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <JsonLd
        data={[
          breadcrumbJsonLd(jsonLdCrumbs.map((c) => ({ name: c.name, path: c.path }))),
          faqJsonLd(content.faqs),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: content.h1,
            description: content.description,
            url: canonical(location.path),
            isPartOf: { "@id": `${canonical("/")}#website` },
            about: {
              "@type": schemaPlaceType(location),
              name: location.name,
              containedInPlace: country.id !== location.id ? { "@type": "Country", name: country.name } : undefined,
            },
          },
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
        {ADMIN_KIND_LABEL[location.adminKind]}
        {location.kind !== "country" ? ` · ${country.name}` : ""}
      </p>
      <h1 className="text-3xl font-bold text-primary mb-3">{content.h1}</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">{content.intro}</p>

      <section className="mb-8 p-4 rounded-xl bg-slate-50 text-sm text-slate-700">
        <h2 className="font-semibold text-primary mb-2">Shipping for {location.name}</h2>
        <p>{content.shipping}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-primary mb-2">Halloween in {location.name}</h2>
        <p className="text-slate-600 leading-relaxed">{content.halloweenContext}</p>
        <p className="text-slate-600 leading-relaxed mt-3">{content.planning}</p>
      </section>

      {children.length > 0 && content.childHeading && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-primary mb-3">{content.childHeading}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {children.map((child) => (
              <li key={child.id}>
                <Link href={child.path} className="text-nav hover:underline">
                  Halloween {child.name}
                </Link>
                <span className="text-slate-400"> · {ADMIN_KIND_LABEL[child.adminKind]}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {preview.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-primary mb-3">Halloween catalog (check shipping per item)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {preview.map((p, i) => (
              <TrackedProductCard
                key={p.slug}
                product={p}
                position={i + 1}
                listingPage={`halloween:${location.id}`}
              />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-3 mb-10">
        <Link href="/products" className="rounded-lg bg-nav px-4 py-2 text-sm font-semibold text-white">
          Shop Halloween
        </Link>
        {SEO_CATEGORY_LINKS.slice(0, 3).map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
          >
            {c.label.replace("Halloween ", "")}
          </Link>
        ))}
        {country.legacyCountryPath && location.kind === "country" && (
          <Link
            href={country.legacyCountryPath}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
          >
            Original {country.name} page
          </Link>
        )}
        {location.legacyCityPaths.map((href) => (
          <Link key={href} href={href} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">
            Existing city page
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-primary mb-3">FAQ</h2>
      <dl className="space-y-4 mb-10">
        {content.faqs.map((f) => (
          <div key={f.q}>
            <dt className="font-semibold text-slate-800">{f.q}</dt>
            <dd className="text-slate-600 mt-1">{f.a}</dd>
          </div>
        ))}
      </dl>

      {siblings.length > 0 && location.kind !== "country" && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-primary mb-3">
            {content.siblingHeading ?? `More in ${getGeoCountry(location).name}`}
          </h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-nav">
            {siblings.map((s) => (
              <li key={s.id}>
                <Link href={s.path} className="underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <InternalLinksSection
        groups={getInternalLinkGroups(
          country.legacyCountryPath
            ? { type: "country", countrySlug: country.legacyCountryPath.replace("/countries/", "") }
            : { type: "guide" }
        )}
        title="Related Halloween pages"
        intro="Categories, quoteable country shops, and planning guides. Location links do not promise delivery."
      />
    </div>
  );
}
