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
  ON consent_logs FOR SELECT TO authenticated USING (false);

CREATE POLICY "No public insert to consent_logs"
  ON consent_logs FOR INSERT TO authenticated WITH CHECK (false);

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
  ON kibbe_subscribers FOR SELECT TO authenticated USING (false);

CREATE POLICY "No public insert to kibbe_subscribers"
  ON kibbe_subscribers FOR INSERT TO authenticated WITH CHECK (false);

CREATE INDEX IF NOT EXISTS kibbe_subscribers_email_idx ON kibbe_subscribers (email);
CREATE INDEX IF NOT EXISTS kibbe_subscribers_kibbe_type_idx ON kibbe_subscribers (kibbe_type);
CREATE INDEX IF NOT EXISTS consent_logs_email_hash_idx ON consent_logs (email_hash);