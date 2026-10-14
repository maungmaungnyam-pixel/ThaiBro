# ThaiBro အလုပ်စာရင်း စုစည်း/ဘာသာပြန်စနစ်

**အခြေအနေ — အခြေခံစနစ်နှင့် ၆ နာရီအချိန်ဇယားကို တည်ဆောက်ထားပြီး၊ အပြင်ဘက်အလုပ်ရင်းမြစ်အားလုံးကို ခွင့်ပြုချက်/အတည်ပြုထားသော endpoint မရှိသေးသဖြင့် ပုံမှန်အားဖြင့် ပိတ်ထားသည်။** ဒါကြောင့် လက်ရှိ deployment တွင် အလုပ်ဆိုက်များကို scraping မလုပ်၊ အလုပ်စာရင်းအသစ်ကို မထည့်ပါ။

## ၁။ စနစ်ပုံစံ

1. Cloudflare Worker Cron သည် အလုပ်လုပ်ပုံကို ခေါ်မည်။ လက်ရှိ သတင်း feed ၁၅ မိနစ်တစ်ကြိမ် အလုပ်လုပ်သည့် schedule ကို မပြောင်းဘဲ ထိန်းထားပြီး၊ အလုပ်စာရင်းအတွက် `0 */6 * * *` ဟူသော သီးခြား trigger ထည့်ထားသည်။ Cloudflare Cron သည် UTC ကိုအသုံးပြုသဖြင့် အလုပ်ရင်းမြစ်စစ်ဆေးချိန်များမှာ ထိုင်းစံတော်ချိန် **မနက် ၇၊ နေ့လယ် ၁၊ ည ၇၊ မနက် ၁ နာရီ** ဖြစ်သည်။
2. `jobs-pipeline.mjs` သည် ဖွင့်ထားသည့် တရားဝင် RSS သို့မဟုတ် JSON API feed များကိုသာ GET ဖြင့် ဖတ်သည်။ Public website ကို အလိုအလျောက် browse/scrape လုပ်ခြင်း၊ login/CAPTCHA/access control ကျော်ခြင်း၊ redirect လိုက်ခြင်း မလုပ်ပါ။
3. Endpoint သည် HTTPS ဖြစ်ရမည်၊ သတ်မှတ်ထားသော provider domain allowlist အတွင်းဖြစ်ရမည်၊ URL ထဲတွင် token မထည့်ရ၊ response သည် ၂ MB ထက်မကြီးရ၊ ၁၂ စက္ကန့်အတွင်းရရမည်။ Redirect များကို ပိတ်ထားသည်။
4. Thailand အတွက်သာ သတ်မှတ်ထားသော source၊ စာရင်းအချက်အလက်၊ အလုပ်ခေါင်းစဉ်နှင့် မူရင်းတင်ထားသည့် HTTPS link များကို စစ်ဆေးသည်။ ၉၀ ရက်ထက်ဟောင်းသော သို့မဟုတ် ကြိုတင်ငွေ/အပ်ငွေ/လျှောက်လွှာကြေးတောင်းသည့် စာရင်းများကို ပယ်ချသည်။ ရင်းမြစ် URL နှင့် ကုမ္ပဏီ+ခေါင်းစဉ်+နေရာအလားတူမှုဖြင့် duplicate စစ်သည်။ တစ်ကြိမ်လျှင် ဘာသာပြန်ရန် အများဆုံး ၈ ခုသာလုပ်သည်။
5. လက်ရှိ ThaiBro Worker secret `GEMINI_API_KEY` နှင့် `gemini-3.1-flash-lite` ကို server ဘက်မှသာ အသုံးပြုပြီး ခေါင်းစဉ်၊ ဖော်ပြချက်၊ လိုအပ်ချက်နှင့် လျှောက်ထားပုံကို **တိုတောင်းသော မူရင်းမြန်မာအကျဉ်းချုပ်** အဖြစ်ပြန်ရေးသည်။ မူရင်းအလုပ်ကြော်ငြာကို အပြည့်ကူး/လိုင်းလိုက်ဘာသာမပြန်ပါ။ ခေါင်းစဉ်/အကျဉ်းချုပ် မြန်မာစာဖြစ်ကြောင်း စစ်ဆေးပြီးမှ D1 သို့ သိမ်းသည်။ Feed မရှိလျှင် Gemini ခေါ်ဆိုမှုမရှိပါ။ Billing၊ paid fallback သို့မဟုတ် service အသစ် မဖွင့်ထားပါ။
6. D1 ရှိ `posts` table ၏ `type='job'` သည် app ၏ ရှိပြီးသား `GET /api/posts?type=jobs` feed ထဲတွင် ပေါ်လာမည်။ သိမ်းဆည်းမည့်အချက်အလက်များမှာ မြန်မာခေါင်းစဉ်၊ မြန်မာအကျဉ်းချုပ်၊ ကုမ္ပဏီ၊ ပြည်နယ်/မြို့၊ လစာ၊ လိုအပ်ချက်၊ ဆက်သွယ်ရန်၊ လျှောက်ထားပုံ/link၊ မူရင်းရင်းမြစ်/link၊ တင်ရက်နှင့် အရင်းအမြစ်ခေါင်းစဉ်တို့ဖြစ်သည်။ ထည့်သွင်းထားသော အလုပ်တိုင်းကို ThaiBro က စစ်ပြီးဖြစ်သည်ဟု **မမှတ်** ပါ။ အဟောင်းစာရင်းများကို အလိုအလျောက်ဖျက်ခြင်း မရှိပါ။
7. Admin အခြေအနေကြည့်ရန် `GET /api/admin/jobs/status`၊ အုပ်ချုပ်သူက လက်ဖြင့် စမ်းသပ်ရန် `POST /api/admin/jobs/sync` ကို အသုံးပြုနိုင်သည်။ နှစ်ခုလုံးတွင် လက်ရှိ admin session လိုအပ်သည်။ Worker အတွင်းရေးအလုပ်ဖြစ်သောကြောင့် ပြင်ပ POST-ingest token/API အသစ် မဖန်တီးထားပါ။

## ၂။ ရင်းမြစ်တစ်ခုချင်း အခြေအနေ

| ရင်းမြစ် | လက်ရှိခွင့်ပြုထားသည့် access | ဖွင့်ရန်လိုအပ်သည် |
|---|---|---|
| JobThai | Public စာမျက်နှာ/sitemap ရှိသော်လည်း တရားဝင် API/feed မတွေ့ရ။ Terms နှင့် Disclaimer က ခွင့်ပြုချက်မရှိဘဲ copy/modify/store/display/reproduce လုပ်ခြင်းကို ကန့်သတ်ထားသည်။ Robots.txt `Allow: /` သည် reuse ခွင့်မဟုတ်ပါ။ | Thinknet/JobThai ၏ စာဖြင့်ခွင့်ပြုချက်၊ approved feed/API URL, auth/field spec, rate limit, summary/link ပြသခွင့်နှင့် retention/takedown စည်းကမ်းများ။ [Terms](https://www.jobthai.com/en/terms-of-service-jobseeker) · [Disclaimer](https://www.jobthai.com/en/disclaimer) · [robots.txt](https://www.jobthai.com/robots.txt) |
| JobsDB Thailand / SEEK | အထွေထွေ Thailand အလုပ်ရှာဖွေရေး feed/API မတွေ့ရ။ SEEK GraphQL သည် approval လိုသော partner API ဖြစ်ပြီး public listings အားလုံးအတွက် programmatic search မပံ့ပိုးကြောင်း docs ကဆိုသည်။ Terms/robots သည် automated collection နှင့် reuse ကို ကန့်သတ်ထားသည်။ | SEEK ၏ စာဖြင့်အတည်ပြုချက်၊ ThaiBro အတွက် သက်ဆိုင်သည့် listing-read interface/credentials/scopes၊ ပြသ/မြန်မာအကျဉ်းချုပ်ခွင့်၊ polling limit။ [API docs](https://developer.seek.com/) · [Terms](https://th.jobsdb.com/terms) · [robots.txt](https://th.jobsdb.com/robots.txt) |
| JobBKK | Public listings ရှိသော်လည်း တရားဝင် API/feed နှင့် automated polling ခွင့် မအတည်ပြုနိုင်ခဲ့။ လုပ်ငန်းသုံး content copy/adapt အတွက် ခွင့်ပြုချက်လိုနိုင်သည်။ | JobBKK ၏ စာဖြင့်ခွင့်ပြုချက်၊ approved endpoint/source ID/auth, ၆ နာရီ cadence/rate-limit၊ သုံးစွဲ/အကျဉ်းချုပ်ခွင့်။ [Business terms](https://www.jobbkk.com/policy/term_condition_business) · [robots.txt](https://www.jobbkk.com/robots.txt) |
| Indeed Thailand | Public search UI ရှိသော်လည်း listing ingestion အတွက် အတည်ပြုထားသော public API/feed မတွေ့ရ။ Developer access သည် approval-gated ဖြစ်ပြီး developer terms သည် scraping/republication ကို ပုံမှန်ခွင့်မပြု။ robots.txt တွင် `/rss` နှင့် `/graphql` မသုံးရန်ဖော်ပြထားသည်။ | Indeed ၏ စာဖြင့်ခွင့်ပြုချက်၊ ထိုင်း listing များအတွက် သင့်လျော်သော approved API/product/keys/scopes, Burmese summary+canonical-link ခွင့်နှင့် polling/freshness စည်းကမ်း။ [Developer docs](https://docs.indeed.com/) · [Developer terms](https://docs.indeed.com/legal-terms/developer-agreement) · [Thailand robots.txt](https://th.indeed.com/robots.txt) |
| Facebook Pages | Meta Graph API ၏ `/{page-id}/feed` သည် **App Review/ခွင့်ပြုချက်ရပြီးသော Page** များအတွက်သာ ဖြစ်နိုင်သည်။ Public Page ကိုမြင်ရခြင်းက အလိုအလျောက်စုဆောင်း/ပြန်တင်ခွင့် မဟုတ်ပါ။ | Page URL/ID တစ်ခုချင်း၊ ThaiBro Meta App အတည်ပြုမှု၊ သက်ဆိုင်ရာ API token၊ Page ပိုင်ရှင်/Meta ၏ လိုအပ်သောအခွင့်အရေး၊ မြန်မာအကျဉ်းချုပ်/လင့်ခ် ပြသခွင့်နှင့် polling terms။ [Page Public Content Access](https://developers.facebook.com/docs/features-reference/page-public-content-access/) · [Page feed API](https://developers.facebook.com/docs/graph-api/reference/page/feed/) |
| Facebook Groups | လက်ရှိ official Groups-post read API ကို မအတည်ပြုနိုင်။ Meta Groups API/permission အများစုကို ဖယ်ရှားထားသည်။ | Group ကိုလိုအပ်ပါက လက်ရှိ Meta က ပံ့ပိုးသည့် တရားဝင် endpoint နှင့် ခွင့်ပြုချက်ကို သီးခြားပြသရမည်။ မရလျှင် မဖွင့်ပါ။ [Groups API changelog](https://developers.facebook.com/docs/graph-api/changelog/version19.0/) |

**တစ်ခုချင်းအတွက် ၆ နာရီတစ်ကြိမ် စစ်ဆေးရန်နှင့် မြန်မာအကျဉ်းချုပ် ထုတ်ဝေရန် ခွင့်ပြုထားသည်ဟု အလိုလို မယူဆပါ။** ရင်းမြစ်အမည်/link ထည့်ပေးရုံဖြင့် အသုံးပြုခွင့်ရသည် မဟုတ်ပါ။ တရားဝင်ခွင့်ပြုချက်၊ သက်ဆိုင်ရာစာချုပ် သို့မဟုတ် platform က ခွင့်ပြုထားသော interface ကို အတည်ပြုပြီးမှသာ ဖွင့်ပါ။

## ၃။ Feed ဖွင့်သည့် configuration ပုံစံ

မူလအတိုင်း `JOB_SOURCE_CONFIG` မရှိပါ—ဒါကြောင့် Cron လည်သော်လည်း ဆိုက်/endpoint များကို မခေါ်ပါ။ ခွင့်ပြုချက်ရပြီးမှ Worker variable အဖြစ် ပေးရမည့်ပုံစံ (အောက်ပါ URL သည် **ဥပမာ placeholder သာ** ဖြစ်ပြီး တကယ့် JobThai feed မဟုတ်ပါ) —

```json
{
  "sources": [
    {
      "id": "jobthai",
      "endpoint": "https://www.jobthai.com/partner-issued-feed.xml",
      "format": "rss",
      "enabled": true,
      "authorized": true,
      "authorizationRef": "permission-contract-reference",
      "countryCode": "TH"
    }
  ]
}
```

ရင်းမြစ် `id` သည် `jobthai`, `jobsdb`, `jobbkk`, `indeed`, `facebook` ထဲမှ တစ်ခုဖြစ်ရမည်။ JSON feed သည် `{ "items": [ ... ] }` (သို့မဟုတ် `data`/`results`) ပုံစံဖြင့် အောက်ပါ normalized field များကို ပေးရမည်: `title`, `company`, `location`, `countryCode: "TH"`, `salary`, `description`, `requirements`, `contactInfo`, `phone`, `lineId`, `applicationMethod`, `applicationUrl`, `postedAt`, `url`။ RSS feed တွင် အလုပ်ခေါင်းစဉ်/link/company/location/salary/description/requirements နှင့် တင်သည့်ရက်ကို ဖော်ပြသော XML element များ ပါရမည်။

ဖွင့်ရန် setting တွင် `enabled:true`, `authorized:true`, မှတ်တမ်းတင်ထားသော `authorizationRef`, `countryCode:"TH"` နှင့် HTTPS endpoint/domain allowlist တို့ကို ထည့်ရမည်။ Provider token လိုအပ်ပါက URL/query parameter ထဲ မထည့်ဘဲ Cloudflare Worker secret အဖြစ် သတ်မှတ်ရမည်။ Code ထဲရှိ secret အမည်များမှာ `JOBTHAI_JOBS_API_TOKEN`, `JOBSDB_JOBS_API_TOKEN`, `JOBBKK_JOBS_API_TOKEN`, `INDEED_JOBS_API_TOKEN`, `FACEBOOK_JOBS_API_TOKEN` ဖြစ်သည်။ Bearer token မဟုတ်သော OAuth/header နည်းလမ်းလိုအပ်ပါက provider အလိုက် code adapter ကို ပြင်ဆင်ပြီး စမ်းသပ်ရမည်။

Facebook အတွက် Pages သာ လက်ခံသည်။ Page တစ်ခုစီအတွက် `id:"facebook"`, ၎င်း Page ၏ `pageId`, `endpoint` ကို `https://graph.facebook.com/v<version>/<pageId>/feed` ပုံစံဖြင့်ပေးပါ။ Server token မရှိပါက မခေါ်ပါ။ Group feed ဖြစ်ကြောင်းသတ်မှတ်ထားသော config ကို ပယ်ချသည်။

## ၄။ Database, test နှင့် deployment

- Additive D1 migration: `migrations/0005_jobs_automation.sql` — `company_name`, `job_requirements`, `contact_info`, `application_method`, `application_url`, `posted_at` ထည့်ပြီး `job_sync_state` နှင့် unique source/fingerprint indexes ဖန်တီးသည်။ ရှိပြီးသား သတင်း row များကို မဖျက်/မပြောင်းပါ။
- Fresh database schema: `schema.sql`.
- Pipeline: `jobs-pipeline.mjs`; Worker integration: `worker.mjs`; Schedule: `wrangler.toml`.
- Test: `node --test tests/jobs-pipeline.test.mjs` သို့မဟုတ် `npm test`.
- Migration အသုံးချပြီး deployment ထုတ်ဝေသောနောက် Cloudflare Cron trigger သစ်များ ပျံ့နှံ့ရန် မိနစ်အနည်းငယ်ကြာနိုင်သည်။
- ၂၀၂၆-၁၀-၁၂ တွင် migration ကို production D1 ထဲသို့ ထည့်သွင်းပြီး Worker ကို `741b7051-6ac9-468e-abaa-e62d1acd2716` version ဖြင့် ထုတ်ဝေခဲ့သည်။ Cron trigger `*/15 * * * *` နှင့် `0 */6 * * *` နှစ်ခုလုံး သက်ရောက်နေကြောင်း အတည်ပြုခဲ့သည်။
- Migration ပြီးနောက် production `posts` table တွင် ရှိပြီးသား **သတင်း ၆၄ ခု** ဆက်လက်ရှိပြီး အလုပ် post မရှိကြောင်း စစ်ဆေးခဲ့သည်။ ၁၀ unit test အားလုံး၊ SQLite migration/insert စမ်းသပ်မှုနှင့် Wrangler dry-run အောင်မြင်သည်။
- Public health endpoint ကို ဒီ session မှ ပြန်စစ်ရာ connection timeout (HTTP 000) ဖြစ်သဖြင့် live HTTP end-to-end စစ်ဆေးမှု မအောင်မြင်ပါ။ Deployment record နှင့် production D1 ကို သီးခြားအတည်ပြုထားသော်လည်း app ကိုယ်တိုင် browser ဖြင့် စမ်းသပ်ထားခြင်းမဟုတ်ပါ။

## ၅။ လက်ရှိဖွင့်ရန်လိုသေးသည့်အချက်များ

1. JobThai, SEEK/JobsDB, JobBKK, Indeed တစ်ခုချင်းစီ၏ **စာဖြင့်အတည်ပြုချက်** နှင့် ထိုင်း listing များအတွက် approved API/feed URL, endpoint/auth/spec, rate limits, Burmese summary+canonical link ထုတ်ဝေခွင့်။
2. Facebook Page များ၏ URL/ID, App Review/Business verification, server-side Page access token, Page ပိုင်ရှင်/Meta ၏လိုအပ်သော data-use ခွင့်။ Facebook Groups ကို scraping မလုပ်ပါ; တရားဝင် API ပြန်ရရှိမှသာ ပြန်သုံးသပ်မည်။
3. Bearer token နည်းလမ်းမဟုတ်သော API authentication လိုအပ်ပါက provider ၏ ခွင့်ပြုထားသော authentication အမျိုးအစား/specification နှင့် ထိုနည်းလမ်းအတွက် ပြင်ဆင်ထားသော adapter လိုအပ်သည်။

လက်ရှိအထိ ရင်းမြစ် API token/credential အသစ် မသိမ်းထားပါ။ App database တွင် အလုပ် post မထည့်ရသေးပါ။ အခကြေးငွေပေးရသော service အသစ်ကို မဖွင့်ထားပါ။
