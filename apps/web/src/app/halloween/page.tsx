import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { breadcrumbJsonLd, canonical, pageMetadata } from "@/lib/seo";
import { ADMIN_KIND_LABEL, geoCountries, GEO_LOCATIONS } from "@/lib/content/geo";
import { getInternalLinkGroups } from "@halloweenready/shared";

export const metadata: Metadata = pageMetadata({
  title: "Halloween by location | Countries, regions, and cities",
  description:
    "Halloween shopping pages by country, state, province, prefecture, emirate, and city. Shipping is confirmed per product — we do not assume worldwide delivery.",
  path: "/halloween",
  keywords: "Halloween by location, Halloween countries, Halloween cities, Halloween USA, Halloween UK, Halloween India",
  absoluteTitle: true,
});

const GROUP_LABEL: Record<string, string> = {
  core: "Priority markets",
  eu: "European Union",
  europe_other: "Other European markets",
};

export default function HalloweenHubPage() {
  const countries = geoCountries();
  const groups = ["core", "eu", "europe_other"] as const;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Halloween" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Halloween", path: "/halloween" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Halloween by location",
            url: canonical("/halloween"),
            description:
              "Country, administrative region, and city pages for Halloween shopping and planning.",
          },
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold text-primary mb-3">Halloween by location</h1>
      <p className="text-slate-600 mb-4 leading-relaxed">
        Browse Halloween costumes, decorations, and party supplies by country, then by the real
        administrative unit used there — states, union territories, provinces, prefectures, emirates,
        constituent countries, and districts. Cities sit under their parent region.
      </p>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Live storefront shipping quotes are available for the United States, Canada, the United Kingdom,
        Australia, and Germany. Other location pages are shopping and planning hubs — confirm destination
        support on each product. This directory does not treat Europe as one “state” list, and Dubai is an
        emirate of the UAE, not a country. {GEO_LOCATIONS.length} location pages are in this tree.
      </p>

      {groups.map((group) => {
        const list = countries.filter((c) => c.marketGroup === group);
        if (list.length === 0) return null;
        return (
          <section key={group} className="mb-10">
            <h2 className="text-xl font-semibold text-primary mb-3">{GROUP_LABEL[group]}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {list.map((c) => (
                <li key={c.id}>
                  <Link href={c.path} className="text-nav hover:underline font-medium">
                    Halloween {c.name}
                  </Link>
                  <span className="text-slate-400"> · {ADMIN_KIND_LABEL[c.adminKind]}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="text-xs text-slate-500 mb-8">
        Existing country URLs such as <Link href="/countries/us" className="underline">/countries/us</Link>{" "}
        and city URLs such as <Link href="/cities/new-york" className="underline">/cities/new-york</Link> stay
        live. This hub adds the Country → region → city tree without deleting them.
      </p>

      <InternalLinksSection
        groups={getInternalLinkGroups({ type: "guide" })}
        title="Shop and plan Halloween"
        intro="Categories, quoteable country shops, and the Halloween guide."
      />
    </div>
  );
}
