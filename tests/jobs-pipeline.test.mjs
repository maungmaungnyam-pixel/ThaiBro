import test from "node:test";
import assert from "node:assert/strict";
import { JOB_SOURCE_REGISTRY, parseRssJobs, runJobsPipeline, validateSourceConfig, __test } from "../jobs-pipeline.mjs";

const approvedSourceConfig = {
  sources: [{
    id: "jobthai",
    endpoint: "https://www.jobthai.com/authorized-feed.xml",
    format: "rss",
    enabled: true,
    authorized: true,
    authorizationRef: "signed-feed-license-2026-01",
    countryCode: "TH"
  }]
};

test("no configured source remains disabled and does not invent an endpoint", () => {
  assert.deepEqual(validateSourceConfig("").sources, []);
  assert.equal(validateSourceConfig("").error, "source_config_not_set");
});

test("a scheduled run with no approved feed records disabled status without making network calls", async () => {
  const states = [];
  const DB = { prepare() { return { bind(...values) { return { async run() { states.push(values); return { success: true }; } }; } }; } };
  const originalFetch = globalThis.fetch;
  let networkCalls = 0;
  globalThis.fetch = async () => { networkCalls++; throw new Error("unexpected network access"); };
  try {
    const result = await runJobsPipeline({ DB });
    assert.equal(result.ok, true);
    assert.equal(result.configuredSources, 0);
    assert.equal(result.inserted, 0);
    assert.equal(networkCalls, 0);
    assert.equal(states.length, Object.keys(JOB_SOURCE_REGISTRY).length);
    assert.ok(states.every((row) => row[5] === "source_config_not_set"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("source config requires explicit authorization, country, format, and audit reference", () => {
  const denied = structuredClone(approvedSourceConfig);
  denied.sources[0].authorized = false;
  assert.equal(validateSourceConfig(denied).sources.length, 0);
  const missingReference = structuredClone(approvedSourceConfig);
  missingReference.sources[0].authorizationRef = "";
  assert.equal(validateSourceConfig(missingReference).sources.length, 0);
  const nonThailand = structuredClone(approvedSourceConfig);
  nonThailand.sources[0].countryCode = "US";
  assert.equal(validateSourceConfig(nonThailand).sources.length, 0);
  const badHost = structuredClone(approvedSourceConfig);
  badHost.sources[0].endpoint = "https://example.net/feed.xml";
  assert.equal(validateSourceConfig(badHost).sources.length, 0);
});

test("Facebook group scraping is not enabled by the Page API configuration", () => {
  const config = { sources: [{
    id: "facebook",
    endpoint: "https://graph.facebook.com/v23.0/123456789/feed",
    format: "json",
    enabled: true,
    authorized: true,
    authorizationRef: "page-permission-approved",
    countryCode: "TH",
    pageId: "123456789",
    isGroup: true
  }] };
  assert.equal(validateSourceConfig(config).sources.length, 0);
  assert.ok(JOB_SOURCE_REGISTRY.facebook.hosts.includes("graph.facebook.com"));
});

test("Facebook accepts only the matching public Page feed endpoint and maps posts without inventing fields", () => {
  const source = { sources: [{ id: "facebook", endpoint: "https://graph.facebook.com/v26.0/123456789/feed", format: "json", enabled: true, authorized: true, authorizationRef: "approved-page-use", countryCode: "TH", pageId: "123456789" }] };
  const approved = validateSourceConfig(source).sources[0];
  assert.ok(approved);
  assert.match(approved.endpoint, /fields=id%2Cmessage%2Cpermalink_url%2Ccreated_time/);
  const mismatched = structuredClone(source);
  mismatched.sources[0].endpoint = "https://graph.facebook.com/v26.0/987654321/feed";
  assert.equal(validateSourceConfig(mismatched).sources.length, 0);
  const mapped = __test.mapFacebookPagePost({ message: "Cook needed\nBangkok, 18,000 THB", permalink_url: "https://www.facebook.com/page/posts/123", created_time: "2026-10-12T10:00:00+0000" }, approved);
  assert.equal(mapped.title, "Cook needed");
  assert.equal(mapped.company, "");
  assert.equal(mapped.url, "https://www.facebook.com/page/posts/123");
  assert.equal(mapped.countryCode, "TH");
});

test("RSS parser extracts normalized job fields and deduplicates identical links", () => {
  const source = { id: "jobthai" };
  const xml = `<?xml version="1.0"?><rss><channel><item>
    <title>Kitchen assistant</title><link>https://www.jobthai.com/job/42</link>
    <company>Example Co</company><location>Bangkok</location><country>Thailand</country>
    <salary>18,000 THB</salary><description><![CDATA[<p>Prepare food and clean the work area.</p>]]></description>
    <requirements>Basic Thai helpful</requirements><pubDate>Mon, 12 Oct 2026 08:00:00 GMT</pubDate>
  </item><item><title>Kitchen assistant</title><link>https://www.jobthai.com/job/42</link><description>Duplicate</description></item></channel></rss>`;
  const items = parseRssJobs(xml, source);
  assert.equal(items.length, 1);
  assert.equal(items[0].title, "Kitchen assistant");
  assert.equal(items[0].company, "Example Co");
  assert.equal(items[0].salary, "18,000 THB");
  assert.match(items[0].description, /Prepare food/);
});

test("canonical URLs strip tracking and reject off-domain, credential-bearing, and token-bearing URLs", () => {
  const allow = JOB_SOURCE_REGISTRY.jobthai.hosts;
  assert.equal(__test.canonicalHttpsUrl("https://www.jobthai.com/job/42?utm_source=x#detail", "https://www.jobthai.com", allow), "https://www.jobthai.com/job/42");
  assert.equal(__test.canonicalHttpsUrl("https://example.net/job/42", "https://www.jobthai.com", allow), "");
  assert.equal(__test.canonicalHttpsUrl("https://user:pass@www.jobthai.com/job/42", "https://www.jobthai.com", allow), "");
  assert.equal(__test.canonicalHttpsUrl("https://www.jobthai.com/feed?access_token=secret", "https://www.jobthai.com", allow), "");
});

test("candidate normalization rejects missing original URL, incomplete listings, and upfront-fee scams", () => {
  const source = validateSourceConfig(approvedSourceConfig).sources[0];
  const base = { title: "Kitchen assistant", company: "Example Co", location: "Bangkok", countryCode: "TH", description: "Prepare food, clean the work area and follow kitchen safety procedures.", url: "https://www.jobthai.com/job/42" };
  assert.ok(__test.normalizeCandidate(base, source, "2026-10-12T00:00:00.000Z"));
  assert.equal(__test.normalizeCandidate({ ...base, url: "" }, source, "2026-10-12T00:00:00.000Z"), null);
  assert.equal(__test.normalizeCandidate({ ...base, description: "Too short" }, source, "2026-10-12T00:00:00.000Z"), null);
  assert.equal(__test.normalizeCandidate({ ...base, applicationMethod: "Pay an upfront registration fee to secure the job" }, source, "2026-10-12T00:00:00.000Z"), null);
});

test("similar jobs from separate sources are collapsed conservatively", () => {
  const left = { source_url: "https://www.jobthai.com/job/1", original_title: "Kitchen Assistant", company_name: "Example Co", location: "Bangkok" };
  const right = { sourceUrl: "https://www.indeed.com/viewjob?jk=2", originalTitle: "Assistant Kitchen worker", companyName: "Example Co", location: "Bangkok" };
  assert.equal(__test.isNearDuplicate(left, right), true);
  const differentEmployer = { ...right, companyName: "Other Co" };
  assert.equal(__test.isNearDuplicate(left, differentEmployer), false);
});

test("translation result must contain Burmese text and every indexed row", () => {
  const ok = JSON.stringify([{ index: 0, titleMm: "မီးဖိုချောင်အကူ", summaryMm: "မီးဖိုချောင်တွင် အစားအစာပြင်ဆင်၍ သန့်ရှင်းရေးလုပ်ရန် ဖြစ်သည်။", requirementsMm: "အခြေခံထိုင်းစကား သိပါက ပိုကောင်းသည်။", applicationMethodMm: "မူရင်းအလုပ်စာမျက်နှာမှ လျှောက်ထားပါ။" }]);
  assert.equal(__test.parseGeminiRows(ok, 1).size, 1);
  assert.throws(() => __test.parseGeminiRows(JSON.stringify([{ index: 0, titleMm: "Kitchen assistant", summaryMm: "Work in kitchen" }]), 1));
});
