/*
  # Security Hardening

  1. Changes
    - Drops permissive INSERT policy "Anyone can submit a contact message"
      auf public.contact_messages (WITH CHECK true). Die API-Route nutzt
      ab jetzt den Service-Role-Client; Anon/Authenticated haben keinen
      direkten Zugriff mehr.
    - Entzieht EXECUTE auf SECURITY DEFINER-Funktionen (handle_updated_at,
      next_invoice_number, rls_auto_enable) von anon/authenticated/public.
      Nur der postgres/service_role-Kontext darf die Funktionen ausfuehren.
    - Stellt sicher, dass RLS-aktivierte Tabellen ohne Policies
      (auth_login_tokens, email_log, newsletter_subscribers,
      password_reset_tokens) explizite "deny"-Policies fuer anon/
      authenticated erhalten. Zugriff bleibt ausschliesslich ueber den
      Service-Role-Client moeglich.

  2. Security
    - RLS bleibt auf allen genannten Tabellen aktiv.
    - Keine Policy erlaubt USING/WITH CHECK (true) mehr.
    - SECURITY DEFINER Funktionen sind nicht mehr via PostgREST/RPC
      fuer anon oder authenticated aufrufbar.
*/

-- 1. contact_messages: permissive INSERT-Policy entfernen
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;

-- 2. SECURITY DEFINER-Funktionen: EXECUTE-Rechte entziehen
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.next_invoice_number() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- 3. RLS-Tabellen ohne Policies: explizite Deny-Policies fuer anon/authenticated

-- auth_login_tokens
DROP POLICY IF EXISTS "Deny anon select on auth_login_tokens" ON public.auth_login_tokens;
DROP POLICY IF EXISTS "Deny authenticated select on auth_login_tokens" ON public.auth_login_tokens;
CREATE POLICY "Deny anon select on auth_login_tokens"
  ON public.auth_login_tokens FOR SELECT TO anon USING (false);
CREATE POLICY "Deny authenticated select on auth_login_tokens"
  ON public.auth_login_tokens FOR SELECT TO authenticated USING (false);

-- password_reset_tokens
DROP POLICY IF EXISTS "Deny anon select on password_reset_tokens" ON public.password_reset_tokens;
DROP POLICY IF EXISTS "Deny authenticated select on password_reset_tokens" ON public.password_reset_tokens;
CREATE POLICY "Deny anon select on password_reset_tokens"
  ON public.password_reset_tokens FOR SELECT TO anon USING (false);
CREATE POLICY "Deny authenticated select on password_reset_tokens"
  ON public.password_reset_tokens FOR SELECT TO authenticated USING (false);

-- email_log
DROP POLICY IF EXISTS "Deny anon select on email_log" ON public.email_log;
DROP POLICY IF EXISTS "Deny authenticated select on email_log" ON public.email_log;
CREATE POLICY "Deny anon select on email_log"
  ON public.email_log FOR SELECT TO anon USING (false);
CREATE POLICY "Deny authenticated select on email_log"
  ON public.email_log FOR SELECT TO authenticated USING (false);

-- newsletter_subscribers
DROP POLICY IF EXISTS "Deny anon select on newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Deny authenticated select on newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Deny anon select on newsletter_subscribers"
  ON public.newsletter_subscribers FOR SELECT TO anon USING (false);
CREATE POLICY "Deny authenticated select on newsletter_subscribers"
  ON public.newsletter_subscribers FOR SELECT TO authenticated USING (false);
