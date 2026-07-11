#!/usr/bin/env python3
"""Generate HalloweenReady SEO data from data/seo/halloweenready-keywords.csv.

Outputs:
  apps/web/src/lib/content/seo-keywords.data.json
  apps/web/src/lib/content/seo-locations.data.json
  apps/web/src/lib/content/seo-blog-posts.data.json
  apps/web/src/lib/content/seo-events.data.json

Re-run after updating halloweenready.xlsx / the CSV.
"""

from __future__ import annotations

import csv
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV = ROOT / "data/seo/halloweenready-keywords.csv"
OUT = ROOT / "apps/web/src/lib/content"

CAT_MAP = {
    "Costumes": "costumesandaccessories",
    "Accessories": "costumesandaccessories",
    "Decorations": "home-decoration",
    "Party Supplies": "partysupplier",
    "Candy & Treats": "partysupplier",
    "Toys & Novelty": "toysandnovelty",
    "Candles & Fragrance": "candlesandfragrance",
    "Jewelry & Accessories": "jewellryandaccessories",
    "Lifestyle & Wearable": "lifestyleandwearable",
    "Printed & Paper Crafts": "printedandpapercrafts",
}

# Primary SEO phrasing for each catalog category (human-edited, keyword-informed).
CATEGORY_PRIMARY = {
    "costumesandaccessories": {
        "title": "Halloween Costumes Online | Adult & Kids | USA Shipping",
        "description": "Shop adult, kids & group Halloween costumes plus accessories. Fast USA delivery from HalloweenReady — order by Oct 25 for Halloween 2026.",
        "h1": "Adult, Kids & Group Halloween Costumes",
        "alt": "Adult and kids Halloween costumes with accessories for USA delivery",
        "primaryKeyword": "halloween costumes",
    },
    "home-decoration": {
        "title": "Halloween Decorations Online | Yard & Indoor | USA",
        "description": "Shop outdoor Halloween decorations, inflatables, skeletons & LED pumpkins. Haunt your yard with fast USA shipping from HalloweenReady.",
        "h1": "Outdoor & Indoor Halloween Decorations",
        "alt": "Outdoor Halloween yard decorations and indoor haunted house props",
        "primaryKeyword": "halloween decorations",
    },
    "partysupplier": {
        "title": "Halloween Party Supplies & Candy | USA Delivery",
        "description": "Halloween party supplies, tableware, balloons & trick-or-treat candy. Bundle your party kit with fast domestic shipping across all 50 states.",
        "h1": "Halloween Party Supplies & Treat Candy",
        "alt": "Halloween party tableware balloons and trick-or-treat candy bowls",
        "primaryKeyword": "halloween party supplies",
    },
    "toysandnovelty": {
        "title": "Halloween Toys & Novelty Gifts | Fast USA Shipping",
        "description": "Shop Halloween novelty toys, prank props & goodie-bag fillers. Spooky fun gifts with fast USA delivery from HalloweenReady.",
        "h1": "Halloween Toys & Novelty Gifts",
        "alt": "Halloween novelty toys and spooky goodie bag fillers",
        "primaryKeyword": "halloween toys",
    },
    "candlesandfragrance": {
        "title": "Halloween Candles & Fragrance | Pumpkin Spice USA",
        "description": "Pumpkin spice candles, skull tealights & haunted house fragrances. Set the mood with Halloween candles shipped fast across the USA.",
        "h1": "Halloween Candles & Spooky Fragrances",
        "alt": "Pumpkin spice Halloween candles and haunted house reed diffusers",
        "primaryKeyword": "halloween candles",
    },
    "jewellryandaccessories": {
        "title": "Halloween Jewelry & Accessories | Costume Finishers",
        "description": "Spider-web chokers, skeleton rings & gothic Halloween jewelry. Finish your costume look with fast USA shipping from HalloweenReady.",
        "h1": "Halloween Jewelry & Costume Accessories",
        "alt": "Gothic Halloween jewelry including spider web chokers and skull bracelets",
        "primaryKeyword": "halloween jewelry",
    },
    "lifestyleandwearable": {
        "title": "Halloween Apparel & Lifestyle Gifts | USA Shipping",
        "description": "Halloween hoodies, socks, tote bags & printed mugs. Everyday spooky style and gifts with fast domestic USA delivery.",
        "h1": "Halloween Apparel & Lifestyle Wearables",
        "alt": "Halloween hoodies tote bags and printed lifestyle gifts",
        "primaryKeyword": "halloween apparel",
    },
    "printedandpapercrafts": {
        "title": "Halloween Paper Crafts & Cards | Printables USA",
        "description": "Halloween wrapping paper, gift tags, window clings & greeting cards. Printable crafts and party paper goods with USA shipping.",
        "h1": "Halloween Printed & Paper Crafts",
        "alt": "Halloween wrapping paper gift tags and spooky greeting cards",
        "primaryKeyword": "halloween paper crafts",
    },
}

LOCATIONS = [
    # Existing
    ("california", "California", "state", None, ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Oakland", "Fresno"], "West Coast"),
    ("new-york", "New York", "state", None, ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse", "Yonkers"], "Northeast"),
    ("texas", "Texas", "state", None, ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso"], "South"),
    ("florida", "Florida", "state", None, ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"], "Southeast"),
    ("new-jersey", "New Jersey", "state", None, ["Newark", "Jersey City", "Paterson", "Edison", "Trenton"], "Northeast"),
    ("los-angeles", "Los Angeles", "city", "CA", ["Downtown LA", "Hollywood", "Santa Monica", "Pasadena", "Long Beach"], "West Coast"),
    ("chicago", "Chicago", "city", "IL", ["Loop", "Lincoln Park", "Wicker Park", "Hyde Park", "Evanston"], "Midwest"),
    ("houston", "Houston", "city", "TX", ["Downtown Houston", "Sugar Land", "Katy", "Pearland", "The Woodlands"], "South"),
    ("san-francisco", "San Francisco", "city", "CA", ["SOMA", "Mission District", "Marina", "Sunset", "Oakland Bay Area"], "West Coast"),
    # New states from keyword research
    ("illinois", "Illinois", "state", None, ["Chicago", "Aurora", "Naperville", "Springfield", "Peoria"], "Midwest"),
    ("pennsylvania", "Pennsylvania", "state", None, ["Philadelphia", "Pittsburgh", "Allentown", "Harrisburg", "Erie"], "Northeast"),
    ("ohio", "Ohio", "state", None, ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"], "Midwest"),
    ("georgia", "Georgia", "state", None, ["Atlanta", "Savannah", "Augusta", "Athens", "Macon"], "Southeast"),
    ("arizona", "Arizona", "state", None, ["Phoenix", "Tucson", "Mesa", "Scottsdale", "Chandler"], "Southwest"),
    ("massachusetts", "Massachusetts", "state", None, ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"], "Northeast"),
    ("michigan", "Michigan", "state", None, ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing", "Dearborn"], "Midwest"),
    ("north-carolina", "North Carolina", "state", None, ["Charlotte", "Raleigh", "Durham", "Greensboro", "Asheville"], "Southeast"),
    ("virginia", "Virginia", "state", None, ["Virginia Beach", "Richmond", "Norfolk", "Arlington", "Alexandria"], "Mid-Atlantic"),
    ("washington", "Washington", "state", None, ["Seattle", "Spokane", "Tacoma", "Bellevue", "Olympia"], "Pacific Northwest"),
    ("colorado", "Colorado", "state", None, ["Denver", "Colorado Springs", "Aurora", "Boulder", "Fort Collins"], "Mountain West"),
    # New cities
    ("dallas", "Dallas", "city", "TX", ["Downtown Dallas", "Uptown", "Deep Ellum", "Plano", "Frisco"], "South"),
    ("miami", "Miami", "city", "FL", ["Downtown Miami", "Brickell", "South Beach", "Coral Gables", "Little Havana"], "Southeast"),
    ("atlanta", "Atlanta", "city", "GA", ["Midtown", "Buckhead", "Decatur", "Sandy Springs", "East Atlanta"], "Southeast"),
    ("phoenix", "Phoenix", "city", "AZ", ["Downtown Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler"], "Southwest"),
    ("boston", "Boston", "city", "MA", ["Back Bay", "Cambridge", "Somerville", "Brookline", "South End"], "Northeast"),
    ("seattle", "Seattle", "city", "WA", ["Capitol Hill", "Ballard", "Queen Anne", "Bellevue", "Fremont"], "Pacific Northwest"),
    ("san-diego", "San Diego", "city", "CA", ["Downtown SD", "La Jolla", "Pacific Beach", "North Park", "Chula Vista"], "West Coast"),
    ("philadelphia", "Philadelphia", "city", "PA", ["Center City", "University City", "Fishtown", "South Philly", "Manayunk"], "Northeast"),
    ("austin", "Austin", "city", "TX", ["Downtown Austin", "South Congress", "East Austin", "Round Rock", "Cedar Park"], "South"),
    ("denver", "Denver", "city", "CO", ["LoDo", "Capitol Hill", "RiNo", "Aurora", "Lakewood"], "Mountain West"),
    ("las-vegas", "Las Vegas", "city", "NV", ["The Strip", "Downtown Vegas", "Summerlin", "Henderson", "North Las Vegas"], "Southwest"),
]

# Seasonal note by region — keeps city pages from being thin clones.
REGION_NOTES = {
    "West Coast": "Mild evenings mean outdoor yard displays and porch lighting stay popular through late October.",
    "Northeast": "Cooler October nights favor layered costumes, porch lighting, and indoor party setups.",
    "South": "Warm autumn weather means breathable costume fabrics and heat-safe outdoor decor matter.",
    "Southeast": "Humidity-friendly outdoor décor and late-evening trick-or-treat setups are common here.",
    "Midwest": "Crisp fall weather supports classic yard haunt setups and last-minute costume swaps.",
    "Southwest": "Dry evenings suit LED lighting, inflatables, and lightweight costume materials.",
    "Pacific Northwest": "Expect rain-ready outdoor décor — prioritize weather-tolerant yard pieces.",
    "Mountain West": "Cooler nights arrive early — plan layered costumes and warm party setups.",
    "Mid-Atlantic": "Classic suburban trick-or-treat nights drive demand for candy, yard décor, and kids costumes.",
}

BLOG_SPECS = [
    {
        "slug": "diy-halloween-costume-ideas-2026",
        "title": "DIY Halloween Costume Ideas 2026 — Easy Looks That Ship Fast",
        "keyword": "Diy halloween costume ideas",
        "relatedCategory": "costumesandaccessories",
        "topics": ["diy", "costume", "last minute"],
    },
    {
        "slug": "easy-diy-halloween-decorations",
        "title": "Easy DIY Halloween Decorations That Look Store-Bought",
        "keyword": "Easy diy halloween decorations",
        "relatedCategory": "home-decoration",
        "topics": ["diy", "decor", "budget"],
    },
    {
        "slug": "budget-halloween-party-ideas",
        "title": "Budget Halloween Party Ideas for Homes & Apartments",
        "keyword": "Budget halloween party ideas",
        "relatedCategory": "partysupplier",
        "topics": ["budget", "party"],
    },
    {
        "slug": "halloween-budget-tips-2026",
        "title": "Halloween Budget Tips 2026 — Spend Less, Haunt More",
        "keyword": "Halloween budget tips for 2026",
        "relatedCategory": "home-decoration",
        "topics": ["budget", "apartment", "renters"],
    },
    {
        "slug": "pumpkin-carving-ideas-for-beginners",
        "title": "Pumpkin Carving Ideas for Beginners — Step by Step",
        "keyword": "Pumpkin carving ideas for beginners",
        "relatedCategory": "printedandpapercrafts",
        "topics": ["pumpkin", "carving"],
    },
    {
        "slug": "how-to-carve-a-pumpkin-step-by-step",
        "title": "How to Carve a Pumpkin Step by Step (Safe & Simple)",
        "keyword": "How to carve a pumpkin step by step",
        "relatedCategory": "printedandpapercrafts",
        "topics": ["pumpkin", "safety"],
    },
    {
        "slug": "halloween-safety-tips-for-families",
        "title": "Halloween Safety Tips for Families, First-Timers & Offices",
        "keyword": "Halloween safety tips for first timers",
        "relatedCategory": "costumesandaccessories",
        "topics": ["safety"],
    },
    {
        "slug": "group-halloween-costume-ideas-for-friends",
        "title": "Group Halloween Costume Ideas for Friends & Couples",
        "keyword": "Group halloween costume ideas for friends",
        "relatedCategory": "costumesandaccessories",
        "topics": ["group", "costume"],
    },
    {
        "slug": "halloween-makeup-ideas-for-beginners",
        "title": "Halloween Makeup Ideas for Beginners & College Students",
        "keyword": "Halloween makeup ideas for beginners",
        "relatedCategory": "costumesandaccessories",
        "topics": ["makeup"],
    },
    {
        "slug": "halloween-candy-tips-2026",
        "title": "Halloween Candy Tips 2026 — Bulk Buying & Allergy-Friendly",
        "keyword": "Halloween candy tips for 2026",
        "relatedCategory": "partysupplier",
        "topics": ["candy"],
    },
    {
        "slug": "halloween-party-menu-ideas",
        "title": "Halloween Party Menu Ideas — Spooky Snacks & Table Setup",
        "keyword": "Halloween party menu ideas",
        "relatedCategory": "partysupplier",
        "topics": ["party", "menu"],
    },
    {
        "slug": "apartment-halloween-decorating-tips",
        "title": "Apartment Halloween Decorating Tips for Renters",
        "keyword": "Halloween budget tips for apartments",
        "relatedCategory": "home-decoration",
        "topics": ["apartment", "renter", "budget"],
    },
    {
        "slug": "when-is-halloween-2026-order-deadline",
        "title": "When Is Halloween 2026? Order Deadline for USA Delivery",
        "keyword": "When is halloween 2026",
        "relatedCategory": "costumesandaccessories",
        "topics": ["2026", "deadline", "delivery"],
    },
    {
        "slug": "express-halloween-delivery-usa-guide",
        "title": "Express Halloween Delivery USA — How to Get Gear On Time",
        "keyword": "Express halloween delivery usa",
        "relatedCategory": "home-decoration",
        "topics": ["delivery", "express"],
    },
    {
        "slug": "outdoor-halloween-decoration-ideas",
        "title": "Outdoor Halloween Decoration Ideas for Front Yards",
        "keyword": "Outdoor halloween decorations",
        "relatedCategory": "home-decoration",
        "topics": ["outdoor", "yard", "inflatable"],
    },
    {
        "slug": "inflatable-halloween-decorations-guide",
        "title": "Inflatable Halloween Decorations Guide — Setup & Tips",
        "keyword": "Inflatable halloween decorations",
        "relatedCategory": "home-decoration",
        "topics": ["inflatable"],
    },
    {
        "slug": "cheap-halloween-decorations-that-look-expensive",
        "title": "Cheap Halloween Decorations That Look Expensive",
        "keyword": "Cheap halloween decorations that look expensive",
        "relatedCategory": "home-decoration",
        "topics": ["budget", "decor"],
    },
    {
        "slug": "best-halloween-costume-store-usa",
        "title": "Best Halloween Costume Store USA — What to Look For",
        "keyword": "Best halloween costume store usa",
        "relatedCategory": "costumesandaccessories",
        "topics": ["store", "costume", "usa"],
    },
]


def load_rows() -> list[dict]:
    with CSV.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def score_kw(kw: str, intent: str) -> int:
    s = 0
    if intent == "Transactional":
        s += 10
    elif intent.startswith("Local"):
        s += 6
    n = len(kw)
    if 12 <= n <= 42:
        s += 8
    elif n <= 55:
        s += 4
    low = kw.lower()
    if any(x in low for x in ("buy ", "online", "for sale", "usa")):
        s += 2
    if any(x in low for x in ("near me", "kit", "set", "pack", "ideas for sale")):
        s -= 2
    return s


def clean_kw_list(kws: list[str], limit: int = 40) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for k in kws:
        key = k.lower().strip()
        if key in seen:
            continue
        seen.add(key)
        out.append(k.strip())
        if len(out) >= limit:
            break
    return out


def location_keywords(rows: list[dict], label: str) -> list[str]:
    needle = label.lower()
    hits = []
    for r in rows:
        if needle in r["keyword"].lower() and (
            r["category"] == "City & Local Delivery" or r["intent"].startswith("Local")
        ):
            hits.append(r["keyword"])
    # fallback: any keyword mentioning the place
    if len(hits) < 5:
        for r in rows:
            if needle in r["keyword"].lower():
                hits.append(r["keyword"])
    return clean_kw_list(hits, 12)


def build_keywords(rows: list[dict]) -> dict:
    by_slug: dict[str, list[tuple[int, str, str]]] = defaultdict(list)
    core: list[str] = []
    informational: list[str] = []
    attractions: dict[str, list[str]] = defaultdict(list)

    for r in rows:
        kw, cat, intent, sub = r["keyword"], r["category"], r["intent"], r["subcategory"]
        if cat == "Informational & Brand":
            informational.append(kw)
            continue
        if cat == "Halloween Attractions & Tickets":
            attractions[sub].append(kw)
            continue
        if cat == "City & Local Delivery":
            continue
        slug = CAT_MAP.get(cat)
        if not slug:
            continue
        by_slug[slug].append((score_kw(kw, intent), kw, intent))

    product_by_target: dict[str, list[str]] = {}
    for slug, items in by_slug.items():
        ranked = sorted(items, key=lambda x: -x[0])
        product_by_target[slug] = clean_kw_list([k for _, k, _ in ranked], 60)
        # core = top short transactional across categories
        for _, k, intent in ranked[:8]:
            if intent == "Transactional" and len(k) < 50:
                core.append(k)

    # enrich with CATEGORY_PRIMARY keywords first
    for slug, meta in CATEGORY_PRIMARY.items():
        kws = product_by_target.get(slug, [])
        seed = [meta["primaryKeyword"], meta["h1"].lower()]
        product_by_target[slug] = clean_kw_list(seed + kws, 60)

    return {
        "core": clean_kw_list(core, 80),
        "informational": clean_kw_list(informational, 230),
        "productByTarget": product_by_target,
        "attractionsBySubcategory": {k: clean_kw_list(v, 40) for k, v in attractions.items()},
        "categoryPrimary": CATEGORY_PRIMARY,
    }


def build_locations(rows: list[dict]) -> list[dict]:
    out = []
    for slug, label, region, state, areas, region_name in LOCATIONS:
        kws = location_keywords(rows, label)
        primary = kws[0] if kws else f"halloween delivery {label}"
        title = f"Halloween Delivery to {label} | Costumes & Decor USA"
        if len(title) > 60:
            title = f"Shop Halloween to {label} | Fast USA Delivery"
        description = (
            f"Shop Halloween costumes, decorations & party supplies with delivery to {label}. "
            f"Domestic USA shipping in 2–5 business days from HalloweenReady."
        )
        if len(description) > 155:
            description = description[:152] + "..."
        out.append(
            {
                "slug": slug,
                "label": label,
                "region": region,
                "state": state,
                "areas": areas,
                "regionName": region_name,
                "seasonalNote": REGION_NOTES.get(region_name, ""),
                "keywords": kws or [
                    f"halloween costumes {label}",
                    f"halloween decorations {label}",
                    f"halloween delivery {label}",
                ],
                "title": title,
                "description": description,
                "h1": f"Halloween Costumes & Decor Delivery to {label}",
                "primaryKeyword": primary,
            }
        )
    return out


def build_blogs(rows: list[dict]) -> list[dict]:
    info = [r["keyword"] for r in rows if r["intent"] == "Informational"]
    posts = []
    for spec in BLOG_SPECS:
        related = [
            k
            for k in info
            if any(t in k.lower() for t in spec["topics"]) or spec["keyword"].lower() in k.lower()
        ]
        related = clean_kw_list([spec["keyword"]] + related, 18)
        posts.append(
            {
                "slug": spec["slug"],
                "title": spec["title"],
                "keyword": spec["keyword"],
                "relatedKeywords": related,
                "relatedCategory": spec["relatedCategory"],
                "description": f"{spec['title']} — practical HalloweenReady guide for USA shoppers preparing for Halloween 2026.",
                "excerpt": f"A practical guide covering {spec['keyword'].lower()} with shopping tips and USA delivery timing.",
            }
        )
    return posts


def build_events(rows: list[dict]) -> dict:
    attr = [r for r in rows if r["category"] == "Halloween Attractions & Tickets"]
    by_sub: dict[str, list[str]] = defaultdict(list)
    for r in attr:
        by_sub[r["subcategory"]].append(r["keyword"])
    return {
        # TODO: convert to transactional once ticket booking ships
        "hubPath": "/halloween-guide/events",
        "disclaimer": "HalloweenReady does not sell attraction tickets. This hub is informational only.",
        "keywordsBySubcategory": {k: clean_kw_list(v, 35) for k, v in by_sub.items()},
        "relatedProductCategories": [
            {"label": "Costume Accessories", "href": "/categories/costumesandaccessories"},
            {"label": "Party Supplies", "href": "/categories/partysupplier"},
            {"label": "Glow & Novelty Toys", "href": "/categories/toysandnovelty"},
            {"label": "Home Decorations", "href": "/categories/home-decoration"},
        ],
    }


def main() -> None:
    rows = load_rows()
    OUT.mkdir(parents=True, exist_ok=True)

    keywords = build_keywords(rows)
    locations = build_locations(rows)
    blogs = build_blogs(rows)
    events = build_events(rows)

    (OUT / "seo-keywords.data.json").write_text(
        json.dumps(keywords, separators=(",", ":")), encoding="utf-8"
    )
    (OUT / "seo-locations.data.json").write_text(
        json.dumps(locations, separators=(",", ":")), encoding="utf-8"
    )
    (OUT / "seo-blog-posts.data.json").write_text(
        json.dumps(blogs, separators=(",", ":")), encoding="utf-8"
    )
    (OUT / "seo-events.data.json").write_text(
        json.dumps(events, separators=(",", ":")), encoding="utf-8"
    )

    print(f"keywords core={len(keywords['core'])} categories={len(keywords['productByTarget'])}")
    print(f"locations={len(locations)}")
    print(f"blogs={len(blogs)}")
    print(f"attraction subs={list(events['keywordsBySubcategory'])}")


if __name__ == "__main__":
    main()
