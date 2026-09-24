import assert from "node:assert/strict";
import {
  canonicalStorePath,
  countryCodeFromPath,
  hrefForLocation,
  isLocationExemptPath,
  toLocationPath,
} from "./location-urls";

assert.equal(toLocationPath("/categories/halloween-hampers", "US"), "/hamper-to-usa");
assert.equal(toLocationPath("/categories/halloween-hampers", "GB"), "/hamper-to-uk");
assert.equal(toLocationPath("/categories/halloween-hampers", "CA"), "/hamper-to-canada");
assert.equal(toLocationPath("/categories/halloween-hampers", "AE"), "/hamper-to-uae");
assert.equal(toLocationPath("/about", "GB"), "/about-to-uk");
assert.equal(toLocationPath("/products/ghost-inflatable", "CA"), "/products/ghost-inflatable-to-canada");
assert.equal(toLocationPath("/products?search=pumpkin", "AE"), "/products-to-uae?search=pumpkin");
assert.equal(toLocationPath("/categories/home-decoration", "AU"), "/categories/home-decoration-to-australia");
assert.equal(toLocationPath("/blog/how-to-decorate", "IN"), "/blog/how-to-decorate-to-india");
assert.equal(toLocationPath("/", "GB"), "/");
assert.equal(toLocationPath("/cities/california", "GB"), "/cities/california");
assert.equal(toLocationPath("/halloween/usa/california/los-angeles", "GB"), "/halloween/usa/california/los-angeles");
assert.equal(toLocationPath("/countries/us", "GB"), "/countries/uk");
assert.equal(toLocationPath("/halloween/usa", "CA"), "/halloween/canada");
assert.equal(canonicalStorePath("/hamper-to-uk"), "/categories/halloween-hampers");
assert.equal(canonicalStorePath("/about-to-canada"), "/about");
assert.equal(canonicalStorePath("/products/ghost-inflatable-to-uae"), "/products/ghost-inflatable");
assert.equal(countryCodeFromPath("/hamper-to-uae"), "AE");
assert.equal(countryCodeFromPath("/cities/miami"), undefined);
assert.equal(isLocationExemptPath("/"), true);
assert.equal(isLocationExemptPath("/checkout"), true);
assert.equal(hrefForLocation("/cities/dallas", "GB"), "/cities/dallas");
assert.equal(hrefForLocation("/shipping", "FR"), "/shipping-to-france");
assert.equal(hrefForLocation("/hamper-to-uk", "US"), "/hamper-to-uk");

console.log("location-urls ok");
