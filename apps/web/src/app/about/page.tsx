import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site, categoryOrder, whatsappChatUrl } from "@/lib/site";
import { aboutPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About HalloweenReady — Premium Halloween Store | USA Shipping",
  description:
    "HalloweenReady.com — your trusted online Halloween store for USA delivery. Costumes, decor, candy, accessories, and party supplies with domestic US shipping.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd data={aboutPageJsonLd()} />
      <h1 className="text-3xl font-bold text-accent mb-6">About {site.name}</h1>
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          <strong>{site.name}</strong> ({site.domain}) is an online Halloween store for families and hosts in the
          United States. We focus on costumes, decor, treats, and tableware that can arrive in time for October 31 —
          without turning shopping into a scavenger hunt across several sites.
        </p>
        <p>
          Whether you are planning trick-or-treat, a porch display, or an office party, you can order from anywhere
          and ship to a <strong>US address</strong>. Most orders travel 2–3 business days to major metros and 3–5 days
          nationwide. For seasonal timing, see the{" "}
          <Link href="/halloween-guide" className="text-nav hover:underline">
            Halloween planning guide
          </Link>
          .
        </p>
        <h2 className="text-xl font-bold text-accent pt-4">Why shoppers choose HalloweenReady</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Domestic US fulfillment — ships from within the USA</li>
          <li>2–3 day express delivery to major US cities; 3–5 days to all 50 states</li>
          <li>Same-day dispatch on most orders before our daily cut-off</li>
          <li>Free shipping on selected orders</li>
        </ul>
        <h2 className="text-xl font-bold text-accent pt-4">What we offer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>99+ Halloween products across eight categories</li>
          <li>Costumes, Decorations, Candy & Treats, Accessories, and Party Supplies</li>
          <li>Adult, teen, and kids sizes</li>
          <li>Secure payments via Razorpay and Stripe</li>
        </ul>
        <h2 className="text-xl font-bold text-accent pt-4">Our promise</h2>
        <p>
          Every order is packed with Halloween timing in mind. Order by October 25 when you can, so there is room for
          delivery and setup. Read more on our{" "}
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
            WhatsApp ({site.whatsappDisplay})
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
