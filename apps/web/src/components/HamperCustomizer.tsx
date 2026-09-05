"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { HamperCustomization, Product } from "@halloweenready/shared";
import { resolveHamperCustomization } from "@halloweenready/shared";
import { ProductImage } from "@/components/ProductImage";
import { useCurrency } from "@/lib/currency-context";

type Line = NonNullable<Product["hamperContents"]>[number];

function extraTotal(product: Product, extraSlugs: string[]): number {
  const bySlug = new Map((product.hamperAddons ?? []).map((a) => [a.slug, a.price]));
  return extraSlugs.reduce((sum, slug) => sum + (bySlug.get(slug) ?? 0), 0);
}

export function HamperCustomizer({
  product,
  onChange,
}: {
  product: Product;
  onChange: (custom: HamperCustomization | undefined, extrasUsd: number, valid: boolean) => void;
}) {
  const { format } = useCurrency();
  const contents = product.hamperContents ?? [];
  const addons = product.hamperAddons ?? [];
  const [open, setOpen] = useState(false);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [replacements, setReplacements] = useState<Record<string, string>>({});
  const [extras, setExtras] = useState<string[]>([]);

  const usedAsSwap = new Set(Object.values(replacements).filter(Boolean));
  const extraUsd = extraTotal(product, extras);

  const custom: HamperCustomization = useMemo(
    () => ({
      excludedSlugs: excluded,
      replacements: excluded
        .filter((from) => replacements[from])
        .map((fromSlug) => ({ fromSlug, toSlug: replacements[fromSlug]! })),
      extraSlugs: extras,
    }),
    [excluded, replacements, extras]
  );

  const resolved = resolveHamperCustomization(
    { hamperContents: contents, hamperAddons: addons, price: product.price },
    custom
  );

  const publish = (nextExcluded: string[], nextReps: Record<string, string>, nextExtras: string[]) => {
    const nextCustom: HamperCustomization = {
      excludedSlugs: nextExcluded,
      replacements: nextExcluded
        .filter((from) => nextReps[from])
        .map((fromSlug) => ({ fromSlug, toSlug: nextReps[fromSlug]! })),
      extraSlugs: nextExtras,
    };
    const check = resolveHamperCustomization(
      { hamperContents: contents, hamperAddons: addons, price: product.price },
      nextCustom
    );
    const empty =
      nextCustom.excludedSlugs.length === 0 &&
      nextCustom.replacements.length === 0 &&
      nextCustom.extraSlugs.length === 0;
    onChange(empty ? undefined : nextCustom, extraTotal(product, nextExtras), check.ok);
  };

  const toggleExclude = (slug: string) => {
    const next = excluded.includes(slug) ? excluded.filter((s) => s !== slug) : [...excluded, slug];
    const nextReps = { ...replacements };
    if (!next.includes(slug)) delete nextReps[slug];
    setExcluded(next);
    setReplacements(nextReps);
    publish(next, nextReps, extras);
  };

  const setReplacement = (fromSlug: string, toSlug: string) => {
    const nextReps = { ...replacements, [fromSlug]: toSlug };
    setReplacements(nextReps);
    publish(excluded, nextReps, extras);
  };

  const toggleExtra = (slug: string) => {
    const next = extras.includes(slug) ? extras.filter((s) => s !== slug) : [...extras, slug];
    setExtras(next);
    publish(excluded, replacements, next);
  };

  const addonOptions = (fromSlug: string) =>
    addons.filter((a) => !usedAsSwap.has(a.slug) || replacements[fromSlug] === a.slug);

  return (
    <div className="mb-5 rounded-xl border border-orange-100 bg-orange-50/40 p-4">
      <p className="text-sm font-semibold text-primary mb-2">What&apos;s in this hamper</p>
      <p className="text-xs text-slate-600 mb-3">
        Free shipping. Swap an included item for an add-on — the hamper stays {format(product.price, product.currency)}.
        Extra add-ons are charged on top.
      </p>
      <ul className="space-y-2 mb-3">
        {contents.map((item) => (
          <HamperLineRow
            key={item.slug}
            item={item}
            excluded={excluded.includes(item.slug)}
            replacement={replacements[item.slug]}
            addonOptions={addonOptions(item.slug)}
            onToggleExclude={() => toggleExclude(item.slug)}
            onReplace={(to) => setReplacement(item.slug, to)}
            format={format}
            currency={product.currency}
          />
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-semibold text-nav hover:underline"
      >
        {open ? "Hide extra add-ons" : "Add extra products"}
      </button>

      {open && (
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {addons.map((item) => {
            const usedSwap = usedAsSwap.has(item.slug);
            const checked = extras.includes(item.slug);
            return (
              <li key={item.slug}>
                <label
                  className={`flex items-center gap-2 rounded-lg border bg-white px-2 py-2 text-sm ${
                    usedSwap ? "opacity-50 cursor-not-allowed border-slate-100" : "border-slate-200 cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={usedSwap}
                    onChange={() => toggleExtra(item.slug)}
                  />
                  <ProductImage src={item.image} alt="" className="h-9 w-9 rounded object-cover shrink-0 bg-slate-100" />
                  <span className="min-w-0 flex-1">
                    <Link href={`/products/${item.slug}`} className="font-medium text-primary hover:underline line-clamp-2">
                      {item.name}
                    </Link>
                    <span className="block text-xs text-slate-500">+{format(item.price, product.currency)}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}

      {extraUsd > 0 && (
        <p className="mt-3 text-sm font-semibold text-primary">
          Hamper {format(product.price, product.currency)} + extras {format(extraUsd, product.currency)} ={" "}
          {format(product.price + extraUsd, product.currency)}
        </p>
      )}
      {!resolved.ok && (
        <p className="mt-2 text-xs text-red-600">{resolved.error}</p>
      )}
    </div>
  );
}

function HamperLineRow({
  item,
  excluded,
  replacement,
  addonOptions,
  onToggleExclude,
  onReplace,
  format,
  currency,
}: {
  item: Line;
  excluded: boolean;
  replacement?: string;
  addonOptions: Line[];
  onToggleExclude: () => void;
  onReplace: (toSlug: string) => void;
  format: (n: number, currency: Product["currency"]) => string;
  currency: Product["currency"];
}) {
  return (
    <li className="rounded-lg border border-slate-200 bg-white p-2">
      <label className="flex items-start gap-2">
        <input type="checkbox" checked={!excluded} onChange={onToggleExclude} className="mt-1" />
        <ProductImage src={item.image} alt="" className="h-10 w-10 rounded object-cover shrink-0 bg-slate-100" />
        <span className="min-w-0 flex-1">
          <Link href={`/products/${item.slug}`} className="text-sm font-medium text-primary hover:underline line-clamp-2">
            {item.name}
          </Link>
          {typeof item.price === "number" && (
            <span className="block text-xs text-slate-500">{format(item.price, currency)}</span>
          )}
        </span>
      </label>
      {excluded && (
        <div className="mt-2 pl-6">
          <p className="text-xs text-slate-600 mb-1">Replace with an add-on (hamper price stays the same)</p>
          <select
            value={replacement ?? ""}
            onChange={(e) => onReplace(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-md px-2 py-1.5 bg-white"
          >
            <option value="">Choose a replacement…</option>
            {addonOptions.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
                {typeof a.price === "number" ? ` (${format(a.price, currency)})` : ""}
              </option>
            ))}
          </select>
        </div>
      )}
    </li>
  );
}
