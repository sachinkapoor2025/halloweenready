import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { seoEventsHub } from "@/lib/content/seo-data";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { getInternalLinkGroups } from "@halloweenready/shared";

// TODO: convert to transactional once ticket booking ships

const pageTitle = "Halloween Events Guide 2026 — Haunts, Mazes & Family Fun";

export const metadata: Metadata = pageMetadata({
  title: pageTitle,
  description:
    "Informational Halloween events guide: haunted houses, corn mazes, pumpkin patches, theme-park nights, and trunk-or-treat tips. HalloweenReady does not sell attraction tickets.",
  path: "/halloween-guide/events",
  absoluteTitle: true,
  keywords:
    "halloween events guide, haunted house tips, corn maze pumpkin patch checklist, theme park halloween, trunk or treat, halloweenready",
});

const faqs = [
  {
    q: "Does HalloweenReady sell haunted house or theme-park tickets?",
    a: "No. HalloweenReady does not sell attraction tickets. This hub is informational only — use official venue sites or trusted ticketing partners when you are ready to book.",
  },
  {
    q: "How do I choose a haunted house that fits my group?",
    a: "Match intensity to your guests: family-friendly haunts, classic haunted trails, or extreme scream parks. Check age guidelines, accessibility notes, and whether photos or touch are allowed before you go.",
  },
  {
    q: "What should I pack for a corn maze or pumpkin patch?",
    a: "Comfortable shoes, layers for evening chill, water, and a flashlight or glow sticks for dusk. Face paint and simple accessories are fun for photos — shop categories linked below if you need gear.",
  },
  {
    q: "Are trunk-or-treat events good for young kids?",
    a: "Often yes. Community trunk-or-treat and local fall festivals are usually shorter, better lit, and easier to supervise than long neighborhood routes — confirm details with the host school, church, or city page.",
  },
];

export default function HalloweenEventsGuidePage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Halloween Guide", href: "/halloween-guide" },
    { label: "Events Guide" },
  ];

  const hauntKws = seoEventsHub.keywordsBySubcategory["Haunted Houses"] ?? [];
  const mazeKws = seoEventsHub.keywordsBySubcategory["Corn Mazes & Pumpkin Patches"] ?? [];
  const parkKws = seoEventsHub.keywordsBySubcategory["Theme Park Halloween Events"] ?? [];
  const familyKws = seoEventsHub.keywordsBySubcategory["Family & Community Events"] ?? [];
  const cityKws = seoEventsHub.keywordsBySubcategory["City Ticket Searches"] ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 overflow-x-hidden min-w-0">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            crumbs.map((c) => ({
              name: c.label,
              path: c.href ?? "/halloween-guide/events",
            }))
          ),
          faqJsonLd(faqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <header className="mb-8">
        <p className="text-sm uppercase tracking-widest text-nav mb-2">Halloween 2026 · Events</p>
        <h1 className="text-3xl font-bold text-primary mb-3 break-words">{pageTitle}</h1>
        <p className="text-slate-600 leading-relaxed">
          Plan nights out for haunted attractions, fall farms, theme-park Halloween events, and community
          gatherings — then pack costumes, glow sticks, and accessories from HalloweenReady.
        </p>
      </header>

      <aside className="mb-10 p-5 rounded-xl border border-nav/30 bg-primary/10 text-sm text-slate-700 leading-relaxed">
        <p className="font-semibold text-primary mb-1">Ticket disclaimer</p>
        <p>{seoEventsHub.disclaimer}</p>
        <p className="mt-2 text-slate-600">
          We share planning tips only. Always verify schedules, age rules, and tickets on the attraction’s
          official channels — we never list fabricated prices, dates, or buy links here.
        </p>
      </aside>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">Best Halloween Attractions to Visit</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            “Best” depends on your group: some want a classic haunted house near major metros, others want a
            quieter pumpkin patch or a daytime fall festival. Shoppers often search phrases like haunted house
            tickets in California or Los Angeles, corn maze tickets in Colorado or New York, and pumpkin patch
            tickets in Philadelphia or Phoenix — use those searches as research starting points, not as a
            promise of inventory on this site.
          </p>
          <p>
            Build a short list of venues, read recent guest notes about wait times and intensity, and decide
            whether you want a single haunt night or a full weekend of farms and mazes. City-style searches
            such as best halloween event tickets in Chicago, Atlanta, Boston, Dallas, or Seattle help you
            compare options in your region without locking you into one brand of scream park.
          </p>
          {cityKws.length > 0 && (
            <p className="text-sm text-slate-500">
              Research tip: pair your city with attraction type (haunt, maze, patch, or trunk-or-treat) on
              official venue and city event calendars.
            </p>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">How to Choose a Haunted House</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Start with intensity. Family-friendly haunted house experiences and haunted attractions marketed
            for kids differ sharply from extreme haunted house nights, scream parks, and escape-room hybrids.
            If someone in your group is haunt-curious but not scare-obsessed, look for haunted trails or
            haunted hayrides with clearer pacing than nonstop jump-scare warehouses.
          </p>
          <p>
            Practical checks: age or height guidance, whether actors can touch guests, photo policies, and
            whether drive-thru haunted house formats exist if walking long queues is hard. Group tickets and
            local haunted house hours are published by venues — compare them directly rather than relying on
            third-party summaries.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Match scare level to the least brave person you care about bringing.</li>
            <li>Plan arrival buffers; popular haunted trail tickets often mean longer lines on peak nights.</li>
            <li>Pack layers, closed-toe shoes, and a simple glow accessory so your group stays visible in dark lots.</li>
          </ul>
          {hauntKws.length > 0 && (
            <p className="text-sm text-slate-500">
              When you research, you may see terms like haunted attraction tickets, haunted hayride tickets, or
              scream park tickets — always open the venue’s own booking flow for real availability.
            </p>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">Corn Maze & Pumpkin Patch Checklist</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Corn mazes and pumpkin patches are the daylight (and golden-hour) half of Halloween season. Families
            often look for affordable corn maze near me ideas, u-pick pumpkin patch days, and pumpkin patch with
            hayride experiences — great for photos and younger kids who are not ready for extreme haunts.
          </p>
          <p>
            Some farms run haunted corn maze nights after dark; others stay family-forward fall festivals. Read
            the farm’s own page for whether you need timed entry, how parking works, and what outside food is
            allowed. Combo corn maze and pumpkin patch visits are common on weekends — arrive with a plan for
            naps, snacks, and a pumpkin transport strategy.
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700">
            <li>Confirm open hours and whether night mazes differ from daytime tickets.</li>
            <li>Wear closed shoes; mud and crushed stalks are part of the charm.</li>
            <li>Bring a flashlight or glow sticks if you may stay past dusk.</li>
            <li>Decide pumpkin sizes before you walk deep into the patch.</li>
            <li>Pack wet wipes, a tote for small purchases, and a charged phone for meet-up pins.</li>
          </ol>
          {mazeKws.length > 0 && (
            <p className="text-sm text-slate-500">
              Searches for family pumpkin patch event tickets or haunted corn maze tickets near me are useful
              filters — verify details on the farm’s site before you drive out.
            </p>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">Theme Park Halloween Events Overview</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Major parks run seasonal overlays with names you will recognize in searches — Halloween Horror
            Nights, Fright Fest, Howl-O-Scream, Scary Farm, Halloween Haunt, and not-so-scary parties aimed at
            families. Formats differ: some nights are scare-zone heavy; others keep daytime rides with costume
            meet-and-greets.
          </p>
          <p>
            Treat theme-park Halloween event tickets like any peak-season visit: check the park’s official
            calendar for operating nights, height rules for mazes, and whether a separate fright ticket is
            required beyond general admission. We do not publish prices or buy links here — park sites and
            authorized sellers are the source of truth.
          </p>
          <p>
            Packing tip: comfortable shoes, a light layer for night queues, and simple costume accessories that
            clear bag checks. Leave prop weapons and oversized foam pieces at home unless the park explicitly
            allows them.
          </p>
          {parkKws.length > 0 && (
            <p className="text-sm text-slate-500">
              Research phrases like fright fest tickets near me or not so scary halloween party tickets help you
              land on the right official event page for your park brand.
            </p>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">Family & Community Events (Trunk-or-Treat)</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Trunk-or-treat events, community Halloween nights, kids’ fall festivals, light shows, and occasional
            ghost tours for families offer shorter, supervised alternatives to long street routes. Local
            halloween carnival and fun-house style events show up on school, church, library, and city
            calendars — start there for dates that match your ZIP code.
          </p>
          <p>
            If you host a trunk booth, decorate the car hatch, pack pre-portioned candy, and keep a clear walk
            path. Glow sticks, face paint, and simple accessories make photos pop without blocking other
            families. Halloween 5K fun runs and light shows are separate RSVP worlds — register only through
            the organizer’s listed channel.
          </p>
          {familyKws.length > 0 && (
            <p className="text-sm text-slate-500">
              Searches for trunk or treat event near me or kids halloween event tickets near me are starting
              points; confirm free vs. paid entry with the host, not with third-party rumor posts.
            </p>
          )}
        </div>
      </section>

      <section className="mb-12 p-6 rounded-xl border border-nav/20 bg-slate-50">
        <h2 className="text-xl font-bold text-primary mb-2">Pack your bag for event night</h2>
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
          HalloweenReady sells costumes, glow & novelty toys, face-paint-friendly accessories, party supplies,
          and home decorations — not attraction tickets. Gear up before you hit the haunt, maze, or
          trunk-or-treat lot:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {seoEventsHub.relatedProductCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="p-4 card-spooky hover:border-nav transition flex items-center justify-between group text-accent font-medium"
            >
              {cat.label}
              <span className="text-nav group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12 border-t border-nav/20 pt-10">
        <h2 className="text-2xl font-bold text-primary text-center mb-8">Events FAQ</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card-spooky p-5">
              <summary className="font-semibold text-nav cursor-pointer text-sm">{f.q}</summary>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary via-spooky to-nav text-white py-12 text-center px-4 rounded-2xl mb-6">
        <h2 className="text-2xl font-bold mb-3">Ready for the night out?</h2>
        <p className="text-white/85 max-w-xl mx-auto mb-6 leading-relaxed text-sm">
          Grab glow sticks, face paint, accessories, and costumes — then book tickets only through official
          attraction channels.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/categories/toysandnovelty" className="btn-spooky">
            Shop Glow & Novelty
          </Link>
          <Link
            href="/halloween-guide"
            className="btn-outline-spooky bg-white/10 border-white text-white hover:bg-white hover:text-primary"
          >
            Back to Halloween Guide
          </Link>
        </div>
      </section>

      <InternalLinksSection
        groups={getInternalLinkGroups({ type: "events" })}
        title="Related Halloween pages"
        intro="Shop costumes and accessories for the night out, or return to the planning guide."
      />
    </div>
  );
}
