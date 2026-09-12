import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildSearchQuery,
  classifyChatIntent,
  mergeShoppingState,
  missingShoppingSlots,
  scoreProductForState,
} from "./chat-shopping";
import type { Product } from "../schemas/product";

describe("chat shopping parser", () => {
  it("extracts a complete witch costume request without leftover slots", () => {
    const state = mergeShoppingState({}, "I want a scary women's witch costume under $40");
    assert.equal(state.theme, "witch");
    assert.equal(state.audience, "women");
    assert.equal(state.style, "scary");
    assert.equal(state.budgetMax, 40);
    assert.equal(state.categorySlug, "costumesandaccessories");
    const missing = missingShoppingSlots(state, "product_search");
    assert.deepEqual(missing, []);
  });

  it("maps London to GB and classifies shipping intent", () => {
    const intent = classifyChatIntent("Can this reach London?");
    assert.equal(intent, "shipping_query");
    const state = mergeShoppingState({}, "I need something that ships to London");
    assert.equal(state.country, "GB");
    assert.equal(state.city, "London");
  });

  it("scores witch products above unrelated ones", () => {
    const state = mergeShoppingState({}, "scary women's witch costume");
    const witch = {
      slug: "witch-1",
      name: "Scary Women's Witch Costume",
      description: "witch",
      price: 29,
      categorySlug: "costumesandaccessories",
      images: [],
      tags: ["witch", "women"],
      inventory: 10,
      published: true,
    } as Product;
    const pumpkin = {
      slug: "pump-1",
      name: "Inflatable Pumpkin",
      description: "yard",
      price: 49,
      categorySlug: "home-decoration",
      images: [],
      tags: ["pumpkin"],
      inventory: 10,
      published: true,
    } as Product;
    assert.ok(scoreProductForState(witch, state) > scoreProductForState(pumpkin, state));
    assert.ok(buildSearchQuery(state).includes("witch"));
  });
});
