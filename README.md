# ThaiBro

A Burmese-first mobile web app for Myanmar people living in Thailand, backed by a Cloudflare Worker and D1 database, with an Android Capacitor shell.

## Repository contents

- `worker.mjs`, `auth.mjs`, and pipeline modules: Worker and server-side application source.
- `public/`: web app, styles, and first-party brand assets.
- `schema.sql`, `migrations/`, and `proposals/`: database schema and migration references.
- `android/`: Android/Capacitor project source. Web assets copied into Android are generated and excluded.
- `SETUP.md`: feature, deployment, and operations notes.

## Local development

```sh
npm install
npm test
```

Use the existing Cloudflare account and Worker configuration when deploying. Do not commit Worker secrets, `.dev.vars`, credentials, local state, or generated builds. Local secrets belong in the platform's secret store or an ignored local environment file.

## Firebase browser configuration

The real local `public/firebase-auth-client.js` is intentionally ignored so project-specific configuration is not committed. To set up a local copy, copy `public/firebase-auth-client.example.js` to `public/firebase-auth-client.js` and replace the placeholder Firebase Web App values. The example contains no project credentials.

## Excluded from Git

The root `.gitignore` excludes credentials and local config, `.wrangler/`, `.dev.vars`, dependencies, Gradle/build output, generated Android web assets, APK/AAB packages, screenshots, private working notes, and existing handoff archives. Keep runtime secrets server-side; never add them to source or commit history.
