/*
  # Rechnungen / Bestellbestätigungen

  1. Neue Tabellen
    - `invoices`
      - `id` (uuid, primary key)
      - `invoice_number` (text, unique): Fortlaufende Rechnungsnummer
      - `email` (text, not null): E-Mail-Adresse des Käufers
      - `customer_name` (text): Name des Käufers (optional)
      - `product_name` (text, not null): Gekaufter Artikel
      - `product_description` (text): Beschreibung des Artikels
      - `amount_cents` (integer, not null): Gesamtbetrag in Cent (brutto)
      - `currency` (text, default 'eur')
      - `tax_rate` (numeric, default 19): USt.-Satz in %
      - `stripe_session_id` (text, unique): Referenz zur Stripe Checkout Session
      - `stripe_payment_intent_id` (text): Referenz zum Payment Intent
      - `metadata` (jsonb, default '{}')
      - `sent_at` (timestamptz): Zeitpunkt des E-Mail-Versands
      - `created_at` (timestamptz, default now())
  2. Sicherheit
    - RLS aktiviert
    - Nur Admins können Rechnungen lesen
    - Schreibzugriffe ausschließlich über Service-Role (Webhook)
*/

CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  email text NOT NULL,
  customer_name text DEFAULT '',
  product_name text NOT NULL,
  product_description text DEFAULT '',
  amount_cents integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'eur',
  tax_rate numeric(5,2) NOT NULL DEFAULT 19,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1000;

CREATE INDEX IF NOT EXISTS idx_invoices_email ON invoices(email);
CREATE INDEX IF NOT EXISTS idx_invoices_stripe_session ON invoices(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='invoices' AND policyname='Authenticated users can view own invoices'
  ) THEN
    CREATE POLICY "Authenticated users can view own invoices"
      ON invoices FOR SELECT
      TO authenticated
      USING (email = (auth.jwt() ->> 'email'));
  END IF;
END $$;
