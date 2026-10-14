# Thai Bro — mobile web app

Thai Bro is a Burmese-first mobile utility for Myanmar people living in Thailand. It keeps an older-brother tone: warm, direct, protective, and careful to distinguish official information from general guidance.

## What's implemented

- First-run onboarding asks whether the visitor is in Thailand for work, study, or business/investment. The selection stays in that browser only and highlights matching feed items; each feed remains newest-first.
- News and Jobs load from the existing Worker/D1 APIs. Refresh buttons remain available, and a pull-down gesture refreshes the current feed on touch devices.
- Guests can read feeds, full post details, source links, and existing comments. Firebase Spark Email/Password sign-up and sign-in use verified Firebase ID tokens; new accounts must verify their email before member actions are enabled. Passwords go only to Firebase Auth and are never stored by Thai Bro. Google, Facebook, and LINE direct OAuth remain disabled until their provider credentials are configured; no sign-in success is simulated.
- Scam warnings are called out in the feed and detail view. Jobs that have not been manually checked are explicitly labeled as unverified; only admin-marked jobs show the green “Bro verified” badge. This badge means a Thai Bro admin reviewed the listing; it is not a government endorsement.
- SOS/Directory provides tap-to-call emergency, Myanmar Embassy and labor-support contacts, plus general passport-renewal and work-permit checklists. Users are directed to confirm current documents, fees, and rules with the official source.
- `/admin` remains password-protected and supports create, read, update, and delete for News and Jobs. It provides manual verification and scam-warning toggles. An image can be supplied as an HTTPS URL or uploaded as a small compressed JPEG held in the D1 row; no R2 bucket or paid media service is created.

## Current database and migration

The existing Worker uses the D1 database `thai-bro-content` through binding `DB`. `schema.sql` describes a fresh database. The deployed database has the existing content migrations plus the additive authentication proposal `proposals/0004_auth_review.sql`, which was applied once after owner approval on 2026-10-12. **Do not run that proposal again**: it contains an `ALTER TABLE comments ADD COLUMN` statement. Existing comments and likes were retained.

Migration `0002_trust_and_crud.sql` adds `is_verified`, `verified_by`, `verified_at`, `is_scam_alert`, and `updated_at` to `posts`; admin updates preserve `created_at` and refresh `updated_at`. Authenticated likes use the existing `likes` table with a server-derived user ID; new comments record the authenticated user ID while old comments remain readable. Comment posting is rate-limited. Firebase identities use a server-derived `firebase:<uid>` value only in existing like/comment rows. Firebase account records and passwords are not copied to D1, so this integration requires no additional D1 schema migration.

## Admin and authentication

`ADMIN_PASSWORD` and `GEMINI_API_KEY` remain Worker secrets and are never shipped to the browser. Existing signed admin cookies continue to protect `/api/admin/*`. Firebase Email/Password is configured for project `thai-bro`; Worker variables contain only the public project ID and the feature flag. Google, Facebook, and LINE direct OAuth are **not active until their provider credentials are installed as Worker secrets**. No phone OTP, custom email sender, paid service, or billing has been enabled. Existing feeds and public reading remain available.

### Firebase Email/Password

The browser uses the Firebase Web SDK pinned to the official modular CDN release in `public/firebase-auth-client.js`, with the user's public Firebase web-app configuration. A Firebase web API key is designed to be public; it is not a service-account private key. Do not put service-account credentials in this app.

The Worker accepts a Firebase bearer token only after verifying its RS256 signature against Google's published Secure Token certificates, along with its key ID, issuer, audience, expiry, project, and email claims. It requires `email_verified=true` before authorizing likes and comments. Firebase Auth sends verification and password-reset emails. The password-reset response is intentionally generic so the UI does not reveal whether an address has an account. Thai Bro does not receive or store raw passwords.

The production rollout was verified with synthetic token tests and live readiness checks. No real Firebase account was created, and no verification or password-reset email was sent during deployment testing.

Firebase Console currently has Email/Password enabled and `thai-bro.fork-thursday-3b9.workers.dev` added to Authorized domains. `localhost` is available for local development. Keep the project on Firebase's no-billing Spark plan; do not enable Identity Platform, upgrade, or add a service-account key. Firebase-managed email delivery is subject to Firebase's own usage limits; no custom SMTP sender is configured.

Firebase Email/Password accounts and the separate direct Google/Facebook/LINE OAuth identities are not automatically linked, even when they use the same email. Until a separate, authenticated account-linking feature exists, the same person can have separate Thai Bro identities across those sign-in methods.

### Direct social OAuth setup (still pending credentials)

Register these exact HTTPS callback URLs in each provider's developer console; the origin is fixed by `AUTH_PUBLIC_ORIGIN` in `wrangler.toml`:

| Provider | Callback URL | Worker secrets |
| --- | --- | --- |
| Google OAuth 2.0 Web client | `https://thai-bro.fork-thursday-3b9.workers.dev/api/auth/google/callback` | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` |
| Facebook Login | `https://thai-bro.fork-thursday-3b9.workers.dev/api/auth/facebook/callback` | `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET` |
| LINE Login channel | `https://thai-bro.fork-thursday-3b9.workers.dev/api/auth/line/callback` | `LINE_CHANNEL_ID`, `LINE_CHANNEL_SECRET` |

Google requests `openid email profile`; Facebook requests `public_profile,email` (email may be absent or declined); LINE requests `openid profile`. LINE email needs separate permission and is not required. Keep every client secret server-side. Provider identities are not automatically merged just because their email addresses match; account linking needs a separate authenticated flow.

After the owner supplies provider credentials through a secure form, install only those values with `npx wrangler secret put <NAME>` and deploy the Worker. Do not put credentials in source files, `.dev.vars`, logs, commands, chat, or client-side assets.

## Trust and content safeguards

The manually verified marker is set only through the admin CMS. The app records the fixed admin label and time of verification. Admin review should confirm source, contact details, workplace, location, pay, and terms before marking a job verified.

## SOS sources and caveats

Contacts shown in the app were checked against the following public pages on 2026-10-11:

- Myanmar Embassy Bangkok — [official contact page](https://www.mebangkok.org/contact-us.html) and [Labor Contact](https://www.mebangkok.org/labour-contact.html).
- Thailand emergency numbers — [UK government Thailand travel guidance](https://www.gov.uk/foreign-travel-advice/thailand/getting-help): Police 191, Ambulance 1669, Fire 199, Tourist Police 1155.
- MAP Foundation — [official website](https://mapfoundationcm.org/) (listed Chiang Mai office number: +66 53 328 134).

Phone numbers, service areas, and hours can change; the UI links to the source pages and tells visitors to re-check. Emergency care is listed as 1669; the app cannot select a nearby hospital without the visitor's location. General legal/process checklists are not legal advice and do not assert a current document list or fee.

## Free-tier deployment

Gemini news rewriting remains the existing server-side `gemini-3.1-flash-lite` integration. Keep it on the already approved Gemini Free Tier: do not enable billing, paid fallback models, Cloudflare paid features, or new services. D1 and the Worker configuration are already present.

For future code changes, test locally first, then deploy the Worker with the existing Firebase public project configuration:

```sh
npx wrangler deploy --name thai-bro
```

The saved admin password and Gemini API key already exist as Worker secrets; do not put their values in source files, commands, or chat. Public app: <https://thai-bro.fork-thursday-3b9.workers.dev/>
