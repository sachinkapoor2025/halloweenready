import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, categoryOrder, homeBanners, cityLinks, faqs } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Halloween Guide 2026 — Costumes, Decor & Party Tips | USA",
  description:
    "Your complete Halloween 2026 guide — costume ideas, home decor tips, trick-or-treat planning, and party essentials. Shop HalloweenReady for fast USA delivery before October 31.",
  path: "/halloween-guide",
  keywords:
    "halloween guide 2026, halloween costumes USA, halloween decorations, trick or treat tips, halloween party supplies, halloweenready",
});

const guideSteps = [
  {
    step: 1,
    title: "Pick Your Look",
    text: "Browse costumes for adults, kids, and groups. Add accessories like masks, wigs, and makeup to complete the transformation.",
  },
  {
    step: 2,
    title: "Haunt Your Home",
    text: "Choose yard inflatables, LED pumpkins, fog machines, and indoor props to create a spooky atmosphere neighbors will remember.",
  },
  {
    step: 3,
    title: "Stock Up on Treats",
    text: "Order bulk candy assortments and pre-filled treat bags so you're ready when trick-or-treaters arrive on Halloween night.",
  },
  {
    step: 4,
    title: "Plan the Party",
    text: "Grab plates, balloons, photo booth props, and tableware — everything you need for a haunted gathering.",
  },
];

const costumeIdeas = [
  { title: "Classic Horror", text: "Vampires, witches, skeletons, and zombies never go out of style." },
  { title: "Pop Culture", text: "Trending characters from movies, games, and memes — shop early for bestsellers." },
  { title: "Family Themes", text: "Matching group costumes for the whole family — pirates, superheroes, or haunted mansion crew." },
  { title: "Last-Minute Wins", text: "Bodysuits, capes, and face paint kits ship fast for procrastinators." },
];

export default function HalloweenGuidePage() {
  const hero = homeBanners[0];

  return (
    <div>
      <JsonLd data={[faqJsonLd(faqs)]} />

      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src={hero.src} alt={hero.alt} fill className="object-cover" priority sizes="100vw" unoptimized />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-sm uppercase tracking-widest text-accent mb-3">HALLOWEEN 2026 · USA GUIDE</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Your Complete Halloween Guide
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            Costumes, decor, candy, and party planning — everything you need for a spooktacular October 31.
            {site.name} delivers across all 50 states.
          </p>
          <div className="inline-block px-6 py-3 bg-white/15 backdrop-blur rounded-xl border border-nav/40 mb-8">
            <p className="text-sm text-white/80">Halloween 2026</p>
            <p className="text-2xl font-bold">Saturday, October 31, 2026</p>
            <p className="text-sm text-white/70 mt-1">Order by October 25 for guaranteed USA delivery</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-spooky">
              Shop All Halloween
            </Link>
            <Link href="/categories/costumes" className="btn-outline-spooky bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              Browse Costumes
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-accent mb-6">Why Shop Halloween Early?</h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            Popular costumes and decor sell out fast every October. Ordering early guarantees size availability,
            on-time delivery, and less stress as Halloween night approaches.
          </p>
          <p>
            {site.name} ships from within the United States — 2–5 business day delivery to California, New York,
            Texas, Florida, and all 50 states. No customs delays, just spooky fun at your doorstep.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 bg-primary/50 rounded-2xl border border-nav/20">
        <h2 className="text-2xl font-bold text-nav text-center mb-10">Plan Your Halloween in 4 Steps</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guideSteps.map((item) => (
            <div key={item.step} className="text-center p-6 rounded-xl card-spooky">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-nav text-white font-bold mb-4">
                {item.step}
              </span>
              <h3 className="font-bold text-accent mb-2">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-accent mb-6">Costume Ideas for 2026</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {costumeIdeas.map((idea) => (
            <div key={idea.title} className="p-5 card-spooky">
              <h3 className="font-bold text-nav mb-2">{idea.title}</h3>
              <p className="text-sm text-slate-300">{idea.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-nav/20">
        <h2 className="text-2xl font-bold text-accent mb-4">Halloween Delivery by City</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          We deliver Halloween costumes, decor, and candy to major US metros and nationwide.
          Select your city for local delivery details:
        </p>
        <div className="flex flex-wrap gap-2">
          {cityLinks.map((c) => (
            <Link
              key={c.slug}
              href={`/cities/${c.slug}`}
              className="px-3 py-1.5 rounded-full border border-nav/40 text-sm text-accent hover:border-nav hover:text-nav"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-accent mb-6 text-center">Shop by Category</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {categoryOrder.map((slug) => (
            <Link
              key={slug}
              href={`/categories/${slug}`}
              className="p-5 card-spooky hover:border-nav transition capitalize font-medium text-accent flex items-center justify-between group"
            >
              {slug.replace(/-/g, " ")}
              <span className="text-nav group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12 border-t border-nav/20">
        <h2 className="text-2xl font-bold text-accent text-center mb-8">Halloween FAQ</h2>
        <div className="space-y-3">
          {faqs.slice(0, 6).map((f) => (
            <details key={f.q} className="card-spooky p-5">
              <summary className="font-semibold text-nav cursor-pointer text-sm">{f.q}</summary>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-center mt-6">
          <Link href="/faq" className="text-nav hover:underline text-sm">View all FAQs →</Link>
        </p>
      </section>

      <section className="bg-gradient-to-r from-primary via-spooky to-nav text-white py-14 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for Halloween 2026?</h2>
        <p className="text-white/85 max-w-xl mx-auto mb-8 leading-relaxed">
          Shop costumes, decor, candy, and party supplies with fast USA delivery. Order before October 25.
        </p>
        <Link href="/products" className="btn-spooky inline-block">
          Shop Halloween Now
        </Link>
      </section>
    </div>
  );
}
