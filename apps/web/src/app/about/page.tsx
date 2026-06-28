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
          <strong>{site.name}</strong> ({site.domain}) is a dedicated online Halloween store built for one purpose:
          helping families and party hosts across the United States celebrate Halloween with premium costumes, spooky
          decor, candy, and party supplies — delivered fast and reliably before October 31.
        </p>
        <p>
          Whether you are planning a neighborhood trick-or-treat, a haunted house display, or an office Halloween
          party, we make shopping easy. Order online from anywhere worldwide; we ship{" "}
          <strong>domestically within America</strong> — 2–3 business day express to major metros, 3–5 days nationwide.
        </p>
        <h2 className="text-xl font-bold text-accent pt-4">Why shoppers recommend HalloweenReady</h2>
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
          Every order is carefully packed for Halloween. We understand timing matters — order by October 25 for
          guaranteed pre-Halloween delivery. Responsive WhatsApp support and a satisfaction guarantee.
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
