import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  HALLOWEEN_COLLECTION_EMAIL_CONFIG,
  buildHalloweenCollectionEmailHtml,
} from "./marketing-campaign-emails";

describe("Halloween collection mailer", () => {
  const html = buildHalloweenCollectionEmailHtml();

  it("uses live catalog product URLs and photos", () => {
    assert.match(html, /12-feet-halloween-inflatable-ghost-decoration-20953423/);
    assert.match(html, /halloween-orange-ghost-linen-pillowcase-14303924/);
    assert.match(html, /apartment-haunt-hamper/);
    assert.match(html, /cf\.cjdropshipping\.com/);
    assert.doesNotMatch(html, /lorem ipsum/i);
    assert.doesNotMatch(html, /placeholder product/i);
  });

  it("keeps campaign fields reusable and includes Shop Now CTAs", () => {
    assert.equal(HALLOWEEN_COLLECTION_EMAIL_CONFIG.heroButtonText, "Shop Now");
    assert.match(html, /Shop Now/);
    assert.match(html, /Free shipping on \$49\+/);
    assert.match(html, /\{\{unsubscribe\}\}/);
    assert.match(html, /max-width: 620px/);
  });
});
