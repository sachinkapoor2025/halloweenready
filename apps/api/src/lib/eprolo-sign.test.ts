import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { eproloAuthHeaders, eproloSign, eproloAuth, withEproloQuery } from "./eprolo-sign";

describe("eprolo-sign", () => {
  it("builds uppercase MD5 of key + secret + timestamp", () => {
    const a = eproloSign("KEY", "SECRET", "1700000000000");
    assert.equal(a, a.toUpperCase());
    assert.equal(a.length, 32);
    assert.equal(a, eproloSign("KEY", "SECRET", "1700000000000"));
    assert.notEqual(eproloSign("KEY", "SECRET", "1"), eproloSign("KEY", "SECRET", "2"));
  });

  it("puts key, timestamp, and sign on request headers", () => {
    const headers = eproloAuthHeaders("KEY", "SECRET", "md5-key-secret-timestamp", 1700000000000);
    assert.equal(headers.apiKey, "KEY");
    assert.equal(headers.openApiKey, "KEY");
    assert.equal(headers.signature, headers.sign);
    assert.equal(headers.timestamp, "1700000000000");
    assert.equal(headers.sign, eproloSign("KEY", "SECRET", "1700000000000"));
  });

  it("also puts sign on the query string (Eprolo reads request parameters)", () => {
    const auth = eproloAuth("KEY", "SECRET", "md5-key-secret-timestamp", 1700000000000);
    assert.equal(auth.query.sign, auth.headers.sign);
    const url = withEproloQuery("https://openapi.eprolo.com/", auth.query);
    assert.match(url, /sign=/);
    assert.match(url, /timestamp=1700000000000/);
  });
});
