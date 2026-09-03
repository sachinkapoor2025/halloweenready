import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  GEO_LOCATIONS,
  allGeoPaths,
  findGeoLocation,
  geoCountries,
  getGeoByPath,
  getGeoChildren,
  halloweenCityParams,
  halloweenCountryParams,
  halloweenRegionParams,
  indexableGeoPaths,
} from "./catalog";

describe("halloween geo catalog", () => {
  it("has unique ids and paths", () => {
    const ids = GEO_LOCATIONS.map((l) => l.id);
    const paths = allGeoPaths();
    assert.equal(new Set(ids).size, ids.length);
    assert.equal(new Set(paths).size, paths.length);
  });

  it("covers the requested country counts", () => {
    const countries = geoCountries();
    assert.equal(countries.length, 54);
    assert.equal(countries.filter((c) => c.marketGroup === "core").length, 8);
    assert.equal(countries.filter((c) => c.marketGroup === "eu").length, 27);
    assert.equal(countries.filter((c) => c.marketGroup === "europe_other").length, 19);
  });

  it("classifies India, USA, UK, Japan, UAE, and HK correctly", () => {
    assert.equal(getGeoByPath("/halloween/india/uttar-pradesh")?.adminKind, "state");
    assert.equal(getGeoByPath("/halloween/india/delhi")?.adminKind, "union_territory");
    assert.equal(getGeoByPath("/halloween/usa/california")?.adminKind, "state");
    assert.equal(getGeoByPath("/halloween/usa/puerto-rico")?.adminKind, "territory");
    assert.equal(getGeoByPath("/halloween/usa/district-of-columbia")?.adminKind, "federal_district");
    assert.equal(getGeoByPath("/halloween/uk/england")?.adminKind, "constituent_country");
    assert.equal(getGeoByPath("/halloween/uk/scotland")?.adminKind, "constituent_country");
    assert.equal(getGeoByPath("/halloween/japan/tokyo")?.adminKind, "prefecture");
    assert.equal(getGeoByPath("/halloween/uae/dubai")?.adminKind, "emirate");
    assert.equal(getGeoByPath("/halloween/hong-kong/wan-chai")?.adminKind, "district");
    assert.equal(getGeoByPath("/halloween/germany/bavaria")?.adminKind, "land");
    assert.equal(getGeoByPath("/halloween/canada/ontario")?.adminKind, "province");
  });

  it("creates the example city/area pages from the brief", () => {
    const required = [
      "/halloween/india/uttar-pradesh/noida",
      "/halloween/usa/new-york/new-york-city",
      "/halloween/uk/england/london",
      "/halloween/uk/england/manchester",
      "/halloween/uk/england/birmingham",
      "/halloween/uk/england/liverpool",
      "/halloween/uk/scotland/glasgow",
      "/halloween/uk/scotland/edinburgh",
      "/halloween/uk/wales/cardiff",
      "/halloween/uk/northern-ireland/belfast",
      "/halloween/canada/alberta/calgary",
      "/halloween/canada/ontario/toronto",
      "/halloween/canada/british-columbia/vancouver",
      "/halloween/canada/quebec/montreal",
      "/halloween/australia/new-south-wales/sydney",
      "/halloween/australia/victoria/melbourne",
      "/halloween/australia/queensland/brisbane",
      "/halloween/australia/western-australia/perth",
      "/halloween/australia/south-australia/adelaide",
      "/halloween/australia/australian-capital-territory/canberra",
      "/halloween/australia/queensland/gold-coast",
      "/halloween/australia/new-south-wales/newcastle",
      "/halloween/australia/tasmania/hobart",
      "/halloween/australia/northern-territory/darwin",
      "/halloween/japan/tokyo/shibuya",
      "/halloween/hong-kong/kowloon",
      "/halloween/hong-kong/wan-chai",
      "/halloween/hong-kong/central-and-western/central",
      "/halloween/hong-kong/sha-tin",
      "/halloween/hong-kong/yau-tsim-mong/tsim-sha-tsui",
      "/halloween/uae/dubai/dubai-marina",
      "/halloween/uae/dubai/downtown-dubai",
      "/halloween/uae/dubai/jumeirah",
      "/halloween/uae/abu-dhabi",
      "/halloween/uae/sharjah",
    ];
    for (const path of required) {
      assert.ok(getGeoByPath(path), `missing ${path}`);
    }
  });

  it("does not treat Dubai or London as countries", () => {
    assert.equal(geoCountries().some((c) => c.slug === "dubai"), false);
    assert.equal(geoCountries().some((c) => c.slug === "london"), false);
    assert.equal(getGeoByPath("/halloween/uae/dubai")?.kind, "admin_region");
  });

  it("keeps US territories separate from the 50 states", () => {
    const usaId = "usa";
    const children = getGeoChildren(usaId);
    assert.equal(children.filter((c) => c.adminKind === "state").length, 50);
    assert.equal(children.filter((c) => c.adminKind === "territory").length, 5);
    assert.equal(children.filter((c) => c.adminKind === "federal_district").length, 1);
  });

  it("counts India 28 states + 8 UTs and Japan 47 prefectures", () => {
    const india = getGeoChildren("india");
    assert.equal(india.filter((c) => c.adminKind === "state").length, 28);
    assert.equal(india.filter((c) => c.adminKind === "union_territory").length, 8);
    assert.equal(getGeoChildren("japan").filter((c) => c.adminKind === "prefecture").length, 47);
    assert.equal(getGeoChildren("germany").filter((c) => c.adminKind === "land").length, 16);
  });

  it("noindexes Australia other territories only", () => {
    const hidden = GEO_LOCATIONS.filter((l) => !l.indexable);
    assert.ok(hidden.length >= 8);
    assert.ok(hidden.every((l) => l.adminKind === "other_territory"));
    assert.ok(indexableGeoPaths().includes("/halloween/australia"));
    assert.equal(indexableGeoPaths().includes("/halloween/australia/christmas-island"), false);
  });

  it("keeps every location within /halloween/{country}/{region}/{city}", () => {
    for (const loc of GEO_LOCATIONS) {
      const parts = loc.path.split("/").filter(Boolean);
      assert.ok(parts.length >= 2 && parts.length <= 4, loc.path);
      assert.equal(parts[0], "halloween");
    }
  });

  it("static params cover every generated location", () => {
    const countryN = halloweenCountryParams().length;
    const regionN = halloweenRegionParams().length;
    const cityN = halloweenCityParams().length;
    assert.equal(countryN + regionN + cityN, GEO_LOCATIONS.length);
    assert.ok(findGeoLocation("usa", "new-york", "new-york-city"));
    assert.equal(findGeoLocation("usa", "not-a-place"), undefined);
  });
});
