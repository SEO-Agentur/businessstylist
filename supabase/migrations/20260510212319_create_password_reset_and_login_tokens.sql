/*
  # Password Reset & One-time Login Tokens

  1. New Tables
    - `password_reset_tokens` - speichert Hashes von Passwort-Reset-Tokens
      - `id` uuid PK
      - `user_id` uuid FK -> users.id
      - `token_hash` text (SHA-256 hex, unique)
      - `expires_at` timestamptz
      - `used_at` timestamptz null
      - `ip_address` text (fuer Rate Limiting / Debug)
      - `created_at` timestamptz default now()
    - `auth_login_tokens` - einmal-Login Tokens nach Checkout/Signup
      - `id` uuid PK
      - `user_id` uuid FK -> users.id
      - `token_hash` text (SHA-256 hex, unique)
      - `expires_at` timestamptz
      - `used_at` timestamptz null
      - `created_at` timestamptz default now()

  2. Security
    - RLS aktiviert auf beiden Tabellen
    - Keine Policies fuer anon/authenticated. Zugriff nur via Service-Role
      aus unseren API-Routen.

  3. Indizes
    - token_hash unique index auf beiden Tabellen
    - user_id index fuer Aufraeum-Queries
*/

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  ip_address text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS password_reset_tokens_user_id_idx
  ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS password_reset_tokens_expires_at_idx
  ON password_reset_tokens(expires_at);

CREATE TABLE IF NOT EXISTS auth_login_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE auth_login_tokens ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS auth_login_tokens_user_id_idx
  ON auth_login_tokens(user_id);
CREATE INDEX IF NOT EXISTS auth_login_tokens_expires_at_idx
  ON auth_login_tokens(expires_at);
