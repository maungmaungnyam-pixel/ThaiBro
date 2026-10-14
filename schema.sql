PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('news', 'job')),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  source_name TEXT NOT NULL DEFAULT '',
  source_url TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  salary TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  line_id TEXT NOT NULL DEFAULT '',
  is_verified INTEGER NOT NULL DEFAULT 0 CHECK (is_verified IN (0, 1)),
  verified_by TEXT NOT NULL DEFAULT '',
  verified_at TEXT NOT NULL DEFAULT '',
  is_scam_alert INTEGER NOT NULL DEFAULT 0 CHECK (is_scam_alert IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT '',
  original_title TEXT NOT NULL DEFAULT '',
  fingerprint TEXT NOT NULL DEFAULT '',
  view_count INTEGER NOT NULL DEFAULT 0 CHECK (view_count >= 0),
  company_name TEXT NOT NULL DEFAULT '',
  job_requirements TEXT NOT NULL DEFAULT '',
  contact_info TEXT NOT NULL DEFAULT '',
  application_method TEXT NOT NULL DEFAULT '',
  application_url TEXT NOT NULL DEFAULT '',
  posted_at TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS posts_type_created_at_idx ON posts(type, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS posts_news_source_url_unique_idx
  ON posts(source_url)
  WHERE type = 'news' AND source_url <> '';
CREATE INDEX IF NOT EXISTS posts_news_fingerprint_created_idx
  ON posts(fingerprint, created_at DESC)
  WHERE type = 'news' AND fingerprint <> '';
CREATE UNIQUE INDEX IF NOT EXISTS posts_job_source_url_unique_idx
  ON posts(source_url)
  WHERE type = 'job' AND source_url <> '';
CREATE INDEX IF NOT EXISTS posts_job_fingerprint_created_idx
  ON posts(fingerprint, created_at DESC)
  WHERE type = 'job' AND fingerprint <> '';

CREATE TABLE IF NOT EXISTS news_sync_state (
  source_name TEXT PRIMARY KEY,
  feed_url TEXT NOT NULL DEFAULT '',
  last_checked_at TEXT NOT NULL DEFAULT '',
  last_success_at TEXT NOT NULL DEFAULT '',
  last_status TEXT NOT NULL DEFAULT 'pending',
  items_seen INTEGER NOT NULL DEFAULT 0,
  last_error TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS job_sync_state (
  source_id TEXT PRIMARY KEY,
  source_name TEXT NOT NULL DEFAULT '',
  feed_url TEXT NOT NULL DEFAULT '',
  last_checked_at TEXT NOT NULL DEFAULT '',
  last_success_at TEXT NOT NULL DEFAULT '',
  last_status TEXT NOT NULL DEFAULT 'pending',
  items_seen INTEGER NOT NULL DEFAULT 0,
  items_inserted INTEGER NOT NULL DEFAULT 0,
  duplicates INTEGER NOT NULL DEFAULT 0,
  last_error TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_key TEXT NOT NULL,
  author TEXT NOT NULL,
  user_id TEXT,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS comments_post_created_at_idx ON comments(post_key, created_at DESC);
CREATE INDEX IF NOT EXISTS comments_user_created_at_idx ON comments(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS likes (
  post_key TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (post_key, visitor_id)
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY NOT NULL,
  display_name TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_identities (
  provider TEXT NOT NULL CHECK (provider IN ('google', 'facebook', 'line')),
  provider_subject TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_email TEXT NOT NULL DEFAULT '',
  email_verified INTEGER NOT NULL DEFAULT 0 CHECK (email_verified IN (0, 1)),
  created_at TEXT NOT NULL,
  PRIMARY KEY (provider, provider_subject)
);
CREATE INDEX IF NOT EXISTS auth_identities_user_idx ON auth_identities(user_id, provider);

CREATE TABLE IF NOT EXISTS password_credentials (
  user_id TEXT PRIMARY KEY NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email_normalized TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  email_verified_at TEXT,
  password_updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_sessions (
  token_hash TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  revoked_at TEXT
);
CREATE INDEX IF NOT EXISTS auth_sessions_user_expiry_idx ON auth_sessions(user_id, expires_at);

CREATE TABLE IF NOT EXISTS auth_email_tokens (
  token_hash TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL CHECK (purpose IN ('verify_email', 'password_reset')),
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT
);
CREATE INDEX IF NOT EXISTS auth_email_tokens_user_expiry_idx ON auth_email_tokens(user_id, expires_at);

CREATE TABLE IF NOT EXISTS auth_oauth_states (
  state_hash TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('google', 'facebook', 'line')),
  nonce TEXT NOT NULL,
  code_verifier TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_oauth_states_expiry_idx ON auth_oauth_states(expires_at);

CREATE TABLE IF NOT EXISTS app_analytics_daily (
  day TEXT PRIMARY KEY,
  total_visits INTEGER NOT NULL DEFAULT 0 CHECK (total_visits >= 0),
  daily_active_users INTEGER NOT NULL DEFAULT 0 CHECK (daily_active_users >= 0)
);

CREATE TABLE IF NOT EXISTS external_post_views (
  post_key TEXT PRIMARY KEY NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 0 CHECK (view_count >= 0),
  updated_at TEXT NOT NULL DEFAULT ''
);
