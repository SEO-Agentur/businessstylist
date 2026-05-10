/*
  # Deny-Policies fuer contact_messages

  1. Changes
    - Ergaenzt explizite Deny-Policies fuer anon und authenticated auf
      public.contact_messages. Die Tabelle hat RLS aktiv, aber nach dem
      Drop der permissiven INSERT-Policy keine Policies mehr.
    - Schreibzugriff erfolgt ausschliesslich ueber den Service-Role-Client
      in der Kontakt-API-Route.

  2. Security
    - Anon und authenticated koennen weder lesen noch schreiben.
*/

DROP POLICY IF EXISTS "Deny anon select on contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Deny authenticated select on contact_messages" ON public.contact_messages;

CREATE POLICY "Deny anon select on contact_messages"
  ON public.contact_messages FOR SELECT TO anon USING (false);

CREATE POLICY "Deny authenticated select on contact_messages"
  ON public.contact_messages FOR SELECT TO authenticated USING (false);
