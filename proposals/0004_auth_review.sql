-- REVIEW-ONLY PROPOSAL for Thai Bro authentication.
-- DO NOT RUN against production until the owner has reviewed and explicitly approved it.
-- Apply once, after the existing 0002_trust_and_crud.sql and 0003_news_feed.sql migrations.

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
CREATE INDEX IF NOT EXISTS auth_identities_user_idx
  ON auth_identities(user_id, provider);

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
CREATE INDEX IF NOT EXISTS auth_sessions_user_expiry_idx
  ON auth_sessions(user_id, expires_at);

CREATE TABLE IF NOT EXISTS auth_email_tokens (
  token_hash TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL CHECK (purpose IN ('verify_email', 'password_reset')),
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT
);
CREATE INDEX IF NOT EXISTS auth_email_tokens_user_expiry_idx
  ON auth_email_tokens(user_id, expires_at);

CREATE TABLE IF NOT EXISTS auth_oauth_states (
  state_hash TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('google', 'facebook', 'line')),
  nonce TEXT NOT NULL,
  code_verifier TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_oauth_states_expiry_idx
  ON auth_oauth_states(expires_at);

-- Existing comments remain readable and unchanged; new comments can be associated
-- with the authenticated user while the existing author text remains for display.
ALTER TABLE comments ADD COLUMN user_id TEXT;
CREATE INDEX IF NOT EXISTS comments_user_created_at_idx
  ON comments(user_id, created_at DESC);

-- The existing likes table is intentionally unchanged to preserve all rows/counts.
-- New authenticated likes will store the server-derived users.id in visitor_id;
-- requests will no longer be allowed to choose the user identifier client-side.
