import Link from "next/link";
import { categoryHref } from "@/lib/category-urls";
import type { SecondaryCity } from "@/lib/content/city-delivery-tiers";
import { site, whatsappChatUrl, homeCategoryOrder } from "@/lib/site";

const CATEGORY_LABELS: Record<(typeof homeCategoryOrder)[number], string> = {
  "home-decoration": "Home Decorations",
  costumesandaccessories: "Costumes & Accessories",
  partysupplier: "Party Supplies",
  toysandnovelty: "Toys & Novelty",
  candlesandfragrance: "Candles & Fragrance",
  jewellryandaccessories: "Jewelry & Accessories",
  lifestyleandwearable: "Lifestyle & Wearable",
  printedandpapercrafts: "Printed & Paper Crafts",
};

/** Shared template for secondary city Halloween delivery pages. */
export function buildSecondaryCityFaqs(city: SecondaryCity) {
  const place = `${city.name}, ${city.state}`;
  return [
    {
      q: `Do you ship Halloween products to ${place}?`,
      a: `Yes. Enter the ${place} delivery address at checkout on HalloweenReady.com. We ship domestically within the USA.`,
    },
    {
      q: `How long does Halloween delivery take to ${place}?`,
      a: `Most orders to ${place} arrive in 2–5 business days after dispatch. Order early before October 31 for the best selection.`,
    },
    {
      q: `When should I order for Halloween 2026?`,
      a: "Halloween 2026 is October 31, 2026. Order costumes by October 20 and decor by October 25 for guaranteed pre-Halloween delivery.",
    },
  ] as const;
}

export function SecondaryCityLanding({ city }: { city: SecondaryCity }) {
  const place = `${city.name}, ${city.state}`;
  const faqs = buildSecondaryCityFaqs(city);

  return (
    <div className="mt-12 pt-10 border-t border-slate-200 max-w-3xl space-y-8 text-slate-700 leading-relaxed">
      <section>
        <h2 className="text-2xl font-bold text-primary mb-4">
          Halloween decorations & costumes in {place}
        </h2>
        <p className="mb-4">
          Shop HalloweenReady for decorations, costumes, party supplies, and seasonal accessories
          with fast domestic shipping to {place}.
        </p>
        <p>
          Browse home décor, costumes, party supplies, toys, candles, and more. Checkout with Stripe
          (USD) or Razorpay (INR).
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-primary mb-3">Shop by category</h3>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm">
          {homeCategoryOrder.map((slug) => (
            <li key={slug}>
              <Link href={categoryHref(slug)} className="text-nav font-medium hover:underline">
                {CATEGORY_LABELS[slug]}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-primary mb-4">FAQ — {city.name}</h3>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q}>
              <h4 className="font-semibold text-primary text-sm mb-1">{f.q}</h4>
              <p className="text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm">
        Need help?{" "}
        <a
          href={whatsappChatUrl(`Hi ${site.name}, I need help shipping to ${place}.`)}
          className="text-nav font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </p>
    </div>
  );
}
