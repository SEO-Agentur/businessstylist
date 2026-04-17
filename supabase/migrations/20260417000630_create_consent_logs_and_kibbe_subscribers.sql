/*
  # Create consent_logs and kibbe_subscribers tables

  ## Summary
  This migration creates two tables to support the MailerLite lead magnet funnel
  integrated with the Kibbe Body Type test.

  ## New Tables

  ### consent_logs
  DSGVO-compliant consent documentation table. Required by law to store proof
  of user consent for 3 years. Contains:
  - `id` - unique identifier
  - `email_hash` - SHA-256 hash of the email (not the raw email, for privacy)
  - `ip_hash` - SHA-256 hash of the IP address
  - `user_agent` - browser user agent string
  - `privacy_policy_version` - version of the privacy policy accepted
  - `consent_type` - what they consented to (e.g. "kibbe_funnel_newsletter")
  - `created_at` - timestamp of consent

  ### kibbe_subscribers
  Tracks subscribers who came through the Kibbe funnel. Stores:
  - `id` - unique identifier
  - `email` - subscriber email
  - `first_name` - subscriber first name
  - `kibbe_type` - their Kibbe body type slug
  - `kibbe_type_display` - human-readable Kibbe type name
  - `mailerlite_subscriber_id` - ID returned by MailerLite after subscribe
  - `status` - "pending_doi" | "confirmed" | "error"
  - `created_at` - when they subscribed

  ## Security
  - RLS enabled on both tables
  - No public read/write access
  - Only service role can insert/read (via API routes)

  ## Notes
  - consent_logs uses hashed values to comply with DSGVO data minimization
  - kibbe_subscribers can be used to retry failed MailerLite API calls
*/

CREATE TABLE IF NOT EXISTS consent_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_hash text NOT NULL,
  ip_hash text NOT NULL,
  user_agent text DEFAULT '',
  privacy_policy_version text NOT NULL DEFAULT '2026-04',
  consent_type text NOT NULL DEFAULT 'kibbe_funnel_newsletter',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consent_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to consent_logs"
  ON consent_logs
  FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "No public insert to consent_logs"
  ON consent_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE TABLE IF NOT EXISTS kibbe_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text NOT NULL DEFAULT '',
  kibbe_type text NOT NULL,
  kibbe_type_display text NOT NULL DEFAULT '',
  mailerlite_subscriber_id text DEFAULT NULL,
  status text NOT NULL DEFAULT 'pending_doi',
  error_message text DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE kibbe_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to kibbe_subscribers"
  ON kibbe_subscribers
  FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "No public insert to kibbe_subscribers"
  ON kibbe_subscribers
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE INDEX IF NOT EXISTS kibbe_subscribers_email_idx ON kibbe_subscribers (email);
CREATE INDEX IF NOT EXISTS kibbe_subscribers_kibbe_type_idx ON kibbe_subscribers (kibbe_type);
CREATE INDEX IF NOT EXISTS consent_logs_email_hash_idx ON consent_logs (email_hash);
