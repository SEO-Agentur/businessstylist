/*
  # Kontaktformular-Nachrichten

  1. Neue Tabellen
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `phone` (text)
      - `subject` (text)
      - `message` (text, not null)
      - `ip_address` (text)
      - `user_agent` (text)
      - `status` (text, default 'new')
      - `created_at` (timestamptz, default now())
  2. Sicherheit
    - RLS aktiviert
    - INSERT erlaubt für `anon` und `authenticated`
    - Keine öffentliche SELECT-Policy; nur Service-Role (Admin-API)
      liest Nachrichten aus
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL,
  ip_address text DEFAULT '',
  user_agent text DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='contact_messages' AND policyname='Anyone can submit a contact message'
  ) THEN
    CREATE POLICY "Anyone can submit a contact message"
      ON contact_messages FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;
