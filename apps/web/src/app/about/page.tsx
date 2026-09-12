import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site, categoryOrder, whatsappChatUrl } from "@/lib/site";
import { aboutPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About HalloweenReady — Global Halloween Store",
  description:
    "HalloweenReady is an online Halloween store for costumes, decorations, and party supplies. We ship internationally, delivering in 5–7 days. Free shipping on orders of $49 or more.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd data={aboutPageJsonLd()} />
      <h1 className="text-3xl font-bold text-accent mb-6">About {site.name}</h1>
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          <strong>{site.name}</strong> ({site.domain}) is a global online Halloween store. We sell costumes,
          decorations, party supplies, accessories, and seasonal extras for October 31 — without sending shoppers
          across several sites.
        </p>
        <p>
          Choose your country at checkout. We serve shoppers in the{" "}
          <Link href="/countries/us" className="text-nav hover:underline">
            United States
          </Link>
          ,{" "}
          <Link href="/countries/uk" className="text-nav hover:underline">
            United Kingdom
          </Link>
          ,{" "}
          <Link href="/countries/ca" className="text-nav hover:underline">
            Canada
          </Link>
          ,{" "}
          <Link href="/countries/au" className="text-nav hover:underline">
            Australia
          </Link>
          ,{" "}
          <Link href="/countries/in" className="text-nav hover:underline">
            India
          </Link>
          , the{" "}
          <Link href="/countries/ae" className="text-nav hover:underline">
            UAE
          </Link>
          , and other markets. <strong>Delivering in 5–7 days.</strong> For seasonal timing, see the{" "}
          <Link href="/halloween-guide" className="text-nav hover:underline">
            Halloween planning guide
          </Link>
          .
        </p>
        <h2 className="text-xl font-bold text-accent pt-4">Why shoppers choose HalloweenReady</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>International checkout — pick any country, not a US-only form</li>
          <li>Delivering in 5–7 days</li>
          <li>Free shipping on orders of $49 or more; smaller carts show a stepped shipping fee before payment</li>
          <li>Prices can display in local currency; checkout is Stripe (USD) or Razorpay (INR)</li>
        </ul>
        <h2 className="text-xl font-bold text-accent pt-4">What we offer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Halloween costumes, decorations, party supplies, toys, candles, jewelry, apparel, and paper crafts</li>
          <li>Adult, teen, and kids sizes</li>
          <li>Secure payments via Stripe and Razorpay</li>
        </ul>
        <h2 className="text-xl font-bold text-accent pt-4">Our promise</h2>
        <p>
          Shipping is shown on the product, cart, and checkout pages — the same amount charged at payment. Read more
          on our{" "}
          <Link href="/shipping" className="text-nav hover:underline">
            shipping and delivery page
          </Link>
          .
        </p>
        <p>
          Questions? Reach us on{" "}
          <a
            href={whatsappChatUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-nav hover:underline"
          >
            WhatsApp
          </a>
          , email{" "}
          <a href={`mailto:${site.supportEmail}`} className="text-nav hover:underline">
            {site.supportEmail}
          </a>
          , or visit our <Link href="/contact" className="text-nav hover:underline">contact page</Link>.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        {categoryOrder.map((slug) => (
          <Link
            key={slug}
            href={`/categories/${slug}`}
            className="px-4 py-2 rounded-full border border-slate-200 text-sm hover:border-nav capitalize text-slate-700 bg-slate-50"
          >
            {slug.replace(/-/g, " ")}
          </Link>
        ))}
      </div>
    </div>
  );
}
