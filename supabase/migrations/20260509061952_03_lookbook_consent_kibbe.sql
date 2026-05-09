CREATE TABLE IF NOT EXISTS lookbook_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  kibbe_type text NOT NULL,
  stripe_session_id text UNIQUE,
  pdf_version text NOT NULL DEFAULT '2026-v1',
  status text NOT NULL DEFAULT 'pending',
  purchased_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE lookbook_purchases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage lookbook purchases" ON public.lookbook_purchases;
CREATE POLICY "Service role can manage lookbook purchases" ON public.lookbook_purchases FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) IS NOT NULL);
DROP POLICY IF EXISTS "Admins can read lookbook purchases" ON public.lookbook_purchases;
CREATE POLICY "Admins can read lookbook purchases" ON public.lookbook_purchases FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = (select auth.uid())::text AND users.role = 'ADMIN'));

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
DROP POLICY IF EXISTS "No public access to consent_logs" ON consent_logs;
CREATE POLICY "No public access to consent_logs" ON consent_logs FOR SELECT TO authenticated USING (false);
DROP POLICY IF EXISTS "No public insert to consent_logs" ON consent_logs;
CREATE POLICY "No public insert to consent_logs" ON consent_logs FOR INSERT TO authenticated WITH CHECK (false);

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
DROP POLICY IF EXISTS "No public access to kibbe_subscribers" ON kibbe_subscribers;
CREATE POLICY "No public access to kibbe_subscribers" ON kibbe_subscribers FOR SELECT TO authenticated USING (false);
DROP POLICY IF EXISTS "No public insert to kibbe_subscribers" ON kibbe_subscribers;
CREATE POLICY "No public insert to kibbe_subscribers" ON kibbe_subscribers FOR INSERT TO authenticated WITH CHECK (false);

DROP POLICY IF EXISTS "Authenticated users can insert own quiz results" ON public.quiz_results;
CREATE POLICY "Authenticated users can insert own quiz results" ON public.quiz_results FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid())::text = user_id);
