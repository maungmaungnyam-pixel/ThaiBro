# Thai Bro UI source bundle

This archive contains the existing Thai Bro Worker and news-pipeline source, static app files and brand assets, Wrangler configuration, and D1 schema/migration files for reference. The UI update did not apply a database migration or change D1 data.

The archive deliberately excludes `.wrangler/`, local databases, environment files, credential caches, and browser state. Runtime secrets remain configured on the existing Cloudflare Worker and are not included here. Deploy only to the existing `thai-bro` Worker using its existing account configuration.
