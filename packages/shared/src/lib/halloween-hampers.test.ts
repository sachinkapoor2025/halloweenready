import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  HALLOWEEN_HAMPER_DEFS,
  HAMPER_CONTENTS_VALUE_HEADROOM,
  addonsForHamper,
  buildHalloweenHamperCatalogProducts,
  hamperContentsValue,
  hamperCustomizationSignature,
  resolveHamperCustomization,
  resolvedHamperContentSlugs,
} from "./halloween-hampers";

describe("halloween hampers", () => {
  it("defines ten fixed-price kits at the agreed price points", () => {
    assert.equal(HALLOWEEN_HAMPER_DEFS.length, 10);
    assert.deepEqual(
      HALLOWEEN_HAMPER_DEFS.map((h) => h.price),
      [49, 79, 99, 129, 149, 179, 199, 229, 249, 299]
    );
  });

  it("keeps contents value within 7% of the hamper price", () => {
    for (const def of HALLOWEEN_HAMPER_DEFS) {
      const value = hamperContentsValue(def.contents);
      assert.ok(value > 0, def.slug);
      assert.ok(
        value <= def.price * (1 + HAMPER_CONTENTS_VALUE_HEADROOM) + 0.01,
        `${def.slug} contents $${value} exceed ${def.price} + 7%`
      );
    }
  });

  it("requires a replacement for every excluded item and keeps the hamper price", () => {
    const product = buildHalloweenHamperCatalogProducts()[0]!;
    const fromSlug = product.hamperContents![0]!.slug;
    const toSlug = product.hamperAddons![0]!.slug;
    const ok = resolveHamperCustomization(product, {
      excludedSlugs: [fromSlug],
      replacements: [{ fromSlug, toSlug }],
      extraSlugs: [],
    });
    assert.equal(ok.ok, true);
    if (ok.ok) assert.equal(ok.extras.length, 0);

    const missing = resolveHamperCustomization(product, {
      excludedSlugs: [fromSlug],
      replacements: [],
      extraSlugs: [],
    });
    assert.equal(missing.ok, false);
  });

  it("charges extra add-ons on top of the unchanged hamper price", () => {
    const product = buildHalloweenHamperCatalogProducts()[0]!;
    const extra = product.hamperAddons![0]!;
    const resolved = resolveHamperCustomization(product, {
      excludedSlugs: [],
      replacements: [],
      extraSlugs: [extra.slug],
    });
    assert.equal(resolved.ok, true);
    if (!resolved.ok) return;
    assert.equal(resolved.extras.length, 1);
    assert.equal(resolved.extras[0]?.price, extra.price);
  });

  it("resolves shipped slugs after a swap plus extras", () => {
    const def = HALLOWEEN_HAMPER_DEFS[0]!;
    const fromSlug = def.contents[0]!.slug;
    const addon = addonsForHamper(def.contents)[0]!;
    const extra = addonsForHamper(def.contents)[1]!;
    const slugs = resolvedHamperContentSlugs(def.contents, {
      excludedSlugs: [fromSlug],
      replacements: [{ fromSlug, toSlug: addon.slug }],
      extraSlugs: [extra.slug],
    });
    assert.equal(slugs.includes(fromSlug), false);
    assert.ok(slugs.includes(addon.slug));
    assert.ok(slugs.includes(extra.slug));
  });

  it("builds distinct merge signatures for different customizations", () => {
    assert.notEqual(
      hamperCustomizationSignature({
        excludedSlugs: ["a"],
        replacements: [{ fromSlug: "a", toSlug: "b" }],
        extraSlugs: [],
      }),
      hamperCustomizationSignature({
        excludedSlugs: [],
        replacements: [],
        extraSlugs: ["c"],
      })
    );
  });
});
