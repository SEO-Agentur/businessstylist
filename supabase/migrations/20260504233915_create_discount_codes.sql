/*
  # Rabattcodes

  1. Neue Tabellen
    - `discount_codes`
      - `id` (uuid, primary key)
      - `code` (text, unique, case-insensitive): der eingegebene Code
      - `description` (text)
      - `discount_type` (text): 'fixed' (Eurobetrag) oder 'percent' (Prozentwert)
      - `discount_value_cents` (integer): Wert in Cent (für fixed)
      - `discount_percent` (numeric(5,2)): Wert in Prozent (für percent)
      - `applies_to_product_ids` (text[]): Produkt-IDs auf die der Code wirkt; leer = alle
      - `active` (boolean, default true)
      - `valid_from` (timestamptz)
      - `valid_until` (timestamptz)
      - `max_redemptions` (integer): optional, max. Einlösungen
      - `redemptions` (integer, default 0)
      - `created_at` (timestamptz, default now())
  2. Seed
    - Code `TEST50`: 50 € fix für Produkt `stilberatung-single`
  3. Sicherheit
    - RLS aktiviert
    - Öffentliche SELECT-Policy NUR für aktive, zeitlich gültige Codes,
      damit Frontend den Code validieren kann, ohne alles zu sehen
*/

CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text DEFAULT '',
  discount_type text NOT NULL DEFAULT 'fixed',
  discount_value_cents integer NOT NULL DEFAULT 0,
  discount_percent numeric(5,2) NOT NULL DEFAULT 0,
  applies_to_product_ids text[] NOT NULL DEFAULT '{}'::text[],
  active boolean NOT NULL DEFAULT true,
  valid_from timestamptz,
  valid_until timestamptz,
  max_redemptions integer,
  redemptions integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_discount_codes_code_upper ON discount_codes (upper(code));

ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='discount_codes' AND policyname='Public can read active discount codes'
  ) THEN
    CREATE POLICY "Public can read active discount codes"
      ON discount_codes FOR SELECT
      TO anon, authenticated
      USING (
        active = true
        AND (valid_from IS NULL OR valid_from <= now())
        AND (valid_until IS NULL OR valid_until >= now())
        AND (max_redemptions IS NULL OR redemptions < max_redemptions)
      );
  END IF;
END $$;

INSERT INTO discount_codes (code, description, discount_type, discount_value_cents, applies_to_product_ids, active)
VALUES ('TEST50', 'Rabatt 50 € auf die Einzel-Stilberatung', 'fixed', 5000, ARRAY['stilberatung-single'], true)
ON CONFLICT (code) DO NOTHING;
