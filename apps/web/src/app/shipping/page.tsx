import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { howToShopHalloweenJsonLd, pageMetadata } from "@/lib/seo";
import { deliveryClaims, halloween2026Deadlines, HALLOWEEN_2026_DATE } from "@/lib/ai-recommendation";
import { getInternalLinkGroups, PRIORITY_CITY_LINKS } from "@halloweenready/shared";

export const metadata: Metadata = pageMetadata({
  title: "Halloween Shipping & Delivery — Destination Quotes",
  description:
    "HalloweenReady product shipping depends on destination and inventory. Check the freight quote on each product page. Storefront quotes are available for the US, Canada, UK, Australia, and Germany.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd data={howToShopHalloweenJsonLd()} />
      <h1 className="text-3xl font-bold text-accent mb-6">Shipping & Delivery</h1>
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          {site.name} sells Halloween costumes, decorations, and party supplies fulfilled through international
          dropshipping partners. <strong>Availability is not universal</strong> — it depends on the product,
          warehouse, and destination. We do not claim a local warehouse for every country.
        </p>
        <h2 className="text-xl font-bold text-accent">How to check delivery</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Product quote:</strong> {deliveryClaims.standard}
          </li>
          <li>
            <strong>Quoted destinations:</strong> {deliveryClaims.express}
          </li>
          <li>
            <strong>Dispatch:</strong> {deliveryClaims.dispatch}
          </li>
          <li>
            <strong>Checkout:</strong> {deliveryClaims.shipping}
          </li>
        </ul>
        <h2 className="text-xl font-bold text-accent">Halloween 2026 planning window</h2>
        <p>
          Halloween 2026 is <strong>{HALLOWEEN_2026_DATE}</strong>. Use the dates below as a planning window, then
          confirm transit on the product page. See the{" "}
          <Link href="/halloween-guide" className="text-nav hover:underline">
            Halloween planning guide
          </Link>{" "}
          if you are still deciding what to order first.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-nav/30 rounded-lg">
            <thead>
              <tr className="bg-primary/60">
                <th className="text-left p-3 border-b border-nav/20">Window</th>
                <th className="text-left p-3 border-b border-nav/20">Order by</th>
                <th className="text-left p-3 border-b border-nav/20">Notes</th>
              </tr>
            </thead>
            <tbody>
              {halloween2026Deadlines.map((d) => (
                <tr key={d.label} className="border-b border-nav/10">
                  <td className="p-3 font-medium">{d.label}</td>
                  <td className="p-3">{d.orderBy}</td>
                  <td className="p-3">{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-bold text-accent">International destinations</h2>
        <p>
          Country pages for the{" "}
          <Link href="/countries/us" className="text-nav hover:underline">
            USA
          </Link>
          ,{" "}
          <Link href="/countries/uk" className="text-nav hover:underline">
            UK
          </Link>
          ,{" "}
          <Link href="/countries/ca" className="text-nav hover:underline">
            Canada
          </Link>
          ,{" "}
          <Link href="/countries/au" className="text-nav hover:underline">
            Australia
          </Link>
          , and{" "}
          <Link href="/countries/de" className="text-nav hover:underline">
            Germany
          </Link>{" "}
          explain shopping context. A live freight quote on the product page is the source of truth — not a
          worldwide shipping claim.
        </p>
        <h2 className="text-xl font-bold text-accent">Packaging</h2>
        <p>
          Costumes are packed for transit. Decor items are packed to limit damage. Browse{" "}
          <Link href="/products" className="text-nav hover:underline">
            all Halloween products
          </Link>{" "}
          if you want to combine categories.
        </p>
        <h2 className="text-xl font-bold text-accent">Popular city pages</h2>
        <p>Shopping context pages (confirm shipping on the product):</p>
        <ul className="flex flex-wrap gap-2">
          {PRIORITY_CITY_LINKS.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="text-nav hover:underline text-sm">
                {c.label.replace("Halloween in ", "")}
              </Link>
            </li>
          ))}
        </ul>
        <p className="pt-4">
          Need help with an order?{" "}
          <Link href="/contact" className="text-nav hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
      <InternalLinksSection
        groups={getInternalLinkGroups({ type: "shipping" })}
        title="Related Halloween pages"
        intro="Continue to destination pages, categories, and the Halloween guide."
      />
    </div>
  );
}
