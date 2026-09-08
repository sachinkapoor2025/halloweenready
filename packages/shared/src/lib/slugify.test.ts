import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildProductSlug, productHref, seoSlugBase, slugify } from "./slugify";

describe("slugify / product URLs", () => {
  it("builds lowercase hyphenated slugs", () => {
    assert.equal(slugify("Halloween Pumpkin Lamp!"), "halloween-pumpkin-lamp");
  });

  it("collapses repeated halloween segments and truncates", () => {
    const base = seoSlugBase(
      "Halloween Halloween Decorations Portable Pumpkin Lanterns Halloween Gift Extra Words Here Forever"
    );
    assert.ok(!base.includes("halloween-halloween"));
    assert.ok(base.length <= 72);
    assert.ok(!base.endsWith("-"));
  });

  it("appends a short unique suffix for CJ-style uniqueness", () => {
    assert.equal(
      buildProductSlug("Halloween Pumpkin Lamp", "20953423abc"),
      "halloween-pumpkin-lamp-20953423"
    );
  });

  it("builds clean product hrefs without query params", () => {
    assert.equal(productHref("halloween-pumpkin-lamp-20953423"), "/products/halloween-pumpkin-lamp-20953423");
  });
});
