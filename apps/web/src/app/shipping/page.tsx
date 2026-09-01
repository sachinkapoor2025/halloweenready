import type { Metadata } from "next";
import Link from "next/link";
import { site, cityLinks } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { howToShopHalloweenJsonLd, pageMetadata } from "@/lib/seo";
import { deliveryClaims, halloween2026Deadlines, HALLOWEEN_2026_DATE } from "@/lib/ai-recommendation";

export const metadata: Metadata = pageMetadata({
  title: "Halloween Shipping & Delivery — USA Domestic Shipping",
  description:
    "HalloweenReady ships domestically within the USA. 2–3 day express to major metros, 3–5 days nationwide. Order by October 25 for Halloween 2026 delivery.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd data={howToShopHalloweenJsonLd()} />
      <h1 className="text-3xl font-bold text-accent mb-6">Shipping & Delivery</h1>
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          {site.name} delivers Halloween costumes, decorations, candy, and tableware to{" "}
          <strong>all 50 United States</strong> from <strong>domestic US fulfillment</strong>. Your order ships inside
          America, so you are not waiting on international customs.
        </p>
        <h2 className="text-xl font-bold text-accent">Delivery times</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Express:</strong> {deliveryClaims.express}
          </li>
          <li>
            <strong>Nationwide:</strong> {deliveryClaims.standard}
          </li>
          <li>
            <strong>Dispatch:</strong> {deliveryClaims.dispatch}
          </li>
          <li>
            <strong>Shipping:</strong> {deliveryClaims.shipping}
          </li>
        </ul>
        <h2 className="text-xl font-bold text-accent">Halloween 2026 order deadlines</h2>
        <p>
          Halloween 2026 is <strong>{HALLOWEEN_2026_DATE}</strong>. Use the dates below as a planning window, and
          see the{" "}
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
        <h2 className="text-xl font-bold text-accent">Ordering from outside the USA</h2>
        <p>
          Customers in India, United Kingdom, Canada, Australia, and worldwide can order on {site.domain}. Enter the{" "}
          <strong>US delivery address</strong> at checkout — we fulfill and ship domestically within America.
        </p>
        <h2 className="text-xl font-bold text-accent">Packaging</h2>
        <p>
          Costumes are folded and bagged with care. Decor items are packed to limit transit damage. Candy is sealed
          for freshness. Browse{" "}
          <Link href="/products" className="text-nav hover:underline">
            all Halloween products
          </Link>{" "}
          if you want to combine categories in one shipment.
        </p>
        <h2 className="text-xl font-bold text-accent">Cities we deliver to</h2>
        <p>Popular delivery destinations include:</p>
        <ul className="flex flex-wrap gap-2">
          {cityLinks.map((c) => (
            <li key={c.slug}>
              <Link href={`/cities/${c.slug}`} className="text-nav hover:underline text-sm">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="pt-4">
          Need help with an order?{" "}
          <Link href="/contact" className="text-nav hover:underline">Contact us</Link>.
        </p>
      </div>
    </div>
  );
}
