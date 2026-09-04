import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { halloweenGuideInlineLinks } from "@/lib/content/page-inline-links";
import { applyInlineLinks } from "@/lib/inline-links";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { site, categoryOrder, homeBanners, faqs } from "@/lib/site";
import { getInternalLinkGroups, PRIORITY_CITY_LINKS } from "@halloweenready/shared";

export const metadata: Metadata = pageMetadata({
  title: "Halloween Guide 2026 — Costumes, Decor & Party Tips",
  description:
    "Your complete Halloween 2026 guide — costume ideas, home decor tips, trick-or-treat planning, and party essentials. Check product pages for destination shipping quotes.",
  path: "/halloween-guide",
  keywords:
    "halloween guide 2026, halloween costumes, halloween decorations, trick or treat tips, halloween party supplies, halloweenready",
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
            {site.name} helps you plan costumes, decor, and parties — then shop items with a shipping quote on each product page.
          </p>
          <div className="inline-block px-6 py-3 bg-white/15 backdrop-blur rounded-xl border border-nav/40 mb-8">
            <p className="text-sm text-white/80">Halloween 2026</p>
            <p className="text-2xl font-bold">Saturday, October 31, 2026</p>
            <p className="text-sm text-white/70 mt-1">Halloween is Saturday, October 31, 2026 — plan shipping from product quotes</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-spooky">
              Shop All Halloween
            </Link>
            <Link href="/categories/costumesandaccessories" className="btn-outline-spooky bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              Browse Costumes
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-accent mb-6">Why it helps to shop Halloween early</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            {applyInlineLinks(
              "Popular Halloween costumes sell out fast every October. Ordering early helps you lock in adult and kids sizes before the best looks disappear.",
              halloweenGuideInlineLinks
            )}
          </p>
          <p>
            {applyInlineLinks(
              "Halloween decorations for the porch and living room also move quickly, so it helps to order display pieces with enough time to set them up before trick-or-treat night.",
              halloweenGuideInlineLinks
            )}
          </p>
          <p>
            {applyInlineLinks(
              `${site.name} fulfills Halloween catalog items through international dropshipping partners. Check the product-page shipping quote for California, New York, Texas, Florida, and other destinations. Add Halloween party supplies to the same order so tableware matches the rest of your celebration.`,
              halloweenGuideInlineLinks
            )}
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
              <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="p-6 md:p-8 rounded-2xl border border-nav/30 bg-primary/10 card-spooky">
          <p className="text-sm uppercase tracking-widest text-nav mb-2">Featured</p>
          <h2 className="text-2xl font-bold text-accent mb-3">Halloween Events Guide</h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            Planning a haunt night, corn maze, pumpkin patch, theme-park Halloween event, or trunk-or-treat?
            Our informational events hub covers how to choose attractions and what to pack — HalloweenReady
            does not sell tickets.
          </p>
          <Link href="/halloween-guide/events" className="btn-spooky inline-block">
            Explore events guide →
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-accent mb-6">Costume ideas for 2026</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {costumeIdeas.map((idea) => (
            <div key={idea.title} className="p-5 card-spooky">
              <h3 className="font-bold text-nav mb-2">{idea.title}</h3>
              <p className="text-sm text-slate-600">{idea.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-nav/20">
        <h2 className="text-2xl font-bold text-accent mb-4">Halloween shopping by city</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Start with a city page for local shopping context, then confirm delivery on the product page.
        </p>
        <div className="flex flex-wrap gap-2">
          {PRIORITY_CITY_LINKS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="px-3 py-1.5 rounded-full border border-nav/40 text-sm text-accent hover:border-nav hover:text-nav"
            >
              {c.label.replace("Halloween in ", "")}
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

      <section className="max-w-5xl mx-auto px-4">
        <InternalLinksSection
          groups={getInternalLinkGroups({ type: "guide" })}
          title="Related Halloween pages"
          intro="Shop collections, destination pages, and featured articles from this guide."
        />
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12 border-t border-nav/20">
        <h2 className="text-2xl font-bold text-accent text-center mb-8">Halloween FAQ</h2>
        <div className="space-y-3">
          {faqs.slice(0, 6).map((f) => (
            <details key={f.q} className="card-spooky p-5">
              <summary className="font-semibold text-nav cursor-pointer text-sm">{f.q}</summary>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">{f.a}</p>
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
          Shop costumes, decor, and party supplies. Confirm shipping on each product before you check out.
        </p>
        <Link href="/products" className="btn-spooky inline-block">
          Shop Halloween Now
        </Link>
      </section>
    </div>
  );
}
