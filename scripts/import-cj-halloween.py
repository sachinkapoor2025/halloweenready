#!/usr/bin/env python3
"""Fetch one page of CJ Halloween products and merge into bundled catalogs."""
from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENV = ROOT / "apps/api/.env"
CATALOGS = [
    ROOT / "apps/api/src/data/halloweenready-catalog.json",
    ROOT / "scripts/data/halloweenready-catalog.json",
]
API = "https://developers.cjdropshipping.com/api2.0/v1"
PAGE_SIZE = 12
PAGE = int(__import__("os").environ.get("CJ_PAGE", "1"))


def load_key() -> str:
    for line in ENV.read_text().splitlines():
        if line.startswith("CJ_API_KEY="):
            return line.split("=", 1)[1].strip()
    raise SystemExit("CJ_API_KEY missing in apps/api/.env")


def api_json(method: str, path: str, token: str | None = None, body: dict | None = None, query: dict | None = None):
    url = API + path
    if query:
        url += "?" + urllib.parse.urlencode(query, doseq=True)
    data = None if body is None else json.dumps(body).encode()
    headers = {"Content-Type": "application/json"}
    if token:
        headers["CJ-Access-Token"] = token
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=60) as res:
        return json.load(res)


def slugify(text: str) -> str:
    s = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    s = re.sub(r"[\s_-]+", "-", s)
    return s.strip("-") or "cj-product"


def strip_html(html: str) -> str:
    html = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.I)
    html = re.sub(r"<style[\s\S]*?</style>", " ", html, flags=re.I)
    html = re.sub(r"<[^>]+>", " ", html)
    html = html.replace("&nbsp;", " ").replace("&amp;", "&").replace("&quot;", '"')
    return re.sub(r"\s+", " ", html).strip()


def money(n: float) -> float:
    return round(n + 1e-9, 2)


def map_category(text: str) -> str:
    hay = text.lower()
    rules = [
        ("costumesandaccessories", "costume cosplay mask wig cape hat gloves clothing dress cloak".split()),
        ("jewellryandaccessories", "jewel necklace earring bracelet ring accessory".split()),
        ("candlesandfragrance", "candle fragrance incense wax scent".split()),
        ("toysandnovelty", "toy novelty game puzzle plush figure".split()),
        ("printedandpapercrafts", "paper card sticker print banner poster".split()),
        ("lifestyleandwearable", "wearable watch bag backpack shoe sock clothes".split()),
        ("partysupplier", "party balloon tableware cup plate napkin confetti".split()),
        ("home-decoration", "decor decoration home garden light lamp pumpkin skeleton spider ghost halloween".split()),
    ]
    for slug, needles in rules:
        if any(n in hay for n in needles):
            return slug
    return "home-decoration"


def num(value) -> float | None:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value) if float(value) > 0 else None
    m = re.sub(r"[^\d.]", "", str(value).split("-")[0].split("–")[0])
    try:
        n = float(m)
        return n if n > 0 else None
    except ValueError:
        return None


def main() -> None:
    key = load_key()
    token = api_json("POST", "/authentication/getAccessToken", body={"apiKey": key})["data"]["accessToken"]
    time.sleep(1.1)
    listed = api_json(
        "GET",
        "/product/listV2",
        token=token,
        query={"keyWord": "halloween", "page": PAGE, "size": PAGE_SIZE},
    )
    if listed.get("code") != 200:
        raise SystemExit(listed)
    data = listed.get("data") or {}
    pids = []
    for block in data.get("content") or []:
        for row in block.get("productList") or []:
            if row.get("id"):
                pids.append(row)
    print(f"CJ Halloween totalRecords={data.get('totalRecords')} page={PAGE} fetching {min(PAGE_SIZE, len(pids))} details")

    new_products = []
    for row in pids[:PAGE_SIZE]:
        time.sleep(1.15)
        detail = api_json("GET", "/product/query", token=token, query={"pid": row["id"]})
        if detail.get("code") != 200:
            print("skip", row["id"], detail.get("message"))
            continue
        p = detail["data"]
        name = (p.get("productNameEn") or row.get("nameEn") or "Halloween product").strip()
        pid = p.get("pid") or row["id"]
        slug = f"{slugify(name)[:60]}-{re.sub(r'[^a-zA-Z0-9]', '', pid)[:8].lower()}"
        variants = p.get("variants") or []
        costs = [num(v.get("variantSellPrice")) for v in variants]
        costs = [c for c in costs if c]
        cost = costs[0] if costs else num(p.get("sellPrice")) or num(row.get("nowPrice")) or num(row.get("sellPrice"))
        if not cost:
            print("no price", name)
            continue
        images = []
        for url in [p.get("bigImage"), *(p.get("productImageSet") or []), row.get("bigImage")]:
            if isinstance(url, str) and url.startswith("http") and url not in images:
                images.append(url)
        desc = strip_html(p.get("description") or "") or name
        cat = map_category(" ".join(filter(None, [p.get("categoryName"), name])))
        vid = next((v.get("vid") for v in variants if v.get("vid")), None)
        sku = (variants[0].get("variantSku") if variants else None) or p.get("productSku")
        inv = 0
        for v in variants:
            for stock in v.get("inventories") or []:
                inv += int(stock.get("totalInventory") or 0)
        product = {
            "name": name[:160],
            "slug": slug,
            "description": desc[:4000],
            "price": money(cost * 2.0),
            "compareAtPrice": money(cost * 2.5),
            "currency": "USD",
            "categorySlug": cat,
            "images": images[:8],
            "sku": sku,
            "inventory": inv if inv > 0 else 200,
            "tags": ["cj-dropshipping", "halloween"],
            "vendorSlug": "cj-dropshipping",
            "vendorCost": money(cost),
            "cjPid": pid,
            "published": True,
            "seoTitle": f"{name[:80]} | HalloweenReady",
            "seoDescription": desc[:160],
        }
        if vid:
            product["cjVid"] = vid
        new_products.append(product)
        print("imported", product["slug"], product["price"], product["categorySlug"])

    for path in CATALOGS:
        catalog = json.loads(path.read_text())
        existing = {p.get("slug") for p in catalog.get("products") or []}
        existing_pids = {p.get("cjPid") for p in catalog.get("products") or []}
        added = 0
        for product in new_products:
            if product["slug"] in existing or product.get("cjPid") in existing_pids:
                continue
            catalog["products"].append(product)
            added += 1
        path.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n")
        print(f"wrote {added} new products to {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
